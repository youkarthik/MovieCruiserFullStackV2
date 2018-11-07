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

        /// <summary>
        /// Movie Repository constuctor to inject movie db context
        /// </summary>
        /// <param name="context">movie db context</param>
        public MovieRepository(IMoviesDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Repository method to return all movies
        /// </summary>
        /// <returns></returns>
        public List<Movie> GetMovies(string userId)
        {
            return _context.Movies.Where( x=> x.UserId == userId).ToList();
        }

        /// <summary>
        /// repository method to get movie by its id
        /// </summary>
        /// <param name="id">key identifier</param>
        /// <returns>movie object</returns>
        public Movie GetMovieById(int id, string userId)
        {
            var movie = _context.Movies.Where(x => x.Id == id && x.UserId == userId).FirstOrDefault();
            if (movie != null)
            {
                return movie;
            }
            else
            {
                throw new ArgumentException("Movie with specified id not found");
            }
        }

        /// <summary>
        /// Repository method to add  movie to the colleciton
        /// </summary>
        /// <param name="movie"></param>
        /// <returns></returns>
        public Movie AddMovie(Movie movie)
        {
            var movieExists = _context.Movies.Any(e => e.Id == movie.Id && e.UserId == movie.UserId);
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

        /// <summary>
        /// Mehtod to update comment of a movieby its id
        /// </summary>
        /// <param name="id">key identifier</param>
        /// <param name="comments">comments string</param>
        public void UpdateMovieComments(int id, string comments, string userId)
        {
            var movie = _context.Movies.Where(x => x.Id == id && x.UserId == userId).FirstOrDefault();

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

        /// <summary>
        /// Method toe delete movie by its id
        /// </summary>
        /// <param name="id">key identifier</param>
        public void DeleteMovie(int id, string userId)
        {
            var movie = _context.Movies.Where(x => x.Id == id && x.UserId == userId).FirstOrDefault();

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
