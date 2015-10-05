using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace eSiroi.Web.Controllers
{
    public class ReportController : Controller
    {
        // GET: Report
        public ActionResult ReportMain()
        {
            return File("~/Views/Report/main.html", "text/html");
        }
        public ActionResult Certificate()
        {
            return File("~/Views/Report/Certificate.html", "text/html");
        }
        public ActionResult Fsheet()
        {
            return File("~/Views/Report/FactSheet.html", "text/html");
        }
    }
}