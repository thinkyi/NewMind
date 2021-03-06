﻿using System.Data.Entity;
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
        public DbSet<I18N> I18Ns { get; set; }
        public DbSet<I18NType> I18NTypes { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Information> Information { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Culture> Cultures { get; set; }
        public DbSet<Slide> Slides { get; set; }

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