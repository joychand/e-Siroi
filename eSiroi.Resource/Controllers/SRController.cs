using eSiroi.Resource.Entities;
using eSiroi.Resource.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace eSiroi.Resource.Controllers
{
    [RoutePrefix("api/SRController")]
    public class SRController : ApiController
    {
        private eSiroiReSrcDbContext db = new eSiroiReSrcDbContext();
        [HttpGet]
        [Route("getPdf")]
        public HttpResponseMessage GetPdf()
        {
            HttpResponseMessage result = null;
            var serverpath=HttpContext.Current.Server.MapPath("~/uploadFile");
           // MemoryStream pdf = serverpath + "2802263e-bf1b-48a4-9b91-4ecedfa9391b.PDF"; //get the memorysteram of the pdf here
            var filepath = serverpath + "/78678510-58e8-4ded-bfa4-644fc9d686b6.pdf";
            MemoryStream pdf=new MemoryStream(System.IO.File.ReadAllBytes(filepath));
           // HttpResponseMessage result = null;
            result = Request.CreateResponse(HttpStatusCode.OK);
            result.Content = new ByteArrayContent(pdf.ToArray());
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = "78678510-58e8-4ded-bfa4-644fc9d686b6.pdf";
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            //return File(@"C:\MyFile.pdf", "application/pdf");
            //return File(new FileStream(@file, FileMode.Open, FileAccess.Read), "application/pdf");
            return result;
        }

        [HttpPost]
        [Route("finalizeApplication")]
        public async Task<IHttpActionResult> finalize(ApplicationStatus application)
        {

            var appln = db.Application
                   .Where(a => a.TSNo == application.tsno && a.TSYear == application.tsyear && a.sro == application.sro).FirstOrDefault();
            appln.status = application.status;
            //var reason = "plot";
            //if (application.remarks.Length > 0)
            ////if(reason.Length>0)
            //{
            //    appln.remarks = application.remarks;
            //}

            if (application.Ackno != 0)
            {
                onlineapplication onlineApplication = db.onlineapplication
                                    .Where(o => o.ackno == application.Ackno).FirstOrDefault();
                onlineApplication.status = application.status;
                //if (application.remarks.Length > 0)
                //{
                //    onlineApplication.remarks = application.remarks;
                //}
            }

            try
            {
                await db.SaveChangesAsync();
            }

            catch (DbUpdateException e)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
