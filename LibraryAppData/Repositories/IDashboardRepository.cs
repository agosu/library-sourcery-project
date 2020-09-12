

using LibraryAppData.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryAppData.Repositories
{
    public interface IDashboardRepository
    {
        Task<IEnumerable<Book>> NewBooksAsync();
        Task<IEnumerable<Book>> YouMightEnjoyBooksAsync(int userId);
        Task<IEnumerable<Book>> CurrentlyReadingBooksAsync(int userId, bool includeAlreadyRead);
        Task<IEnumerable<Book>> SortedBooksByRatingAsync(int userId);
        IEnumerable<string> GetCategoriesBeingReadAsync(IEnumerable<Book> books);
        IEnumerable<int> GetBookIdsBeingReadAsync(IEnumerable<Book> books);
    }
}
