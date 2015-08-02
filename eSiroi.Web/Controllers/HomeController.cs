using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace eSiroi.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "eRegistrar";

            return View();
        }
        public ActionResult home_page()
        {

            return File("~/Views/Home/home_page.html", "text/html");
            //return View();
        }
        public ActionResult login_page()
        {
            //ViewBag.Title = "Login";
            return File("~/Views/Home/login_page.html", "text/html");
            //return View();
        }
        public ActionResult registration()
        {
            //ViewBag.Title = "Registration";
            return File("~/Views/Home/registration.html", "text/html");
            //return View();
        }
        public ActionResult applyregistration()
        {
            //ViewBag.Title = "Registration";

            return View();
        }
        public ActionResult success()
        {
            //ViewBag.Title = "Registration";

            //return View();
            return File("~/Views/Home/success.html", "text/html");
        }
        public ActionResult executant()
        {
            return File("~/Views/Home/executant.html", "text/html");
        }
        public ActionResult regsidemenu()
        {
            return File("~/Views/Home/regsidemenu.html", "text/html");
        }
        public ActionResult registrationcontent()
        {
            return File("~/Views/Home/registrationcontent.html", "text/html");
        }
        public ActionResult registrationforms()
        {
            return File("~/Views/Home/registrationforms.html", "text/html");
        }
        public ActionResult applyRegLogin()
        {
            return File("~/Views/Home/applyRegLogin.html", "text/html");
        }
        public ActionResult claimant()
        {
            return File("~/Views/Home/claimant.html", "text/html");
        }
        public ActionResult identifier()
        {
            return File("~/Views/Home/identifier.html", "text/html");
        }
        public ActionResult applyPropertyDetails()
        {
            return File("~/Views/Home/applyPropertyDetails.html", "text/html");
        }
        public ActionResult department()
        {
            return File("~/Views/Home/department.html", "text/html");
        }
        public ActionResult departmentcontent()
        {
            return File("~/Views/Home/departmentcontent.html", "text/html");
        }
        public ActionResult deptsidemenu()
        {
            return File("~/Views/Home/deptsidemenu.html", "text/html");
        }
        public ActionResult dept_home()
        {
            return File("/Views/Home/dept_home.html", "text/html");
        }
        public ActionResult dept_dataEntry()
        {
            return File("~/Views/Home/dept_DataEntry.html", "text/html");
        }
        public ActionResult dept_dataEntry_form()
        {
            return File("~/Views/Home/dept_dataEntry_form.html", "text/html");
        }
        public ActionResult dept_dataEntry_form_property()
        {
            return File("~/Views/Home/dept_dataEntry_form_property.html", "text/html");
        }
        public ActionResult dept_dataEntry_form_claimant()
        {
            return File("~/Views/Home/dept_dataEntry_form_claimant.html", "text/html");
        }
         public ActionResult dept_dataEntry_form_executant()
        {
            return File("~/Views/Home/dept_dataEntry_form_executant.html", "text/html");
        }
         public ActionResult dept_dataEntry_form_identifier()
         {
             return File("~/Views/Home/dept_dataEntry_form_identifier.html", "text/html");
         }
         public ActionResult deptOnlineData()
         {
             return File("~/Views/Home/deptOnlineData.html", "text/html");
         }
         public ActionResult searchReg()
         {
             return File("~/Views/Home/searchReg.html", "text/html");
         }
         public ActionResult modal()
         {
             return File("~/Views/Home/modal.html", "text/html");
         }

        public ActionResult plotVerifyModal()
         {
             return File("~/Views/Home/plotVerifyModal.html", "text/html");
         }
        public ActionResult ModalTemp()
        {
            return File("~/Views/Home/ModalTemp.html", "text/html");
        }
        public ActionResult dept_dataEntry_form_deed()
        {
            return File("~/Views/Home/dept_dataEntry_form_deed.html", "text/html");
        }

        public ActionResult loginPage()
        {
            return File("~/Views/Home/loginPage.html", "text/html");
        }
        public ActionResult ApplyRegSuccess()
        {
            return File("~/Views/Home/ApplyRegSuccess.html", "text/html");
        }
        public ActionResult draftDeeed()
        {
            return File("~/Views/Home/draftDeeed.html", "text/html");
        }
        public ActionResult tpl()
        {
            return File("~/Views/Home/uiBreadcrumbs.tpl.html", "text/html");
        }
        public ActionResult dept_OnlineApplication()
        {
            return File("~/Views/Home/dept_OnlineApplication.html", "text/html");
        }
         public ActionResult dept_dataEntered()
        {
            return File("~/Views/Home/dept_dataEntered.html", "text/html");
        }
         public ActionResult dept_scanDocuments()
        {
            return File("~/Views/Home/dept_scanDocuments.html", "text/html");
        }
         public ActionResult  upload_complete()
        {
            return File("~/Views/Home/upload_complete.html", "text/html");
        }
     
    }
}
