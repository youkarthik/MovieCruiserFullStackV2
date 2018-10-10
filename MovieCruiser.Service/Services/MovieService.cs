using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MovieCruiser.Service.DataAccess;
using MovieCruiser.Service.Models;

namespace MovieCruiser.Service.Services
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _repository;
        public MovieService(IMovieRepository repository)
        {
            _repository = repository;
        }

        public Movie AddMovie(Movie movie)
        {
            return _repository.AddMovie(movie);
        }

        public void DeleteMovie(int id)
        {
            _repository.DeleteMovie(id);
        }

        public List<Movie> GetAllMovies()
        {
            return _repository.GetAllMovies();
        }

        public Movie GetMovieById(int id)
        {
            return _repository.GetMovieById(id);
        }

        public void UpdateMovieComments(int id, string comments)
        {
            _repository.UpdateMovieComments(id, comments);
        }
    }
}
