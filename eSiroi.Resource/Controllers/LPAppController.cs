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
        public IEnumerable<UniCircle> getcircle(string dcode)
        {
            IEnumerable<UniCircle> clist;
            clist = db.UniCircle
                       .Where(c => c.distcode == dcode);
            return clist;
        }
        //getVillage
        [HttpPost]
        [Route("{getVillage")]
        public IEnumerable<UniLocation> getVillage(UniCircle ccode)
        {
            IEnumerable<UniLocation> vlist;
            vlist = db.UniLocation
                .Where(l => l.LocCd.Contains(ccode.distcode + ccode.subcode + ccode.circode));
            return vlist;
        }

#endregion

    }
}
