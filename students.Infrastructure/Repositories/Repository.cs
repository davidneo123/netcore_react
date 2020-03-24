using students.infrastructure.DataAccess;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace students.infrastructure.Repositories
{
    public abstract class Repository<TEntity, TKey> where TEntity : class, new()
    {
        private readonly AppDbContext _context;

        internal Repository(AppDbContext context)
        {
            _context = context;
        }

        protected IEnumerable<TEntity> GetAll()
        {
            using (_context)
            {
                Task<List<TEntity>> task =  _context.Set<TEntity>().ToListAsync();
                task.Wait();
                return task.Result;
            }
        }

        protected TEntity GetById(TKey key)
        {
            using (_context)
            {
                return _context.Set<TEntity>().Find(key);
            }
        }
        protected TEntity Insert(TEntity entity)
        {
            using (_context)
            {
               var c = _context.Add(entity);
                _context.SaveChanges();
                return c.Entity;
           }
        }

        protected TEntity Update(TEntity entity)
        {
            using (_context)
            {
                _context.Entry(entity).State = EntityState.Modified;
                _context.SaveChanges();
                return entity;
            }
        }
        protected TEntity Delete(TKey key)
        {
            using (_context)
            {
                var entity = _context.Set<TEntity>().Find(key);
                _context.Set<TEntity>().Remove(entity);
                _context.SaveChanges();
                return entity;
            }
        }
    }
}
