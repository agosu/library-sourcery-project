using LibraryAppData.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryAppData.Repositories
{
    public interface ILibraryRepository
    {
        Task<bool> LibraryExists(int bookId);
        Task<bool> LibraryExists(int bookId, int officeId);
        Task<Library> GetLibrary(int bookId, int officeId);
        Task<LibraryBalanceView> GetBookCount(int libraryId);
        Task<List<Library>> GetLibrariesByBookId(int bookId);
        void AddLibrary(Library library);
        void DeleteLibrary(Library library);
        Task Save();
    }
}
