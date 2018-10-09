using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MovieCruiser.Service.DB;
using MovieCruiser.Service.Models;

namespace MovieCruiser.Service.DataAccess
{
    public class MovieRepository : IMovieRepository
    {
        private readonly IMoviesDbContext _context;
        public MovieRepository(IMoviesDbContext context)
        {
            _context = context;
        }
        public List<Movie> GetAllMovies()
        {
            return _context.Movies.ToList();
        }
    }
}
