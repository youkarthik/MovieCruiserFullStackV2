using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MovieCruiser.AuthService.DataAccess;
using MovieCruiser.AuthService.Models;

namespace MovieCruiser.AuthService.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;

        public UserService(IUserRepository repo)
        {
            _repo = repo;
        }
        public User GetUserByCredentials(string userId, string password)
        {
            var user = _repo.GetUser(userId, password);
            if (user != null)
            {
                return user;
            }
            else
            {
                throw new ArgumentException("Invalid UserId or Password");
            }
        }

        public User RegisterUser(User user)
        {
            throw new NotImplementedException();
        }
    }
}
