using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Http;
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
            var userId = "user1";
            var mockRepo = new Mock<IMovieRepository>();
            Mock<IHttpContextAccessor> mockContext = GetMockContext();
            mockRepo.Setup(x => x.GetMovies(userId)).Returns(this.GetMovies());
            var service = new MovieService(mockRepo.Object, mockContext.Object);

            //act
            var actual = service.GetAllMovies();

            //assert
            Assert.IsAssignableFrom<IEnumerable<Movie>>(actual);
            Assert.True(actual.Count > 0);

        }

        private Mock<IHttpContextAccessor> GetMockContext()
        {
            var mockContext = new Mock<IHttpContextAccessor>();
            var defContext = new DefaultHttpContext();
            defContext.Request.Headers["userId"] = "user1";
            mockContext.Setup(x => x.HttpContext).Returns(defContext);
            return mockContext;
        }

        [Fact]
        public void GetMovieById_ShouldReturnAMovieObject()
        {
            //arrange
            var testMovieId = 10001;
            var mockRepo = new Mock<IMovieRepository>();
            Mock<IHttpContextAccessor> mockContext = GetMockContext();
            mockRepo.Setup(x => x.GetMovieById(testMovieId, "user1")).Returns(this.GetMovies().FirstOrDefault(x => x.Id == testMovieId));
            var service = new MovieService(mockRepo.Object, mockContext.Object);

            //act
            var actual = service.GetMovieById(testMovieId);

            //assert
            Assert.NotNull(actual);
            Assert.IsAssignableFrom<Movie>(actual);
            Assert.True(actual.Id == testMovieId);

        }

        [Fact]
        public void AddMovie_ShouldReturnMovie_forValidMovieId()
        {
            //arrange
            Movie newMovie = new Movie { Id = 10004, Name = "Spiderman", Comments = string.Empty, PosterPath = "spiderman.jpg", ReleaseDate = "13-10-2003", VoteCount = 82345, VoteAverage = 7.9, UserId = "user1" };
            var mockRepo = new Mock<IMovieRepository>();
            Mock<IHttpContextAccessor> mockContext = GetMockContext();
            mockRepo.Setup(x => x.AddMovie(newMovie)).Returns(newMovie);
            var service = new MovieService(mockRepo.Object, mockContext.Object);

            //act
            var actual = service.AddMovie(newMovie);

            //assert
            Assert.NotNull(actual);
            Assert.Same(newMovie, actual);
        }

        [Fact]
        public void UpdateMovieComments_ShouldNotThrowException()
        {
            //arrange
            var comment = "thrilling movie with superb climax";
            var movieId = 10001;
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(x => x.UpdateMovieComments(movieId, comment, "user1"));
            Mock<IHttpContextAccessor> mockContext = GetMockContext();
            var service = new MovieService(mockRepo.Object, mockContext.Object);
            //act
            Action actual = () => service.UpdateMovieComments(movieId, comment);
            var expEx = Record.Exception(actual);
            //assert
            Assert.Null(expEx);
           
        }

        [Fact]
        public void DeleteMovie_ShouldNotThrowException()
        {
            //arrange
            var movieId = 10003;
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(x => x.DeleteMovie(movieId, "user1"));
            Mock<IHttpContextAccessor> mockContext = GetMockContext();
            var service = new MovieService(mockRepo.Object, mockContext.Object);

            //act
            Action actual = () => service.DeleteMovie(movieId);
            var actualEx = Record.Exception(actual);
           
            //assert
            Assert.Null(actualEx);

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
