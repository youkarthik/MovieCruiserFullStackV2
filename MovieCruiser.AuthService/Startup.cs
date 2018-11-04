using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MovieCruiser.AuthService.DataAccess;
using MovieCruiser.AuthService.DB;
using MovieCruiser.AuthService.Services;
using Swashbuckle.AspNetCore.Swagger;

namespace MovieCruiser.AuthService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connString = Environment.GetEnvironmentVariable("SQL_AUTH");
            if (string.IsNullOrEmpty(connString))
                connString = Configuration.GetConnectionString("UserDbContext");

            // Dependency injection
            services.AddDbContext<UserDbContext>(x => x.UseSqlServer(connString));
            services.AddScoped<IUserDbContext, UserDbContext>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITokenGenerator, TokenGenerator>();
            services.AddScoped<IUserService, UserService>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "MovieCruiser Auth API", Version = "v1", Description = "MovieCruiser Auth API Description" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //Enabling Cors
            app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Movie Cruiser API");
            });


            app.UseMvc();
        }
    }
}
