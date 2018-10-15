using MovieCruiser.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieCruiser.Service.Services
{
    /// <summary>
    /// Movie Service Interface
    /// </summary>
    public interface IMovieService
    {
        List<Movie> GetAllMovies();
        Movie GetMovieById(int id);
        Movie AddMovie(Movie movie);
        void UpdateMovieComments(int id, string comments);
        void DeleteMovie(int id);
    }
}
