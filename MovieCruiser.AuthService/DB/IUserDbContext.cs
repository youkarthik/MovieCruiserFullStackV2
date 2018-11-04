using Microsoft.EntityFrameworkCore;
using MovieCruiser.AuthService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieCruiser.AuthService.DB
{
    public interface IUserDbContext
    {
        DbSet<User> Users { get; set; }

        int SaveChanges();
    }
}
