using eSiroi.Authentication.Infrastructure;
using eSiroi.Authentication.Model;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;

namespace eSiroi.Authentication.Controllers
{
     [RoutePrefix("api/accounts")]
    public class AccountsController : BaseApiController
    {
         [Route("create")]
         public async Task<IHttpActionResult> CreateUser(CreateUserBindingModel createUserModel)
         {
             if (!ModelState.IsValid)
             {
                 return BadRequest(ModelState);
             }

             var user = new ApplicationUser()
             {
                 UserName = createUserModel.Username,
                 //Email = createUserModel.Email,
                 //FirstName = createUserModel.FirstName,
                 //LastName = createUserModel.LastName,
                 //Level = 3,
                 //JoinDate = DateTime.Now.Date,
             };

             IdentityResult addUserResult = await this.AppUserManager.CreateAsync(user, createUserModel.Password);

             if (!addUserResult.Succeeded)
             {
                 return GetErrorResult(addUserResult);
             }
             // Adding pulic user role 
            
             var role = "public";
             IdentityResult result = await this.AppUserManager.AddToRoleAsync(user.Id,role);
          
             if (!result.Succeeded)
             {
                 return GetErrorResult(result);
             }

            Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));

             return Created(locationHeader, TheModelFactory.Create(user));
         }


         [Route("user/{id:guid}", Name = "GetUserById")]
         public async Task<IHttpActionResult> GetUser(string Id)
         {
             var user = await this.AppUserManager.FindByIdAsync(Id);

             if (user != null)
             {
                 return Ok(this.TheModelFactory.Create(user));
             }

             return NotFound();

         }
         [HttpGet]
         [Route("happu/approved")]
         public IHttpActionResult happu()
         {
             return Ok();
         }
     
     }
}
