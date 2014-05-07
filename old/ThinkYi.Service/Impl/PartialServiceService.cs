using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Microsoft.Practices.Unity;
using System.Data.Entity;
using ThinkYi.Domain;
using ThinkYi.Data.Infrastructure;
//using ThinkYi.Data.Repositories;

namespace ThinkYi.Service.Impl
{
    public class PartialService : IPartialService
    {
        [Dependency]
        public IBookRepository BookRepository { get; set; }
        [Dependency]
        public ISheetRepository SheetRepository { get; set; }
        [Dependency]
        public ICellRepository CellRepository { get; set; }
        [Dependency]
        public IRangeRepository RangeRepository { get; set; }
        [Dependency]
        public IRowRepository RowRepository { get; set; }
        [Dependency]
        public IColumnRepository ColumnRepository { get; set; }
        [Dependency]
        public IUnitOfWork unitOfWork { get; set; }

        public IQueryable<Menu> GetMenus()
        {
            var menus = BookRepository.Entities.Where(b => !b.IsDeleted).OrderBy(b => b.Name)
                        .Include(b => b.Sheets);
            return books;
        }
    }
}
