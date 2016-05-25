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
using System.Web;
using iTextSharp.text.pdf;
using iTextSharp.text;
using System.IO;
using System.Net.Http.Headers;

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
        [HttpPost]
        [Route("getOwnDetail")]
        public IHttpActionResult getOwnDetail(PqModel pq)
        {
            var query = db.Uniowners
                      .Where(o => (o.LocCd.Equals(pq.LocCd) && o.NewDagNo == pq.NewDagNo && o.NewPattaNo == pq.NewPattaNo))
                      .Select(o => new
                      {
                          ownno=o.ownno,
                          Name = o.Name,
                          Father = o.Father,
                          Address = o.Address

                      }).OrderBy(o=>o.ownno);
            if(query.Any()){
                return Ok(query);
            }
            return NotFound();
        }

        [HttpPost]
        [Route("getplotDetail")]
        public IHttpActionResult getplotDetail(PqModel pq)
        {
            var query = db.Uniplots
                      .Where(o => (o.LocCd.Equals(pq.LocCd) && o.NewDagNo == pq.NewDagNo && o.NewPattaNo == pq.NewPattaNo))
                      .Select(o => new { o.LocCd, o.NewDagNo, o.OldDagNo, o.NewPattaNo, o.Area, o.Area_acre, o.LandClass })
                      .FirstOrDefault();
            if (query!=null)
            {
                return Ok(query);
            }
            return NotFound();
        }
        [HttpPost]
        [Route("getmasterlandvalue")]
        public IHttpActionResult getmasterlandvalue([FromBody]string unit )
        {
            var query = db.MasterLandValue
                      .Where(l => l.Unit.Contains(unit.ToString()))
                      .Select(l => new { l.Unit, l.Details, l.Rate1, l.Rate2, l.Rate3, l.Remark1, l.Remark2, l.Remark3 });
                     
            if (query.Any())
            {
                return Ok(query);
            }
            return NotFound();
        }

        [HttpPost]
        [Route("getunitgroup")]
        public IHttpActionResult getunitgroup()
        {
            var query = db.MasterLandValue

                      .Select(l => new { l.Unit});

            if (query != null)
            {
                return Ok(query);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("getJammabandi")]
        public HttpResponseMessage getJammabandi()
        {
            MemoryStream pdfmemorystream = new MemoryStream();
            HttpResponseMessage result = null;
            string fontpath = HttpContext.Current.Server.MapPath("~/fonts/");
            BaseFont customfont = BaseFont.CreateFont(fontpath + "vrinda.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            Document doc = new Document();
            PdfWriter.GetInstance(doc, pdfmemorystream);
            Font font = new Font(customfont, 12);
            string s = "নম্বোল";
            doc.Open();
            doc.Add(new Paragraph(s, font));
            doc.Close();
            result = Request.CreateResponse(HttpStatusCode.OK);
            result.Content = new ByteArrayContent(pdfmemorystream.ToArray());
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = new DateTime().ToString() + ".pdf";
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            return result;
        }
    }

#endregion

   
}
