using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace eSiroi.Web.Controllers
{
    public class DepartmentController : Controller
    {
        [HttpPost]
        public ActionResult upload()
        {
            string Message, fileName, actualFileName;
            Message = fileName = actualFileName = string.Empty;
             bool flag = false;
             if (Request.Files != null)
               {

                    var file = Request.Files[0];
                    actualFileName = file.FileName;
                    fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    int size = file.ContentLength;
 
                        try
                        {
                            //file.SaveAs(Path.Combine(Server.MapPath("~/fileUpload"), fileName));
                            file.SaveAs(Path.Combine(Server.MapPath("~/fileUpload"), fileName));
                        }
                 catch (Exception)
                        {
                            Message = "File upload failed! Please try again";
                        }

                        
             }
             return Json("file saved");
        }
        // GET: Department
        public ActionResult deptDataEntered()
        {
            return File("~/Views/Department/dept_dataEntered.html", "text/html");
        }
        
        public ActionResult Fsheet()
        {
            return File("~/Views/Department/FactSheet.html", "text/html");
        }
        public ActionResult SRVerification()
        {
            return File("~/Views/Department/srVerify.html", "text/html");
        }
        public ActionResult Scheduler_Modal()
        {
            return File("~/Views/Department/Appoint_Calendar.html", "text/html");
        }
        public ActionResult online_deed()
        {
            return File("~/Views/Department/OnlineDeedEntry.html", "text/html");
        }
        public ActionResult online_update()
        {
            return File("~/Views/Department/online_update.html", "text/html");
        }
        public ActionResult online_deed_update()
        {
            return File("~/Views/Department/online_deed_entry.html", "text/html");
        }
        public ActionResult online_property_update()
        {
            return File("~/Views/Department/online_update_property.html", "text/html");
        }
        public ActionResult online_executant_update()
        {
            return File("~/Views/Department/online_update_executant.html", "text/html");
        }
        public ActionResult online_claimant_update()
        {
            return File("~/Views/Department/online_update_claimant.html", "text/html");
        }
        public ActionResult online_identifier_update()
        {
            return File("~/Views/Department/online_update_identifier.html", "text/html");
        }
        public ActionResult Certificate()
        {
            return File("~/Views/Department/Certificate.html", "text/html");
        }
        public ActionResult FinalUpload()
        {
            return File("~/Views/Department/FinalUpload.html", "text/html");
        }
    }
}