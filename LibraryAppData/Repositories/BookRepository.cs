using LibraryAppData.Context;
using LibraryAppData.Models;
using LibraryAppData.Utilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAppData.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly LibraryContext _context;

        public BookRepository(LibraryContext libraryContext)
        {
            _context = libraryContext ?? throw new ArgumentNullException(nameof(libraryContext));
        }
        public async Task<bool> BookExists(int id)
        {
            return await _context.Books.AnyAsync(b => b.Id == id);
        }
        public void AddBook(Book book)
        {
            _context.Books.Add(book);
        }

        public async Task<Book> GetBook(int id)
        {
            return await _context.Books
                .Where(b => b.Id == id)
                .Include(b => b.Category)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Book>> GetBooks(BookFilters filters)
        {
            var bookEntities = await _context.Books.Include(b => b.Category).ToListAsync();
            var libraryEntities = await _context.Libraries.ToListAsync();
            var libraryEntitieId = new List<int>();
            var filteredBooks = new List<Book>();
            if (filters.office != null)
            {
                libraryEntitieId = libraryEntities
                .Where(lib => lib.OfficeId == filters.office)
                .Select(lib => lib.BookId)
                .ToList();
                foreach (var bookId in libraryEntitieId)
                {
                    filteredBooks.Add(await _context.Books.Where(book => book.Id == bookId).Include(book => book.Category).FirstOrDefaultAsync());
                }
            }
            if (filters.category != null)
            {
                
                if (filteredBooks.Count > 0 && !filters.category.Contains(1))
                {
                    var returnList = new List<Book>();
                    foreach (var category in filters.category)
                    {
                        var filteredByCategories = filteredBooks.Where(book => book.Category.Id == category).ToList();
                        foreach(var book in filteredByCategories)
                        {
                            if (!returnList.Contains(book))
                            {
                                returnList.Add(book);
                            }
                        }
                    }
                    filteredBooks = returnList;
                }
                else if (!filters.category.Contains(1))
                {
                    var returnList = new List<Book>();
                    foreach (var category in filters.category)
                    {
                        var filteredByCategories = bookEntities.Where(book => book.Category.Id == category).ToList();
                        foreach (var book in filteredByCategories)
                        {
                            if (!returnList.Contains(book))
                            {
                                returnList.Add(book);
                            }
                        }
                    }
                    bookEntities = returnList;
                }
            }
            if (filters.available != null)
            {
                if(filteredBooks.Count > 0)
                {
                    filteredBooks = filteredBooks.Where(book => book.IsAvailable == filters.available).ToList();
                }
                else
                {
                    bookEntities = bookEntities.Where(b => b.IsAvailable == filters.available).ToList();
                }
                
            }

            return (filteredBooks.Count > 0 ? filteredBooks : bookEntities);
        }
        public void DeleteBook(Book book)
        {
            _context.Books.Remove(book);
        }
        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}
