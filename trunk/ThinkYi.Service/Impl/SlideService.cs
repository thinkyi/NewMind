using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Microsoft.Practices.Unity;
using System.Data.Entity;
using ThinkYi.Domain;
using ThinkYi.Data.Infrastructure;
using ThinkYi.Data.Repositories;

namespace ThinkYi.Service.Impl
{
    public class SlideService : ISlideService
    {
        [Dependency]
        public ISlideRepository SlideRepository { get; set; }
        [Dependency]
        public IUnitOfWork UnitOfWork { get; set; }

        public IQueryable<Slide> GetSlides()
        {
            var slides = SlideRepository.Entities;
            return slides;
        }

        public Slide GetSlide(int id)
        {
            var slide = SlideRepository.GetByID(id);
            return slide;
        }

        public void EditSlide(Slide slide)
        {
            SlideRepository.Update(slide);
            UnitOfWork.Commit();
        }
    }
}
