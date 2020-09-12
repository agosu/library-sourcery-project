using LibraryAppData.Context;
using LibraryAppData.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAppData.Repositories
{
    public class LibraryRepository : ILibraryRepository
    {
        private readonly LibraryContext _context;

        public LibraryRepository(LibraryContext libraryContext)
        {
            _context = libraryContext ?? throw new ArgumentNullException(nameof(libraryContext));
        }

        public async Task<bool> LibraryExists(int bookId)
        {
            return await _context.Libraries
                .AnyAsync(library => library.BookId == bookId);
        }

        public async Task<bool> LibraryExists(int bookId, int officeId)
        {
            return await _context.Libraries
                .AnyAsync(library => (library.BookId == bookId && library.OfficeId == officeId));
        }

        public async Task<Library> GetLibrary(int bookId, int officeId)
        {
            return await _context
                            .Libraries
                            .FirstOrDefaultAsync(l => (l.BookId == bookId && l.OfficeId == officeId));
        }

        public async Task<List<Library>> GetLibrariesByBookId(int bookId)
        {
            return await _context.Libraries
                .Where(l => l.BookId == bookId)
                .Include(l => l.Book)
                .Include(l => l.Office)
                .ToListAsync();
        }

        public void AddLibrary(Library library)
        {
            library.CreatedOn = DateTime.Now;
            library.UpdatedById = library.CreatedById;
            library.UpdatedOn = DateTime.Now;

            _context.Libraries.Add(library);
        }

        public void DeleteLibrary(Library library)
        {
            _context.Libraries.Remove(library);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<LibraryBalanceView> GetBookCount(int libraryId)
        {
            return await _context.LibraryBalanceView.Where(l => l.Id == libraryId).FirstOrDefaultAsync();
        }
    }
}
