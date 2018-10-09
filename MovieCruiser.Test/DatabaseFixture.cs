using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using MovieCruiser.Service.DB;
using MovieCruiser.Service.Models;

namespace MovieCruiser.Test
{
    public class DatabaseFixture : IDisposable
    {
        IEnumerable<Movie> Movies { get; set; }
        public IMoviesDbContext dbContext { get; set; }

        public DatabaseFixture()
        {
            var options = new DbContextOptionsBuilder<MoviesDbContext>()
                .UseInMemoryDatabase(databaseName: "MoviesDB")
                .Options;
            dbContext = new MoviesDbContext(options);
            dbContext.Movies.Add(new Movie { Id = 10001, Name = "Avatar", Comments = string.Empty, PosterPath = "avatar.jpg", ReleaseDate = "12-10-2009", VoteCount = 12345, VoteAverage = 7.5 });
            dbContext.Movies.Add(new Movie { Id = 10002, Name = "Titanic", Comments = string.Empty, PosterPath = "titanic.jpg", ReleaseDate = "12-10-1997", VoteCount = 72345, VoteAverage = 7.8 });
            dbContext.Movies.Add(new Movie { Id = 10003, Name = "Jurassic Park", Comments = string.Empty, PosterPath = "jurassicpartk.jpg", ReleaseDate = "13-10-1993", VoteCount = 82345, VoteAverage = 7.9 });
            dbContext.SaveChanges();
        }

        public void Dispose()
        {
            Movies = null;
            dbContext = null;
        }
    }
}
