using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using eSiroi.Resource.Entities;
//using eSiroi.Resource.Entities;
using System.Threading.Tasks;
using System.Web.Http.Results;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.SqlServer;
using System.Collections;
using eSiroi.Resource.Models;
namespace eSiroi.Resource.Controllers
{
    [RoutePrefix("api/OnlineUpdate")]
    public class UpdateController : ApiController
    {
        private eSiroiReSrcDbContext dbase = new eSiroiReSrcDbContext();
        [HttpPost]
        [Route("getExecutantlist")]
        public IHttpActionResult getExecutant([FromBody]ApplicationStatus Oappln)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var list= dbase.Executant
                     .Where(e=>(e.TSNo==Oappln.tsno && e.TSYear==Oappln.tsyear));
            if (list.Any())
            {
                return Ok(list);
            }
             return NotFound();  

        }

        [HttpPost]
        [Route("getClaimantlist")]
        public IHttpActionResult getClaimant([FromBody]ApplicationStatus Oappln)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var list = dbase.Claimant
                     .Where(c => (c.TSNo == Oappln.tsno && c.TSYear == Oappln.tsyear));
            if (list.Any())
            {
                return Ok(list);
            }
            return NotFound();

        }

        [HttpPost]
        [Route("getIdentifierlist")]
        public IHttpActionResult getIdentifier([FromBody]ApplicationStatus Oappln)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var list = dbase.Identifier
                     .Where(i => (i.TSNo == Oappln.tsno && i.TSYear == Oappln.tsyear));
            if (list.Any())
            {
                return Ok(list);
            }
            return NotFound();

        }

        [HttpPost]
        [Route("getProperty")]
        public IHttpActionResult getProperty([FromBody]ApplicationStatus Oappln)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var list = dbase.Plot
                     .Where(p => (p.TSNo == Oappln.tsno && p.TSYear == Oappln.tsyear));
            if (list.Any())
            {
                return Ok(list);
            }
            return NotFound();

        }
    }
}
