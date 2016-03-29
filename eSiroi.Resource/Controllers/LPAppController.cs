using System;
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
using eSiroi.Resource.Models;
using System.Data;
namespace eSiroi.Resource.Controllers
{
    [RoutePrefix("api/LPAppController")]
    public class LPAppController : ApiController
    {
        private LpDbContext db = new LpDbContext();
        #region PattaQuery
        //get district
        [HttpGet]
        [Route("getDistrict")]
        public IEnumerable<UniDistrict> getdistrict()
        {
            return db.UniDistrict;
        }
        [HttpGet]
        [Route("{dcode}/getCircle")]
        public IHttpActionResult getcircle(string dcode)
        {
            //IEnumerable<UniCircle> clist;
            var query = from c in db.UniCircle
                    where c.distcode == dcode
                    select new 
                    {
                       distcode= c.distcode,
                        circode=c.circode,
                       subcode=c.subcode,
                       cirDesc=c.cirDesc

                    };
            if (query.Any())
            {
                return Ok(query);

            }
            return NotFound();
        }
        //getVillage
        [HttpPost]
        [Route("postVillage")]
        public IHttpActionResult postVillage(UniCircle circ)
        {
            //VAR DISTCODE="07";
            //VAR SUBCODE="01";
            //VAR CIRCODE = "002";
            //002
            //IEnumerable<UniLocation> vlist;
           var vlist = db.UniLocation
                .Where(l => l.LocCd.Substring(0, 7).Equals(circ.distcode + circ.subcode + circ.circode));
           if (vlist.Any())
           {
               return Ok(vlist);
           }
           return NotFound();
        }

#endregion

    }
}
