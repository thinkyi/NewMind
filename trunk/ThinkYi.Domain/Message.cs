using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ThinkYi.Domain
{
    public class Message
    {
        public int MessageID { get; set; }
        public string Client { get; set; }
        public string Contact { get; set; }
        public string IP { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string Reply { get; set; }
        public DateTime Date { get; set; }
        public bool IsPassed { get; set; }
    }
}
