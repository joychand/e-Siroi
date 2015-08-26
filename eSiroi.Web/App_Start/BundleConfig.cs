using System.Web;
using System.Web.Optimization;

namespace eSiroi.Web.App_Start
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
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

            bundles.Add(new StyleBundle("~/content/css").Include(
                      "~/content/css/bootstrap.css",
                      "~/content/css/ng-grid.css",
                      "~/content/css/site.css"));
            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                      "~/scripts/angular.js",
                      "~/scripts/angular-ui-router.js",
                      "~/scripts/ct-ui-router-extras.js",
                      "~/scripts/angular-sanitize.js",
                       "~/app/app.js",
                       "~/scripts/smart-table.min.js",
                        "~/scripts/ui-utils.js",
                       "~/app/Module/ErrorHandler.js",
                      "~/app/controller/MainController.js",
                      "~/app/factory/dataFactory.js",
                       "~/app/factory/ApplyRegModel.js",
                      "~/app/factory/sessionFactory.js",
                       "~/app/factory/dept_sessionFactory.js",
                        "~/app/factory/deptModelService.js",
                        "~/app/factory/dept_dataFactory.js",
                        //"~/app/factory/timestampMarker.js",
                      "~/app/factory/angularModalService.js",
                       "~/app/factory/requestNotificationChannel.js",
                       "~/app/directive/loadingWidget.js",
                       "~/app/directive/uiBreadcrumbs.js",
                      "~/app/controller/registrationController.js",
                       "~/app/controller/dept_regController.js",
                       "~/app/service/ModalService.js",
                       "~/app/services/*.js",
                      "~/scripts/angular-local-storage.min.js"
                      //"~/scripts/authComplete.js"

                      ));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = false;
        }
    }
}
