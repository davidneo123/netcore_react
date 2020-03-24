using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using students.api._Config;
using students.api._DependencyInjection;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.IO;
using System;

namespace students.api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            DependencyInjection.Start(services, Configuration);
            services.AddControllers();
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins("http://localhost:4200")
                    .WithMethods("GET")
                    .WithMethods("POST")
                    .WithMethods("PUT")
                    .WithMethods("DELETE")
                    .WithHeaders("content-type")
                    .AllowAnyOrigin()
                    .AllowAnyHeader();
                });
            });

            services.AddLocalization();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(SwaggerConfiguration.DocName, new OpenApiInfo
                {
                    Version = SwaggerConfiguration.DocInfoVersion,
                    Title = SwaggerConfiguration.DocInfoTitle,
                    Description = SwaggerConfiguration.DocInfoDescription,
                });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseCors(MyAllowSpecificOrigins);
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint(SwaggerConfiguration.EndpointUrl, SwaggerConfiguration.EndpointDescription);
            });
        }
    }
}
