using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using students.application.Dto;
using students.application.Model;
using students.application.Services;
using System.Collections.Generic;

namespace students.api.Controllers
{
    [Route("api/student")]
    public class StudentController : ControllerApp<StudentDto, int>
    {
        private readonly IServiceBase<StudentDto, int> _studentApplicationService;


        public StudentController(IServiceBase<StudentDto, int> studentApplicationService)
        {
            _studentApplicationService = studentApplicationService;
        }

        [HttpDelete]
        public override Response<StudentDto> Delete(int id)
        {
            return _studentApplicationService.Delete(id);
        }

        [HttpGet]
        public override Response<IEnumerable<StudentDto>> GetAll()
        {
            return _studentApplicationService.GetAll();
        }

        [HttpGet("{id}")]
        public override Response<StudentDto> GetById(int id)
        {
            return _studentApplicationService.GetById(id);
        }

        [HttpPost]
        public override Response<StudentDto> Post([FromBody] StudentDto dto)
        {
            return _studentApplicationService.Insert(dto);
        }

        [HttpPut]
        public override Response<StudentDto> Put([FromBody] StudentDto dto)
        {
            return _studentApplicationService.Update(dto);
        }
    }
}
