using MovieCruiser.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieCruiser.Service.Services
{
    public interface IMovieService
    {
        List<Movie> GetAllMovies();
    }
}
