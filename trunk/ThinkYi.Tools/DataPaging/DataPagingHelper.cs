using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Reflection;
using ThinkYi.Domain;

namespace ThinkYi.Tools.DataPaging
{
    public static class DataPagingHelper
    {
        public static IQueryable<T> GetQueryable<T>(this IList<T> list, JqGridParam jgp)
        {
            return GetQueryable<T>(list.AsQueryable<T>(), jgp);
        }

        public static IQueryable<T> GetQueryable<T>(this IQueryable<T> queriable, JqGridParam jgp)
        {
            IQueryable<T> data;
            if (jgp.sord.ToUpper().Equals("ASC"))
            {
                data = queriable.OrderBy(jgp.sidx);
                //IOrderedQueryable<T> data1 = queriable.OrderBy(jgp.FirstOrder);
                //if (!string.IsNullOrEmpty(jgp.ThenOrder))
                //{
                //    string[] thens = jgp.ThenOrder.Split(',');
                //    foreach (string t in thens)
                //    {
                //        data1 = data1.ThenBy(t);
                //    }
                //}
                //data = data1;
            }
            else
            {
                data = queriable.OrderByDescending(jgp.sidx);
                //IOrderedQueryable<T> data1 = queriable.OrderByDescending(jgp.FirstOrder);
                //if (!string.IsNullOrEmpty(jgp.ThenOrder))
                //{
                //    string[] thens = jgp.ThenOrder.Split(',');
                //    foreach (string t in thens)
                //    {
                //        data1 = data1.ThenByDescending(t);
                //    }
                //}
                //data = data1;
            }
            if (jgp.search)
            {
                data = ApplyWhere(data, jgp.sField, jgp.sValue, jgp.sOper);
            }
            if (jgp.page < 0)
                return data;
            else
                return data.Skip<T>((jgp.page - 1) * jgp.rows).Take<T>(jgp.rows);
        }

        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "OrderBy");
        }

        public static IOrderedQueryable<T> OrderByDescending<T>(this IQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "OrderByDescending");
        }

        public static IOrderedQueryable<T> ThenBy<T>(this IOrderedQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "ThenBy");
        }

        public static IOrderedQueryable<T> ThenByDescending<T>(this IOrderedQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "ThenByDescending");
        }

        private static IOrderedQueryable<T> ApplyOrder<T>(IQueryable<T> source, string property, string methodName)
        {
            string[] props = property.Split('.');
            Type type = typeof(T);
            ParameterExpression arg = Expression.Parameter(type, "x");
            Expression expr = arg;
            foreach (string prop in props)
            {
                // use reflection (not ComponentModel) to mirror LINQ 
                PropertyInfo pi = type.GetProperty(prop);
                expr = Expression.Property(expr, pi);
                type = pi.PropertyType;
            }
            Type delegateType = typeof(Func<,>).MakeGenericType(typeof(T), type);
            LambdaExpression lambda = Expression.Lambda(delegateType, expr, arg);
            object result = typeof(Queryable).GetMethods().Single(method => method.Name == methodName
                            && method.IsGenericMethodDefinition
                            && method.GetGenericArguments().Length == 2
                            && method.GetParameters().Length == 2)
                            .MakeGenericMethod(typeof(T), type)
                            .Invoke(null, new object[] { source, lambda });
            return (IOrderedQueryable<T>)result;
        }

        private static IQueryable<T> ApplyWhere<T>(IQueryable<T> source, string property, string propertyValue, string searchOper)
        {
            ParameterExpression param = Expression.Parameter(typeof(T), "c");
            PropertyInfo pi = typeof(T).GetProperty(property);
            MemberExpression left = Expression.Property(param, pi);

            var elementType = TypeUtil.GetUnNullableType(pi.PropertyType);
            object value = null;
            if (!string.IsNullOrEmpty(propertyValue))
            {
                value = Convert.ChangeType(propertyValue, elementType);
            }
            ConstantExpression right = Expression.Constant(value, pi.PropertyType);

            Expression filter;
            switch (searchOper)
            {
                case "cn":
                    filter = Expression.Call(left, typeof(string).GetMethod("Contains"), right);
                    break;
                default://eq
                    filter = Expression.Equal(left, right);
                    break;
            }
            var result = source.Where(Expression.Lambda<Func<T, bool>>(filter, param));

            return result;

        }
    }
}
