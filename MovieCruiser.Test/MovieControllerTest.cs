using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

using Moq;
using MovieCruiser.Service.Controllers;
using MovieCruiser.Service.Models;
using MovieCruiser.Service.Services;
using Xunit;

namespace MovieCruiser.Test
{
    public class MovieControllerTest
    {
        [Fact]
        public void GetMethodWithoutParam_ShouldReturnListofMovie()
        {   
            //arrange
            var mockRepo = new Mock<IMovieService>();
            mockRepo.Setup(x => x.GetAllMovies()).Returns(this.GetMovies());
            var controller = new MovieController(mockRepo.Object);

            //act
            var actual = controller.Get();

            //assert
            var result = Assert.IsType<OkObjectResult>(actual);
            Assert.IsAssignableFrom<IEnumerable<Movie>>(result.Value);
            

        }

        [Fact]
        public void GetMethodWithParam_ShouldReturnAMovie()
        {
            //arrange
            var testMovieId = 10001;
            var mockRepo = new Mock<IMovieService>();
            mockRepo.Setup(x => x.GetMovieById(testMovieId)).Returns(this.GetMovies().FirstOrDefault(x => x.Id == testMovieId));
            var controller = new MovieController(mockRepo.Object);

            //act
            var actual = controller.Get(testMovieId);

            //assert
            var result = Assert.IsType<OkObjectResult>(actual);
            Assert.IsAssignableFrom<Movie>(result.Value);
        }

        [Fact]
        public void PostMethod_ShouldReturnPostedMovie()
        {
            //arrange
            Movie newMovie = new Movie { Id = 10004, Name = "Spiderman", Comments = string.Empty, PosterPath = "spiderman.jpg", ReleaseDate = "13-10-2003", VoteCount = 82345, VoteAverage = 7.9 };
            var mockRepo = new Mock<IMovieService>();
            mockRepo.Setup(x => x.AddMovie(newMovie)).Returns(newMovie);
            var controller = new MovieController(mockRepo.Object);

            //act
            var actual = controller.Post(newMovie);

            //assert
            var result = Assert.IsType<CreatedResult>(actual);
            Assert.IsAssignableFrom<Movie>(result.Value);
        }

        [Fact]
        public void DeleteMethod_ShouldReturnOkResult()
        {
            //arrange
            int movieId = 10001;
            var mockRepo = new Mock<IMovieService>();
            mockRepo.Setup(x => x.DeleteMovie(movieId));
            var controller = new MovieController(mockRepo.Object);

            //act
            var actual = controller.Delete(movieId);

            //assert
            Assert.IsType<OkResult>(actual);

        }

        [Fact]
        public void PutMehtod_ShouldReturnOkResult()
        {
            //arrange
            int movieId = 10003;
            var mockRepo = new Mock<IMovieService>();
            mockRepo.Setup(x => x.UpdateMovieComments(movieId, "test"));
            var controller = new MovieController(mockRepo.Object);

            //act
            var actual = controller.Put(movieId, "test");

            //assert
            Assert.IsType<OkResult>(actual);

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
