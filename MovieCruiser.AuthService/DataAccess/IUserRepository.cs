using MovieCruiser.AuthService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieCruiser.AuthService.DataAccess
{
    public interface IUserRepository
    {
        User AddUser(User user);
        User GetUser(string userName, string password);
    }
}
