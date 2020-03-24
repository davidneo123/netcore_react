using students.domain.Model.Student;
using students.domain.Repositoy;
using students.infrastructure.Dao;
using students.infrastructure.DataAccess;
using System.Collections.Generic;
using System.Linq;

namespace students.infrastructure.Repositories
{
    public class StudentRepository : Repository<StudentDao, int>, IRepositoryBase<Student, int>
    {

        public StudentRepository(AppDbContext context):base (context)
        {
        }

        public Student Delete(int key)
        {    
            var dao = base.Delete(key);
            return Map(dao);
        }

        public IEnumerable<Student> GetAll()
        {
           var dao = base.GetAll();
           return dao.Select(op => Map(op)).ToList();
        }

        public Student GetById(int key)
        {
            var dao = base.GetById(key);
            return Map(dao);
        }

        public Student Insert(Student entity)
        {
            var dto = Map(entity);
            return Map(base.Insert(dto));
        }

        public Student Update(Student entity)
        {
            var dto = Map(entity);
            return Map(base.Update(dto));
        }

        private StudentDao Map(Student student)
        {
            return new StudentDao
            {
                Id = student?.Id,
                Username = student?.Username,
                FirstName = student?.FirstName,
                LastName = student?.LastName,
                Age = student?.Age ?? 0,
                Career = student?.Career
            };
        }

        private Student Map(StudentDao student)
        {
            return new Student
            {
                Id = student?.Id,
                Username = student?.Username,
                FirstName = student?.FirstName,
                LastName = student?.LastName,
                Age = student?.Age ?? 0,
                Career = student?.Career
            };
        }   
    }
}
