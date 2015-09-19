using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace eSiroi.Web.Controllers
{
    public class PublicController : Controller
    {
        // GET: Public
        public ActionResult Fsheet()
        {
            return File("~/Views/Department/FactSheet.html", "text/html");
        }
    }
}