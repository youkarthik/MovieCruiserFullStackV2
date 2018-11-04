using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieCruiser.AuthService.Services
{
    public interface ITokenGenerator
    {
        string GetJwtToken(string userId);
    }
}
