using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ThinkYi.Data.Infrastructure
{
    public class DatabaseFactory : Disposable, IDatabaseFactory
    {
        private NewMindContext dataContext;
        public NewMindContext Get()
        {
            return dataContext ?? (dataContext = new NewMindContext());
        }
        protected override void DisposeCore()
        {
            if (dataContext != null)
                dataContext.Dispose();
        }
    }
}
