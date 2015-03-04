using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThinkYi.Domain;

namespace ThinkYi.Service
{
    public interface ISlideService
    {
        IQueryable<Slide> GetSlides();
        void EditSlide(Slide slide);
        Slide GetSlide(int id);
    }
}
