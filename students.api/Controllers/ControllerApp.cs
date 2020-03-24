
using Microsoft.AspNetCore.Mvc;
using students.application.Model;
using System.Collections.Generic;

namespace students.api.Controllers
{

    public abstract class ControllerApp<TDto, Tkey> : ControllerBase where TDto: class
    {
        public abstract Response<TDto> Post(TDto dto);
        public abstract Response<TDto> Put(TDto dto);
        public abstract Response<IEnumerable<TDto>> GetAll();
        public abstract Response<TDto> GetById(Tkey id);
        public abstract Response<TDto> Delete(Tkey id);
    }
}
