using Microsoft.EntityFrameworkCore;
using MovieCruiser.AuthService.Models;

namespace MovieCruiser.AuthService.DB
{
    public class UserDbContext : DbContext, IUserDbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }
    }
}
