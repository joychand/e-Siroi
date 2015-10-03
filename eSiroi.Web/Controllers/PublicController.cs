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
        public ActionResult PublicHome()
        {
            return File("~/Views/Public/PublicHome.html", "text/html");
        }
        public ActionResult appntView()
        {
            return File("~/Views/Public/appointmntView.html", "text/html");
        }
    }
}