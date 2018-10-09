using System;
using System.Collections.Generic;
using System.Text;
using Moq;
using MovieCruiser.Service.DataAccess;
using MovieCruiser.Service.Models;
using MovieCruiser.Service.Services;
using Xunit;

namespace MovieCruiser.Test
{
    public class MovieServiceTest
    {
        [Fact]
        public void GetAllMovies_ShouldReturnListofMovie()
        {   
            //arrange
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(x => x.GetAllMovies()).Returns(this.GetMovies());
            var service = new MovieService(mockRepo.Object);

            //act
            var actual = service.GetAllMovies();

            //assert
            Assert.IsAssignableFrom<IEnumerable<Movie>>(actual);
            Assert.True(actual.Count > 0);

        }

        private List<Movie> GetMovies()
        {
            var movies = new List<Movie>();
            movies.Add(new Movie { Id = 10001, Name = "Avatar", Comments = string.Empty, PosterPath = "avatar.jpg", ReleaseDate = "12-10-2009", VoteCount = 12345, VoteAverage = 7.5 });
            movies.Add(new Movie { Id = 10002, Name = "Titanic", Comments = string.Empty, PosterPath = "titanic.jpg", ReleaseDate = "12-10-1997", VoteCount = 72345, VoteAverage = 7.8 });
            movies.Add(new Movie { Id = 10003, Name = "Jurassic Park", Comments = string.Empty, PosterPath = "jurassicpartk.jpg", ReleaseDate = "13-10-1993", VoteCount = 82345, VoteAverage = 7.9 });
            return movies;
        }

    }
}
