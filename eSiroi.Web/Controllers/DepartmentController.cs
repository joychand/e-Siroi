using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace eSiroi.Web.Controllers
{
    public class DepartmentController : Controller
    {
        // GET: Department
        public ActionResult deptDataEntered()
        {
            return File("~/Views/Department/dept_dataEntered.html", "text/html");
        }
    }
}