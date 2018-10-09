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

    }
}
