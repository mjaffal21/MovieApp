using backend.Data;
using backend.Repositories;
using backend.Repositories.Interfaces;
using backend.utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactAppPolicy",
        policy =>
        {
            policy.WithOrigins("https://movie-frontend.azurewebsites.net", "http://localhost:3000") // Allow both local and Azure frontend
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
        });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(options =>
    {
        builder.Configuration.Bind("AzureAdB2C", options);
        options.TokenValidationParameters.NameClaimType = "name";
    }, options => { builder.Configuration.Bind("AzureAdB2C", options); });

builder.Services.AddMemoryCache();
builder.Services.AddHttpClient();
builder.Services.Configure<TMDBSettings>(builder.Configuration.GetSection("TMDB"));
builder.Services.AddTransient<IMovieInterface, MovieInterface>();



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(
    c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Title = "Movie Backend API",
            Version = "v1",
            Description = "An API for movie management"
        });

        // If you are using Azure AD B2C or JWT Bearer authentication, include this:
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Please insert JWT with Bearer into field",
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
    });



var app = builder.Build();


// Swagger middleware
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Movie Backend API");
    c.RoutePrefix = string.Empty;  // This makes Swagger UI available at the root URL
});


app.UseHttpsRedirection();
app.UseCors("ReactAppPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
