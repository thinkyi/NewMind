using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity.Infrastructure;
using ThinkYi.Domain;

namespace ThinkYi.Data
{
    public class NewMindContext : DbContext
    {
        private readonly static string CONNECTION_STRING = "name=NewMindContext";
        public NewMindContext()
            : base(CONNECTION_STRING)
        {
            Database.SetInitializer<NewMindContext>(null);
        }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }

        public virtual void Commit()
        {
            base.SaveChanges();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();//移除复数表名的契约
            //modelBuilder.Conventions.Remove<IncludeMetadataConvention>();//防止黑幕交易 要不然每次都要访问 EdmMetadata这个表
        }
    }
}