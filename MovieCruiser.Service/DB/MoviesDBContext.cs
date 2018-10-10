using Microsoft.EntityFrameworkCore;
using MovieCruiser.Service.Models;

namespace MovieCruiser.Service.DB
{
    public class MoviesDbContext : DbContext, IMoviesDbContext
    {
        public MoviesDbContext()
        {

        }
        public MoviesDbContext(DbContextOptions options) : base (options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Movie> Movies { get; set; }
    }
}
