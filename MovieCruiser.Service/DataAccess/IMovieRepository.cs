using MovieCruiser.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieCruiser.Service.DataAccess
{
    /// <summary>
    /// Movie repository interface
    /// </summary>
    public interface IMovieRepository
    {
        List<Movie> GetMovies(string userId);
        Movie GetMovieById(int id, string userId);
        Movie AddMovie(Movie movie);
        void UpdateMovieComments(int id, string comments, string userId);
        void DeleteMovie(int id, string userId);
    }
}
