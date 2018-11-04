using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MovieCruiser.AuthService.DB;
using MovieCruiser.AuthService.Models;

namespace MovieCruiser.AuthService.DataAccess
{
    public class UserRepository : IUserRepository
    {
        private readonly IUserDbContext _context;

        public UserRepository(IUserDbContext context)
        {
            _context = context;
        }
        public User AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public User GetUser(string userId, string password)
        {
            return _context.Users.FirstOrDefault(x => x.UserId == userId && x.Password == password);
        }
    }
}
