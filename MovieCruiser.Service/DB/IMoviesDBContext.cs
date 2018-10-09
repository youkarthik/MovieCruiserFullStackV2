using Microsoft.EntityFrameworkCore;
using MovieCruiser.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieCruiser.Service.DB
{
    public interface IMoviesDbContext
    {
        DbSet<Movie> Movies { get; set; }
        int SaveChanges();
    }
}
