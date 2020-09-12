using LibraryAppData.Models;
using LibraryAppData.Utilities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryAppData.Repositories
{
     public interface IBookRepository
    {
        Task<bool> BookExists(int id);
        void AddBook(Book book);
        Task<IEnumerable<Book>> GetBooks(BookFilters filters);
        Task<Book> GetBook(int id);
        void DeleteBook(Book book);
        Task Save();
    }
}
