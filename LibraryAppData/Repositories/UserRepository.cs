using LibraryAppData.Context;
using LibraryAppData.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAppData.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly LibraryContext _context;

        public UserRepository(LibraryContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users
                                .Include(u => u.Office)
                                .Include(u => u.Role)
                                .ToListAsync();
        }
        public async Task<User> GetUserAsync(int id)
        {
            return await _context.Users
                    .Include(u => u.Office)
                    .Include(u => u.Role)
                .Where(user => user.Id == id)
                .FirstOrDefaultAsync();
        }
        public async Task<User> GetUserAsync(string email)
        {
            return await _context.Users
                    .Include(u => u.Office)
                    .Include(u => u.Role)
                .Where(user => user.Email == email)
                .FirstOrDefaultAsync();
        }
        public async Task<bool> UserExistsAsync(int id)
        {
            return await _context.Users.AnyAsync(user => user.Id == id);
        }
        public async Task<bool> UserExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(user => user.Email == email);
        }
        public void CreateUser(User user)
        {
            _context.Users.Add(user);
        }
        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(user => user.Email == email);
        }
        public async Task<bool> EmailExistsAsync(string email, int id)
        {
            var filteredUsers = await GetFilteredUsersAsync(id);
            return filteredUsers.Any(user => user.Email == email);
        }
        public async Task<bool> PhoneNumberExistsAsync(string phoneNumber)
        {
            return await _context.Users.AnyAsync(user => user.PhoneNumber == phoneNumber);
        }
        public async Task<bool> PhoneNumberExistsAsync(string phoneNumber, int id)
        {
            var filteredUsers = await GetFilteredUsersAsync(id);
            return filteredUsers.Any(user => user.PhoneNumber == phoneNumber);
        }
        public async Task<IEnumerable<User>> GetFilteredUsersAsync(int id)
        {
            var users = await GetUsersAsync();
            return users.Where(user => user.Id != id).ToList();
        }
        public void DeleteUser(User user)
        {
            _context.Users.Remove(user);
        }
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
