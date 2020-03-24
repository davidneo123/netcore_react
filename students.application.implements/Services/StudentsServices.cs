using students.application.Dto;
using students.application.Model;
using students.application.Services;
using students.domain.Model.Student;
using students.domain.Repositoy;
using System.Collections.Generic;
using System.Linq;

namespace students.application.implements.Services
{
    public class StudentsServices : ApplicationServiceBase, IServiceBase<StudentDto, int>
    {
        private readonly IRepositoryBase<Student, int> _repositoryBase;

        public StudentsServices(IRepositoryBase<Student, int> repositoryBase)
        {
            _repositoryBase = repositoryBase;
        }

        public Response<StudentDto> Delete(int key)
        {
            return Execute(() => {
                //USE CASE
                var entity = _repositoryBase.Delete(key);
                return Map(entity);
            });
        }

        public Response<IEnumerable<StudentDto>> GetAll()
        {
            return Execute(() => {
                var entities = _repositoryBase.GetAll();
                return Map(entities);
            });
        }

        public Response<StudentDto> GetById(int key)
        {
            return Execute(() => {
                var entity = _repositoryBase.GetById(key);
                return Map(entity);
            });
        }

        public Response<StudentDto> Insert(StudentDto dto)
        {
            return Execute(() => {
                var entity =  Map(dto);
                _repositoryBase.Insert(entity);
                return dto;
            });
        }

        public Response<StudentDto> Update(StudentDto dto)
        {
            return Execute(() => {
                var entity = Map(dto);
                _repositoryBase.Update(entity);
                return dto;
            });
        }
        private StudentDto Map(Student student)
        {
            return new StudentDto {
                Id = student.Id,
                Username = student.Username,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Age = student.Age,
                Career = student.Career
            };
        }

        private Student Map(StudentDto student)
        {
            return new Student
            {
                Id = student.Id,
                Username = student.Username,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Age = student.Age,
                Career = student.Career
            };
        }

        private IEnumerable<StudentDto> Map(IEnumerable<Student> student)
        {
            var list = new List<StudentDto>();     
            student?.ToList().ForEach(it => {
                list.Add(Map(it));
            });
            return list;
        }
    }
}
