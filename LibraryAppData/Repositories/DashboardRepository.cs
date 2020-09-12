using LibraryAppData.Context;
using LibraryAppData.Models;
using LibraryAppData.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAppData.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly LibraryContext _context;
        private readonly IConfiguration _configuration;

        public DashboardRepository(LibraryContext context, IConfiguration configuration)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }
        public async Task<IEnumerable<Book>> CurrentlyReadingBooksAsync(int userId, bool includeAlreadyRead = false)
        {
               //IF TRUE IS PASSED AS SECOND PARAMETER IT WILL INCLUDE ALL BOOKS THAT THE USER HAS READ INCLUDING ONES BEING READ
               //BY DEFAULT (FALSE) IT WILL RETURN ONLY THE BOOKS THAT HE HAS NOT YET RETURNED
            if (includeAlreadyRead)
            {
                var libraryIdsAll = await _context.Reservations
                    .Where(res => res.User.Id == userId)
                    .Select(res => res.Library.Id)
                    .ToListAsync();
                var AllReadingBooks = new List<Book>();
                foreach (var libraryId in libraryIdsAll)
                {
                    var book = await _context.Libraries
                       .Include(lib => lib.Book).ThenInclude(book => book.Category)
                       .Where(lib => lib.Id == libraryId)
                       .Select(lib => lib.Book)
                       .FirstOrDefaultAsync();
                    AllReadingBooks.Add(book);
                }
                return AllReadingBooks;
            }
            DateTime? nullDateTime = null;
            var libraryIdsBeingRead = await _context.Reservations
                .Where(res => res.User.Id == userId)
                .Where(res => res.ReturnDate == nullDateTime)
                .Select(res => res.Library.Id)
                .ToListAsync();
            var currentlyReading = new List<Book>();
            foreach(var libraryId in libraryIdsBeingRead)
            {
                var book = await _context.Libraries
                    .Include(lib => lib.Book).ThenInclude(book => book.Category)
                    .Where(lib => lib.Id == libraryId)
                    .Select(lib => lib.Book)
                    .FirstOrDefaultAsync();
                currentlyReading.Add(book);
            }
            return currentlyReading;
        }

        public IEnumerable<int> GetBookIdsBeingReadAsync(IEnumerable<Book> books)
        {
            var booksBeingReadIds = new List<int>();
            foreach (var book in books)
            {
                booksBeingReadIds.Add(book.Id);
            }
            return booksBeingReadIds;
        }

        public IEnumerable<string> GetCategoriesBeingReadAsync(IEnumerable<Book> books)
        {
            var categoriesBeingRead = new List<string>();
            foreach (var book in books)
            {
                categoriesBeingRead.Add(book.Category.Text);
            }
            return categoriesBeingRead;
        }

        public async Task<IEnumerable<Book>> NewBooksAsync()
        {
            var dateTimeFilter = DateTimePeriodCalculator.NewestBookTimeFilter(-_configuration.GetValue<int>("AppSettings:TimePeriodForNewBooksInDays"));
            return await _context.Libraries
                .Where(lib => lib.CreatedOn >= dateTimeFilter)
                .OrderByDescending(lib => lib.CreatedOn)
                .Select(lib => lib.Book)
                .ToListAsync();
        }

        public async Task<IEnumerable<Book>> SortedBooksByRatingAsync(int userId)
        {
            var userOffice = await _context.Users
                .Where(user => user.Id == userId)
                .Select(user => user.OfficeId)
                .FirstOrDefaultAsync();
            return await _context.Libraries
                .Where(lib => lib.OfficeId == userOffice)
                .Select(lib => lib.Book)
                .OrderByDescending(book => book.Rating)
                .ToListAsync();
        }

        public async Task<IEnumerable<Book>> YouMightEnjoyBooksAsync(int userId)
        {
            var currentlyReadingAndHasRead = await CurrentlyReadingBooksAsync(userId, true);
            if(currentlyReadingAndHasRead.Count() == 0)
            {
                return await SortedBooksByRatingAsync(userId);
            }
            // Once category table has been created switch string with category entity??
            var booksBeingReadIds = GetBookIdsBeingReadAsync(currentlyReadingAndHasRead);
            var categoriesBeingRead = GetCategoriesBeingReadAsync(currentlyReadingAndHasRead);
            var filteredBooks = await _context.Libraries
                .Include(lib => lib.Book).ThenInclude(book => book.Category)
                .Where(lib => lib.OfficeId == _context.Users.Where(user => user.Id == userId).Select(user => user.OfficeId).FirstOrDefault())
                .Select(lib => lib.Book)
                .Where(book => !booksBeingReadIds.Contains(book.Id))
                .Where(book => categoriesBeingRead.Contains(book.Category.Text))
                .OrderByDescending(book => book.Rating)
                .ToListAsync();
            return filteredBooks;
        }

    }
}
