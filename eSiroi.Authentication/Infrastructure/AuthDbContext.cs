using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;


namespace eSiroi.Authentication.Infrastructure
{
    public class AuthDbContext:IdentityDbContext<ApplicationUser>
    {
        public AuthDbContext()
            : base("eSiroiAuthconnection")
        {
            {
                Configuration.ProxyCreationEnabled = false;
                Configuration.LazyLoadingEnabled = false;
            }
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ApplicationUser>().ToTable("Users");
            modelBuilder.Entity<IdentityRole>().ToTable("Roles");
            modelBuilder.Entity<IdentityUserRole>().ToTable("UserRoles");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("UserLogins");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("UserClaims");


        }
        public static AuthDbContext Create()
        {
            return new AuthDbContext();
        }
    }
}