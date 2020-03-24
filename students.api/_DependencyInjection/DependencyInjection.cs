using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using students.application.Dto;
using students.application.implements.Services;
using students.application.Services;
using students.domain.Model.Student;
using students.domain.Repositoy;
using students.infrastructure.DataAccess;
using students.infrastructure.Repositories;

namespace students.api._DependencyInjection
{
    public static class DependencyInjection
    {
        internal static void Start(this IServiceCollection services, IConfiguration configuration)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseSqlite(configuration.GetConnectionString("ConnectionStudents"));
            optionsBuilder.EnableSensitiveDataLogging();
            services.AddTransient(s=> new AppDbContext(optionsBuilder.Options));
            services.AddTransient(s => new StudentRepository(s.GetRequiredService<AppDbContext>()) as IRepositoryBase<Student, int>);
            services.AddTransient(s => new StudentsServices(s.GetRequiredService<IRepositoryBase<Student, int>>()) as IServiceBase<StudentDto, int>);

        }
    }
}
