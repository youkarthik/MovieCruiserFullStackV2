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

        public Movie GetMovieById(int id)
        {
            var movie = _context.Movies.Find(id);
            if (movie != null)
            {
                return movie;
            }
            else
            {
                throw new ArgumentException("Movie with specified id not found");
            }
        }

        public Movie AddMovie(Movie movie)
        {
            var movieExists = _context.Movies.Any(e => e.Id == movie.Id);
            if (!movieExists)
            {
                _context.Movies.Add(movie);
                _context.SaveChanges();
                return movie;
            }
            else
            {
                throw new ArgumentException("Movie with specified id already exists");
            }
        }

        public void UpdateMovieComments(int id, string comments)
        {
            var movie = _context.Movies.Find(id);

            if (movie != null)
            {
                movie.Comments = comments;
                _context.SaveChanges();
            }
            else
            {
                throw new ArgumentException("Movie with specified id not found");
            }
        }

        public void DeleteMovie(int id)
        {
            var movie = _context.Movies.Find(id);

            if (movie != null)
            {
                _context.Movies.Remove(movie);
                _context.SaveChanges();
            }
            else
            {
                throw new ArgumentException("Movie with specified id not found");
            }
        }
    }
}
