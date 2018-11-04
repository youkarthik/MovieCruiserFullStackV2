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
            var userExists = _context.Users.Any(x => x.UserId == user.UserId);
            if (!userExists)
            {
                _context.Users.Add(user);
                _context.SaveChanges();
            }
            else
            {
                throw new ArgumentException("User with specified id already exists");
            }
            return user;
        }

        public User GetUser(string userId, string password)
        {
            return _context.Users.FirstOrDefault(x => x.UserId == userId && x.Password == password);
        }
    }
}
