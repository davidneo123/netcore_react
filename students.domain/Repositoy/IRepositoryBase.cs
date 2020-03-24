using System.Collections.Generic;

namespace students.domain.Repositoy
{
    public interface IRepositoryBase<TEntity, TKey> where TEntity : class,new()
    {
        IEnumerable<TEntity> GetAll();
        TEntity GetById(TKey key);
        TEntity Insert(TEntity entity);
        TEntity Update(TEntity entity);
        TEntity Delete(TKey key);
    }
}
