using MovieCruiser.Service.DataAccess;
using MovieCruiser.Service.DB;
using MovieCruiser.Service.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace MovieCruiser.Test
{
    public class MovieRepositoryTest : IClassFixture<DatabaseFixture>
    {
        private readonly IMovieRepository _repository;
        DatabaseFixture _fixture;

        public MovieRepositoryTest(DatabaseFixture fixture)
        {
            _fixture = fixture;
            _repository = new MovieRepository(_fixture.dbContext);
        }

        [Fact]
        public void GetAllMovie_ShouldReturnListOfMovie()
        {
            var actual = _repository.GetAllMovies();
            Assert.IsAssignableFrom<IEnumerable<Movie>>(actual);
            Assert.True(actual.Count > 0);
        }

        [Fact]
        //positive
        public void GetMovieById_ShouldReturnMovie_ForValidMovieId()
        {
            //arrange
            var testMovieId = 10001;
            var actual = _repository.GetMovieById(testMovieId);
            Assert.IsAssignableFrom<Movie>(actual);
            Assert.True(actual.Id == testMovieId);
        }

        [Fact]
        //negative
        public void GetMovieById_ShouldReturnMovie_ForInValidMovieId()
        {
            //arrange
            var testMovieId = 20001;
            //act
            Action act = () => _repository.GetMovieById(testMovieId);
            //assert
            Assert.Throws<ArgumentException>(act);
        }

        [Fact]
        public void AddMovie_ShouldReturnMovie_forValidMovieId()
        {
            //arrange
            Movie newMovie = new Movie { Id=10004, Name="Spiderman", Comments = string.Empty, PosterPath = "spiderman.jpg", ReleaseDate = "13-10-2003", VoteCount = 82345, VoteAverage = 7.9 };
            //act
            var actual = _repository.AddMovie(newMovie);
            //assert
            Assert.NotNull(actual);
            Assert.Same(newMovie, actual);
        }

        [Fact]
        public void UpdateMovieComments_GetMethodShouldReturnUpdatedComments()
        {
            //arrange
            var comment = "thrilling movie with superb climax";
            var movieId = 10001;
            //act
            Action actual = () => _repository.UpdateMovieComments(movieId, comment);
            var expEx = Record.Exception(actual);
            var verifyRecord = _repository.GetMovieById(movieId);
            //assert
            Assert.Null(expEx);
            Assert.Equal(comment, verifyRecord.Comments);
        }

        [Fact]
        public void DeleteMovie_GetMethodShouldThrowException()
        {
            //arrange
            var movieId = 10002;
            //act
            Action actual = () => _repository.DeleteMovie(movieId);
            var actualEx = Record.Exception(actual);
            Action verify = () => _repository.GetMovieById(movieId);
            var verifyEx = Record.Exception(verify);
            //assert
            Assert.Null(actualEx);
            Assert.NotNull(verifyEx);

        }
    }
}
