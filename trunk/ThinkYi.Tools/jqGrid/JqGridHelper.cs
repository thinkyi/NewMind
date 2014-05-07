using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Web.Mvc;
using System.Reflection;
using ThinkYi.Tools.DataPaging;
using ThinkYi.Domain;

namespace ThinkYi.Tools.jqGrid
{
    /// <summary>
    /// jqGrid数据处理助手类
    /// </summary>
    public static class JqGridHelper
    {
        public static JsonResult GetJson<T>(this IList<T> datas, JqGridParam jgp, JsonRequestBehavior behavior, params string[] fields)
        {
            return GetJson<T>(datas.AsQueryable<T>(), jgp, behavior, fields);
        }

        public static JsonResult GetJson<T>(this IQueryable<T> queriable, JqGridParam jgp, JsonRequestBehavior behavior, params string[] fields)
        {
            var data = queriable.GetQueryable<T>(jgp);

            var json = new JsonResult();
            json.JsonRequestBehavior = behavior;

            int rows = jgp.rows;
            int page = jgp.page;

            if (rows != 0)
            {
                JqGridParam jgpCount = jgp;
                jgpCount.page = -1;
                int records = queriable.GetQueryable(jgpCount).Count();
                var totalpages = (decimal)records / (decimal)rows;
                totalpages = (totalpages == (int)totalpages) ? totalpages : (int)totalpages + 1;

                var rowsData = GetJsonData<T>(data, fields);

                json.Data = new
                {
                    page = page,
                    records = records,
                    total = (int)totalpages,
                    rows = rowsData
                };
            }

            return json;
        }

        private static object[] GetJsonData<T>(IQueryable<T> queriable, params string[] fields)
        {
            var properties = typeof(T).GetProperties(BindingFlags.Instance | BindingFlags.Public);

            T[] datas = queriable.ToArray<T>();

            object[] result = new object[datas.Length];

            if (fields == null || fields.Length == 0)
            {
                fields = properties.Where(p => !p.GetGetMethod().IsVirtual).Select(p => p.Name).ToArray();
            }

            for (int i = 0; i < datas.Length; i++)
            {
                Dictionary<string, string> dict = new Dictionary<string, string>();
                for (int j = 0; j < fields.Length; j++)
                {
                    string value = "";
                    PropertyInfo pi = properties.First<PropertyInfo>(x => x.Name == fields[j]);
                    object obj = pi.GetValue(datas[i], null);
                    if (obj != null)
                        value = obj.ToString();
                    dict.Add(fields[j], value);
                }
                result[i] = new { id = i, cell = dict };
            }

            return result;
        }
    }
}
