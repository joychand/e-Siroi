using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace eSiroi.Resource.Controllers
{
    public class SRController : ApiController
    {
        [HttpGet]
        [Route("api/SRController/getPdf")]
        public HttpResponseMessage GetPdf()
        {
            HttpResponseMessage result = null;
            var serverpath=HttpContext.Current.Server.MapPath("~/uploadFile");
           // MemoryStream pdf = serverpath + "2802263e-bf1b-48a4-9b91-4ecedfa9391b.PDF"; //get the memorysteram of the pdf here
            var filepath = serverpath + "/2802263e-bf1b-48a4-9b91-4ecedfa9391b.PDF";
            MemoryStream pdf=new MemoryStream(System.IO.File.ReadAllBytes(filepath));
           // HttpResponseMessage result = null;
            result = Request.CreateResponse(HttpStatusCode.OK);
            result.Content = new ByteArrayContent(pdf.ToArray());
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = "2802263e-bf1b-48a4-9b91-4ecedfa9391b.pdf";
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            //return File(@"C:\MyFile.pdf", "application/pdf");
            //return File(new FileStream(@file, FileMode.Open, FileAccess.Read), "application/pdf");
            return result;
        }
    }
}
