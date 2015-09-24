﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using eSiroi.Resource.Entities;
//using eSiroi.Resource.Migrations.Entities;
//using eSiroi.Resource.Repository;
using System.Web.Http.Description;
using System.Threading.Tasks;
using System.Web.Http.Results;

namespace eSiroi.Resource.Controllers
{
    [RoutePrefix("api/Public")]
    public class PublicController : ApiController
    {
        private eSiroiReSrcDbContext db = new eSiroiReSrcDbContext();
        [HttpGet]
        [Route("{appln}/applnStatus")]
        public IHttpActionResult getAppln(int appln)
        {
            var query = db.onlineapplication
                        .Where(a => a.ackno == appln)
                        .Join(db.RegistarOffice, a => a.sro, ro => ro.RegOfficeCode.ToString(), (a, ro) => new { a = a, ro = ro })
                        .Join(db.MajorTrans_code, apln => apln.a.trans_maj_code, trans => trans.tran_maj_code, (apln, trans) => new { apln, trans })
                        .Select(
                        OnlineAppln => new
                        {
                            ackno = OnlineAppln.apln.a.ackno,
                            year = OnlineAppln.apln.a.year,
                            sro = OnlineAppln.apln.ro.RegOfficeName,
                            trans_maj_code = OnlineAppln.trans.tran_name,
                            date = OnlineAppln.apln.a.date,
                            status = OnlineAppln.apln.a.status
                        }

                        );
                            
            if (query.Any())
            {
                return Ok(query);
            }
            return NotFound();
        }
    }
}