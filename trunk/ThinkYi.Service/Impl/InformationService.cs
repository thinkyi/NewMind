﻿using System;
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
    public class InformationService : IInformationService
    {
        [Dependency]
        public IInformationRepository InformationRepository { get; set; }
        [Dependency]
        public IUnitOfWork UnitOfWork { get; set; }

        public Information GetInformation(int id)
        {
            Information info = InformationRepository.GetByID(id);
            return info;
        }

        public IQueryable<Information> GetInformations(string lCode)
        {
            IQueryable<Information> informations = InformationRepository.Entities.Where(i => i.Language.Code.Equals(lCode));
            return informations;
        }

        public void EditInformation(Information info)
        {
            InformationRepository.Update(info);
            UnitOfWork.Commit();
        }
    }
}
