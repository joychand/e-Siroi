﻿using System;
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
    }
}