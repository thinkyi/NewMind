using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ThinkYi.Data.Infrastructure
{
    public interface IDatabaseFactory : IDisposable
    {
        NewMindContext Get();
    }
}
