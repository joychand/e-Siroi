using System.Web;
using System.Web.Optimization;

namespace eSiroi.Web.App_Start
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //const string ANGULAR_APP_ROOT = "~/app/";
            //const string VIRTUAL_BUNDLE_PATH =  "~/bundles/eSiroi";

            //var scriptBundle = new ScriptBundle(VIRTUAL_BUNDLE_PATH)
            //     .Include(ANGULAR_APP_ROOT + "app.js")
            //     //.Include( "~/scripts/angular-ui-router.js")
            //     //  .Include(   "~/scripts/ct-ui-router-extras.js")
            //     //   .Include(  "~/scripts/angular-sanitize.js")
            //     //   //.Include(  "~/scripts/smart-table.min.js")
            //     //   .Include(  "~/scripts/ui-utils.js")
            //          //.Include("~/scripts/angular-local-storage.min.js")
            //    .IncludeDirectory(ANGULAR_APP_ROOT + "controller", "*.js", true)
            //    .IncludeDirectory(ANGULAR_APP_ROOT + "directive", "*.js", true)
            //    .IncludeDirectory(ANGULAR_APP_ROOT + "factory", "*.js", true)
            //    .IncludeDirectory(ANGULAR_APP_ROOT + "Module", "*.js", true)
            //    .IncludeDirectory(ANGULAR_APP_ROOT + "service", "*.js", true)
            //    .IncludeDirectory(ANGULAR_APP_ROOT + "services", "*.js", true);

            //bundles.Add(scriptBundle);

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/scripts/bootstrap.js",
                      "~/scripts/respond.js",
                      "~/scripts/ui-bootstrap-tpls-0.12.0.js"));

            bundles.Add(new StyleBundle("~/content/css/styles").Include(
                      "~/content/css/bootstrap.css",
                      "~/content/css/ng-grid.css",
                      "~/content/css/site.css"));
            //bundles.Add(new ScriptBundle("~/bundles/vendor").Include(
            //          "~/scripts/angular.js"
                     
            //    ));
            bundles.Add(new ScriptBundle("~/bundles/app").Include(

                       "~/app/app.js",
                       "~/app/Module/ErrorHandler.js",
                       "~/app/Module/MultiDatePicker.js",
                      "~/app/controller/MainController.js",
                      "~/app/factory/dataFactory.js",
                       "~/app/factory/ApplyRegModel.js",
                      "~/app/factory/sessionFactory.js",
                       "~/app/factory/dept_sessionFactory.js",
                        "~/app/factory/deptModelService.js",
                        "~/app/factory/dept_dataFactory.js",
                        //"~/app/factory/timestampMarker.js",
                      "~/app/factory/angularModalService.js",
                       "~/app/factory/httpLoaderInterceptor.js",
                        "~/app/factory/userService.js",
                       "~/app/directive/loadingWidget.js",
                        "~/app/directive/fileUpload.js",
                       "~/app/directive/uiBreadcrumbs.js",
                      "~/app/controller/registrationController.js",
                       "~/app/controller/dept_regController.js",
                       "~/app/controller/Operator/dept_OnlineDeedController.js",
                       "~/app/service/ModalService.js",
                       "~/app/services/*.js",
                       "~/app/controller/Operator/schedulerController.js",
                       "~/app/controller/Operator/updateController.js",
                        "~/app/controller/Operator/operatorController.js"

                      //"~/scripts/authComplete.js"

                      ));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            //BundleTable.EnableOptimizations = true;
        }
    }
}
