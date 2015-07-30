using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using eSiroi.Resource.Entities;
using eSiroi.Resource.Entities;
using System.Threading.Tasks;
using System.Web.Http.Results;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.SqlServer;


namespace eSiroi.Resource.Controllers
{
    public class deptRegistraionController : ApiController
    {
        private eSiroiReSrcDbContext db = new eSiroiReSrcDbContext();
        private LpDbContext lpdb = new LpDbContext();

        //GET ONLINE APPLICATION
        [HttpGet]
        [Route("api/deptRegistraionController/{status}/getAppln")]
        public IHttpActionResult getAppln(String status)
        {
            
            var query =from oAppln in db.onlineapplication
                                join ro in db.RegistarOffice
                                on oAppln.sro equals SqlFunctions.StringConvert((double) ro.RegOfficeCode ).Trim()
                                join trans in db.MajorTrans_code
                                on oAppln.trans_maj_code equals trans.tran_maj_code
                                 where oAppln.status == status
                                select new
                                {
                                    ackno = oAppln.ackno,
                                    sro = ro.RegOfficeName,
                                    transaction = trans.tran_name,
                                    date = oAppln.date
                                   
                                    

                                };
            if(query.Any())
            {
                return Ok(query);
            }
            return NotFound();       
        }


       
        #region COMMON DATA SERVICE API
        // get Exempt reason
        [HttpGet]
        [Route("api/deptRegistraionController/ExemptReason")]
        public IHttpActionResult getReason()
        {
            var reason= db.Exempt_Reason;
            if(reason.Any())
            {
                return Ok(reason);
            }
            return NotFound();
        }

        ////Get LandType 
        [HttpGet]
        [Route("api/deptRegistraionController/landtype")]
        public IHttpActionResult getlandtype()
        {


            var landtype = db.LandType;

            if (landtype.Any())
            {
                return Ok(landtype);
            }

            return NotFound();

        }
        // Get LandClass
        [HttpGet]
        [Route("api/deptRegistraionController/landclass")]
        public IHttpActionResult getlandclass()
        {
            var landclass = db.Class;
            if (landclass.Any())
            {
                return Ok(landclass);

            }
            return NotFound();
        }
        #endregion

        # region DeedForm API

        //POST DEED DETAILS
        [HttpPost]
        [Route("api/deptRegistraionController/postdeed")]
        public async Task<IHttpActionResult> postdeed([FromBody] Deed deedDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Deed.Add(deedDetails);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {

                throw;


            }
            return Ok();
        }

        // GET DEEDS STATUS
        [HttpGet]
        [Route("api/deptRegistraionController/{status}/getDeed")]
        public IHttpActionResult getDeed(String status)
        {
            var query = from d in db.Deed
                        join ro in db.RegistarOffice
                        on d.SR equals ro.RegOfficeCode
                        join trans in db.MajorTrans_code
                        on d.TransType equals trans.tran_maj_code
                        where d.Status == status
                        select new
                        {
                            TS = d.TSNo,
                            TYear = d.TSYear,
                            sro = ro.RegOfficeName,
                            transaction = trans.tran_name,
                            status = d.Status,
                            enterby = d.EnterBy,
                            date = d.EntryDt



                        };
            if (query.Any())
            {
                return Ok(query);
            }
            return NotFound();
        }

        # endregion DeedFrom API

      
        # region PropertyFrom API
        //Get Property Details
        [HttpGet]
        [Route("api/deptRegistraionController/{ackno}/property")]
        public IHttpActionResult getOnlineProperty(int ackno)
        {
            var plotdetail = db.onlinePlot
                           .Where(p => p.ackno == ackno)
                           .Select(list => new { list.ackno,list.DagNo,list.PattaNo,list.TransactedArea,list.LandType,list.Class});
            if (plotdetail.Any())
            {
                return Ok(plotdetail);
            }
            else
                return NotFound();
        }

        // Get property ddl list
        [Route("api/deptRegistraionController/{ackno}/propertyddl")]
        public IHttpActionResult getOnlinePropertyddl(int ackno)
        {
            var plotddl = db.onlinePlot
                           .Where(p => p.ackno == ackno)
                           .Select(list => new { list.ackno, list.State, list.District, list.Subdivision, list.Circle, list.Village });
            if (plotddl.Any())
            {
                return Ok(plotddl);
            }
            else
                return NotFound();
        }
        #endregion 

        #region PartyDetails API
        // post executantlist
        [HttpPost]
        [Route("api/deptRegistraionController/postexecutant")]
        public async Task<IHttpActionResult> postexecutant([FromBody] IEnumerable<Executant> executantlist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            foreach (Executant E in executantlist)
            {


                db.Executant.Add(E);

            }



            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {

                throw;


            }

            // return CreatedAtRoute("DefaultApi", new { controller = "postexecutant", id = executantlist[0].ackno }, executantlist);
            return Ok();
        }
        
        // Get Online Claimant list 
        [HttpGet]
        [Route("api/deptRegistraionController/{ackno}/claimantlist")]
        public IEnumerable<OnlineClaimant> claimantlist(int ackno)
        {

            //return db.OnlineExecutant 
            IEnumerable<OnlineClaimant> clist;
            clist = db.OnlineClaimant
                  .Where(b => b.Ackno == ackno);


            return clist;
        }
        // GET ONLINE IDENTIFIER LIST
        [HttpGet]
        [Route("api/deptRegistraionController/{ackno}/identifierlist")]
        public IEnumerable<OnlineIdentifier> identifierlist(int ackno)
        {

            //return db.OnlineExecutant 
            IEnumerable<OnlineIdentifier> ilist;
            ilist = db.OnlineIdentifier
                  .Where(b => b.Ackno == ackno);


            return ilist;
        }
        // GET ONLINE IDENTDDL LIST
        [HttpGet]
        [Route("api/deptRegistraionController/{ackno}/identddllist")]
        public System.Collections.IEnumerable identddllist(int ackno)
        {

            System.Collections.IEnumerable iddlist;
           

            iddlist = (from p in db.Set<OnlineIdentifier>()
                     where p.Ackno == ackno
                     select new { p.State, p.District, p.SubDivision, p.Village, p.PostOffice, p.PinCode, p.PoliceSt }).AsEnumerable();
            //.Select(x => new OnlineExecutant { Ackno = x.Ackno });

            return iddlist;


          }
        // GET CLAIMANT DDL LIST
        [HttpGet]
        [Route("api/deptRegistraionController/{ackno}/claimddlist")]
      
        public System.Collections.IEnumerable claimddlist(int ackno)
        {

            System.Collections.IEnumerable cddlist;


            cddlist = (from p in db.Set<OnlineClaimant>()
                       where p.Ackno == ackno
                       select new { p.State, p.District, p.SubDivision, p.Village, p.PostOffice, p.PinCode, p.PoliceSt }).AsEnumerable();
            //.Select(x => new OnlineExecutant { Ackno = x.Ackno });

            return cddlist;


        }
        # endregion

        #region LOUCHAPATHAP API
        // get plot
        [HttpGet]
        [Route("api/deptRegistraionController/{plotno}/{pattano}/verfiyplot")]
        public  IHttpActionResult getPlotDetails(string plotno, string pattano)
        {

        //IQueryable plotlist;


            var plotlist = (from p in lpdb.Set<Uniowner>()
                        where p.NewDagNo == plotno && p.NewPattaNo == pattano
                        select new { p.NewDagNo,p.NewPattaNo,p.Name,p.Father,p.Address,p.PArea });
            //.Select(x => new OnlineExecutant { Ackno = x.Ackno });
            if (plotlist.Any())
            {
                return Ok(plotlist); 
            }

            return NotFound();

        }

        #endregion








    }
}
