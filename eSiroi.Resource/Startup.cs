using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using System.Configuration;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security;
using System.Web.Http;
//using eSiroi.Resource.App_Start;
using Microsoft.Owin.Security.OAuth;
using System.Net.Http.Formatting;
using System.Linq;
using Newtonsoft.Json.Serialization;

[assembly: OwinStartup(typeof(eSiroi.Resource.Startup))]

namespace eSiroi.Resource
{
    public class Startup
    {
       
        public void Configuration(IAppBuilder app)
        {
            app.UseErrorPage();
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            HttpConfiguration appconfig = new HttpConfiguration();
           
            ConfigureWebApi(appconfig);
            
            app.UseWebApi(appconfig);
            ConfigureOAuthTokenConsumption(app);
         
        }
        private void ConfigureWebApi(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                  name: "DefaultApi",
                  routeTemplate: "api/{controller}/{id}",
                  defaults: new { id = RouteParameter.Optional }
              );

            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
        private void ConfigureOAuthTokenConsumption(IAppBuilder app)
        {

            var issuer = "eSiroi";
            string audienceId = ConfigurationManager.AppSettings["as:AudienceId"];
            byte[] audienceSecret = TextEncodings.Base64Url.Decode(ConfigurationManager.AppSettings["as:AudienceSecret"]);

            // Api controllers with an [Authorize] attribute will be validated with JWT
            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions
                {
                    AuthenticationMode = AuthenticationMode.Active,
                    AllowedAudiences = new[] { audienceId },
                    IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
                    {
                        new SymmetricKeyIssuerSecurityTokenProvider(issuer, audienceSecret)
                    }
                });
        }
        //public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
    }
}
