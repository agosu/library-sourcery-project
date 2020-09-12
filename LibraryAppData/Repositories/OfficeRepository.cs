using LibraryAppData.Context;
using LibraryAppData.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryAppData.Repositories
{
    public class OfficeRepository : IOfficeRepository
    {
        private readonly LibraryContext _context;

        public OfficeRepository(LibraryContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Office>> GetOffices()
        {
            return await _context.Offices.ToListAsync();
        }
    }
}
