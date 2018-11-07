using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MovieCruiser.Service.DataAccess;
using MovieCruiser.Service.DB;
using MovieCruiser.Service.Services;
using Swashbuckle.AspNetCore.Swagger;
using System;

namespace MovieCruiser.Service
{
    public partial class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            // JWT
           ConfigureJwtAuthService(Configuration, services);

            string connectionString = Environment.GetEnvironmentVariable("SQL_MOVIE");

            if (string.IsNullOrEmpty(connectionString))
                connectionString = Configuration.GetConnectionString("MoviesDbContext");
            services.AddDbContext<MoviesDbContext>(x => x.UseSqlServer(connectionString));

            //injecting dependencies
            services.AddHttpContextAccessor(); //injecting IhttpContextAccesssor
            services.AddScoped<IMoviesDbContext, MoviesDbContext>();
            services.AddScoped<IMovieRepository, MovieRepository>();
            services.AddScoped<IMovieService, MovieService>();


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "MovieCruiser API", Version = "v1", Description = "MovieCruiser API Description" });
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            //Enabling Cors
            app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Movie Cruiser API");
            });
            
            app.UseAuthentication();
            //app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
