
using LibraryAppData.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryAppData.Repositories
{
    public interface ICategoryRepository
    {
        public Task<IEnumerable<Category>> GetCategories();
    }
}
