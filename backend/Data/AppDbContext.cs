using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<WeatherForecast> WeatherForecasts => Set<WeatherForecast>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<WeatherForecast>().HasData(
            new WeatherForecast { Id = 1, Date = new DateTime(2024, 1, 1), TemperatureC = 20, Summary = "Mild" },
            new WeatherForecast { Id = 2, Date = new DateTime(2024, 1, 2), TemperatureC = 30, Summary = "Hot" },
            new WeatherForecast { Id = 3, Date = new DateTime(2024, 1, 3), TemperatureC = -5, Summary = "Freezing" },
            new WeatherForecast { Id = 4, Date = new DateTime(2024, 1, 4), TemperatureC = 15, Summary = "Cool" },
            new WeatherForecast { Id = 5, Date = new DateTime(2024, 1, 5), TemperatureC = 25, Summary = "Warm" }
        );
    }
}
