using System.Web;
using System.Web.Optimization;

namespace eReg
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/ui-bootstrap-tpls-0.12.0.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/ng-grid.css",
                      "~/Content/site.css"));
            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                      "~/Scripts/angular.js",
                      "~/Scripts/angular-ui-router.js",
                      "~/Scripts/ct-ui-router-extras.js",
                      "~/Scripts/angular-sanitize.js",
                      
                     
                      "~/Scripts/app/app.js",
                       "~/Scripts/smart-table.min.js",
                        "~/Scripts/ui-utils.js",
                       "~/Scripts/app/Modules/ErrorHandler.js",
                      "~/Scripts/app/controller/MainController.js",
                      "~/Scripts/app/factory/dataFactory.js",
                       "~/Scripts/app/factory/ApplyRegModel.js",
                      "~/Scripts/app/factory/sessionFactory.js",
                       "~/Scripts/app/factory/dept_sessionFactory.js",
                        "~/Scripts/app/factory/deptModelService.js",
                        "~/Scripts/app/factory/dept_dataFactory.js",
                        "~/Scripts/app/factory/timestampMarker.js",
                      "~/Scripts/app/factory/angularModalService.js",
                       "~/Scripts/app/factory/requestNotificationChannel.js",
                       "~/Scripts/app/directive/loadingWidget.js",
                       "~/Scripts/app/directive/uiBreadcrumbs.js",
                      "~/Scripts/app/controller/registrationController.js",
                       "~/Scripts/app/controller/dept_regController.js",
                       "~/Scripts/app/service/ModalService.js"

                      ));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = false;
        }
    }
}
