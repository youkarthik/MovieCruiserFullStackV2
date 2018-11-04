using MovieCruiser.AuthService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieCruiser.AuthService.Services
{
    public interface IUserService
    {
        User GetUserByCredentials(string userId, string password);
        User RegisterUser(User user);
    }
}
