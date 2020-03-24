using students.application.Model;
using System.Collections.Generic;

namespace students.application.Services
{
    public interface IServiceBase<TEntity, TKey> where TEntity : class 
    {
        Response<IEnumerable<TEntity>> GetAll();
        Response<TEntity> GetById(TKey key);
        Response<TEntity> Insert(TEntity dto);
        Response<TEntity> Update(TEntity dto);
        Response<TEntity> Delete(TKey key);
    }
}
