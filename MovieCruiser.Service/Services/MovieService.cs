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
        public List<Movie> GetAllMovies()
        {
            return _repository.GetAllMovies();
        }
    }
}
