using LibraryAppData.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LibraryAppData.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserAsync(int id);
        Task<User> GetUserAsync(string email);
        Task<bool> UserExistsAsync(int id);
        Task<bool> UserExistsAsync(string email);

        void CreateUser(User user);
        Task SaveAsync();
        Task<bool> EmailExistsAsync(string email);
        Task<bool> EmailExistsAsync(string email, int id);
        Task<bool> PhoneNumberExistsAsync(string phoneNumber);
        Task<bool> PhoneNumberExistsAsync(string phoneNumber, int id);
        Task<IEnumerable<User>> GetFilteredUsersAsync(int id);
        void DeleteUser(User user);
    }
}
