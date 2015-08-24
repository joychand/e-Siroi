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
    [RoutePrefix("api/deptRegistraionController")]
    public class deptRegistraionController : ApiController
    {
        private eSiroiReSrcDbContext db = new eSiroiReSrcDbContext();
        private LpDbContext lpdb = new LpDbContext();

        #region GET ONLINE APPLICATION
        [HttpGet]
        [Route("{status}/getAppln")]
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

        #endregion

        #region COMMON DATA SERVICE API
        // get Exempt reason
        [HttpGet]
        [Route("ExemptReason")]
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
        [Route("landtype")]
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
        [Route("landclass")]
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
        [Route("postdeed")]
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
       [Authorize]
        
        [Route("{status}/getDeed")]
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
        [Route("{ackno}/property")]
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
        [Route("{ackno}/propertyddl")]
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

        //INSERT PORPERTY DETAILS
        [Route("postPlotDetail")]
        public async Task< IHttpActionResult> postProperty(Plot plot) {

            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Plot.Add(plot);

            try
            {
                await db.SaveChangesAsync();
            }
            catch(DbUpdateException e)
            {
                return InternalServerError(e);
            }
            return Ok();

        }

      
        #endregion 

        #region PartyDetails API
        //GET EXECUTANT LIST
        [HttpGet]
        [Route("{ackno}/excutantlist")]
        public IHttpActionResult excutantlist(int ackno)
        {
            
            //return db.OnlineExecutant 
           // IEnumerable<OnlineExecutant> elist;
            var elist = db.OnlineExecutant
                        .Where(b => b.Ackno == ackno)
                        .Select(list => new
                        {
                            list.SlNo,
                            list.ExecSurName,
                            list.ExecMiddleName,
                            list.ExecLastName,
                            list.Mobile,
                            list.Aadhaar,
                            list.FatherSurName,
                            list.FatherMiddleName,
                            list.FatherLastName,
                            list.Sex,
                            list.Occupation,
                            list.Alias
                        });


            if (elist.Any())
            {
                return Ok(elist);
            }
            else
                return NotFound();


             }

        //***   GET EXECUTANT DDL DATA *********//
        [HttpGet]
        [Route("{ackno}/execddllist")]
        public System.Collections.IEnumerable execddlist(int ackno)
        {

            //return db.OnlineExecutant 
            System.Collections.IEnumerable elist;
            //elist = db.OnlineExecutant
            //      .Where(b => b.Ackno == ackno);

            //elist = (from p in db.OnlineExecutant
            //         where p.Ackno == ackno
            //         select p);
            //.Select(x => new OnlineExecutant { Ackno = x.Ackno });

            //return elist;

            elist = (from p in db.Set<OnlineExecutant>()
                     where p.Ackno == ackno
                     select new { p.State, p.District, p.SubDivision, p.Village,p.Street, p.PostOffice, p.PinCode, p.PoliceSt }).AsEnumerable();
            //.Select(x => new OnlineExecutant { Ackno = x.Ackno });

            return elist;




            // Request.CreateResponse(HttpStatusCode.OK, online);
        }
        // post executantlist
        [HttpPost]
        [Route("postexecutant")]
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
        [Route("{ackno}/claimantlist")]
        public IHttpActionResult claimantlist(int ackno)
        {
            
            //return db.OnlineExecutant 
            //IEnumerable<OnlineClaimant> clist;
            var clist = db.OnlineClaimant
                        .Where(b => b.Ackno == ackno)
                        .Select(list => new
                        {
                            list.SlNo,
                            list.ClaimSurName,
                            list.ClaimMiddleName,
                            list.ClaimLastName,
                            list.Alias,
                            list.Aadhaar,
                            list.Mobile,
                            list.FatherSurName,
                            list.FatherMiddleName,
                            list.FatherLastName,
                            list.Sex,
                            list.Occupation
                        });


            if (clist.Any())
            {
                return Ok(clist);
            }
            else
                return NotFound();
        }
        // GET ONLINE IDENTIFIER LIST
        [HttpGet]
        [Route("{ackno}/identifierlist")]
        public IHttpActionResult identifierlist(int ackno)
        {



            var ilist = db.OnlineIdentifier
                         .Where(b => b.Ackno == ackno)
                         .Select(list => new
                         {
                             list.IdentSurName,
                             list.IdentMiddleName,
                             list.IdentLastName,
                             list.Alias,
                             list.Mobile,
                             list.Aadhaar,
                             list.FatherSurName,
                             list.FatherMiddleName,
                             list.FatherLastName,
                             list.Occupation,
                             list.SlNo,
                             list.Sex
                            
                         });
            if (ilist.Any())
            {
                return Ok(ilist);
            }
            else return NotFound();
            
        }
        // GET ONLINE IDENTDDL LIST
        [HttpGet]
        [Route("{ackno}/identddllist")]
        public System.Collections.IEnumerable identddllist(int ackno)
        {

            System.Collections.IEnumerable iddlist;
           

            iddlist = (from p in db.Set<OnlineIdentifier>()
                     where p.Ackno == ackno
                     select new { p.State, p.District, p.SubDivision, p.Village, p.Street,p.PostOffice, p.PinCode, p.PoliceSt,p.Identify }).AsEnumerable();
            //.Select(x => new OnlineExecutant { Ackno = x.Ackno });

            return iddlist;


          }
        // GET CLAIMANT DDL LIST
        [HttpGet]
        [Route("{ackno}/claimddlist")]
      
        public System.Collections.IEnumerable claimddlist(int ackno)
        {

            System.Collections.IEnumerable cddlist;


            cddlist = (from p in db.Set<OnlineClaimant>()
                       where p.Ackno == ackno
                       select new { p.State, p.District, p.SubDivision, p.Village, p.Street,p.PostOffice, p.PinCode, p.PoliceSt }).AsEnumerable();
            //.Select(x => new OnlineExecutant { Ackno = x.Ackno });

            return cddlist;


        }

        //POST CLAIMANT DETAILS
        [Route("postClaimant")]
        public async Task<IHttpActionResult> postClaimant(IEnumerable <Claimant> claimantlist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            foreach (Claimant c in claimantlist)
            {
                db.Claimant.Add(c);

            }

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
        //POST IDENTIFIER DETAILS
        [Route ("postIdentifier")]
        public async Task<IHttpActionResult> postIdentifier(IEnumerable<Identifier> identifierList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            foreach (Identifier i in identifierList)
            {
                db.Identifier.Add(i);

            }

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
        [Route("updateDeedStatus")]
        public async Task<IHttpActionResult> updateDeedStatus(StatusObject statusObject)
        {
            Deed d = db.Deed
                   .Where(c => c.TSNo == statusObject.tsno && c.TSYear == statusObject.tsyear).FirstOrDefault();
            d.Status = statusObject.status;

           if(statusObject.Ackno!=0){
               onlineapplication onlineApplication = db.onlineapplication
                                   .Where(o => o.ackno == statusObject.Ackno).FirstOrDefault();
               onlineApplication.status = statusObject.status;
           }

           try
           {
               await db.SaveChangesAsync();
           }

            catch(DbUpdateException e)
           {
                return NotFound();
            }
           
            return Ok();
        }
        # endregion









    }
}
