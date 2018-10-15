using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MovieCruiser.Service.DataAccess;
using MovieCruiser.Service.Models;

namespace MovieCruiser.Service.Services
{
    /// <summary>
    /// Movie service class containing the business logc
    /// </summary>
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _repository;
        /// <summary>
        /// Movie service constructor injecting repository object
        /// </summary>
        /// <param name="repository">Repository class instance</param>
        public MovieService(IMovieRepository repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// method to add movie to the movie collection
        /// </summary>
        /// <param name="movie"></param>
        /// <returns></returns>
        public Movie AddMovie(Movie movie)
        {
            return _repository.AddMovie(movie);
        }

        /// <summary>
        /// Method to delete a movie by its id
        /// </summary>
        /// <param name="id">Movie object key identifier</param>
        public void DeleteMovie(int id)
        {
            _repository.DeleteMovie(id);
        }

        /// <summary>
        /// Method to get all movies collection
        /// </summary>
        /// <returns></returns>
        public List<Movie> GetAllMovies()
        {
            return _repository.GetAllMovies();
        }

        /// <summary>
        /// Method to get movie by its id
        /// </summary>
        /// <param name="id">Movie object key identifier</param>
        /// <returns>Movie object</returns>
        public Movie GetMovieById(int id)
        {
            return _repository.GetMovieById(id);
        }

        /// <summary>
        /// method to update the comments of the movie by its id
        /// </summary>
        /// <param name="id">movie key identifier</param>
        /// <param name="comments">comments string</param>
        public void UpdateMovieComments(int id, string comments)
        {
            _repository.UpdateMovieComments(id, comments);
        }
    }
}
