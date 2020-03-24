using students.application.Model;
using students.domain.DomainExceptions;
using System;

namespace students.application.Services
{
    public abstract class  ApplicationServiceBase
    {
        public Response<T> Execute<T>(Func<T> func) where T : class
        {
            var response = new Response<T>();
            try
            {
                response.Success = true;
                response.Object = func.Invoke();
                response.Code = 1;
            }
            catch (DomainException ex) {
                response.Success = false;
                response.Object = null;
                response.Message = ex.Message;
                response.Code = 0;
            }
            catch (Exception e )
            {
                //Graben en un log
                response.Success = false;
                response.Object = null;
                response.Message = "Internal error server";
                response.Code = 0;
            }
            return response;
        }
    }
}
