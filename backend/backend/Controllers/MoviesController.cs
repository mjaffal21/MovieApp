using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieInterface _movieRepo;
        public MoviesController(IMovieInterface movieRepo)
        {
            _movieRepo = movieRepo;
        }

        [HttpGet("popular-movies")]
        public async Task<IActionResult> GetPopularMovies()
        {
            var popularMovies = await _movieRepo.GetPopularMovies();
            return Ok(popularMovies);
        }
        [HttpGet("top-rated")]
        public async Task<IActionResult> GetTopRatedMovies()
        {
            var topRatedMovies = await _movieRepo.GetTopRatedMovies();
            return Ok(topRatedMovies); 
        }
        [HttpGet("upcoming-movies")]
        public async Task<IActionResult> GetUpcomingMovies()
        {
            var upcomingMovies = await _movieRepo.GetUpcomingMovies();
            return Ok(upcomingMovies);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetMovieDetails([FromRoute]int? id)
        {
            var movie = await _movieRepo.GetMovieDetails(id);
            return Ok(movie);
        }

        [HttpPost("add-to-offline")]
        [Authorize]
        public async Task<IActionResult> AddToOfflineList([FromBody] AddToOfflineListRequest request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            await _movieRepo.AddToOfflineList(userId, request.MovieId);
            return Ok("Movie added to offline list.");
        }

        [HttpGet("offline-list")]
        [Authorize]
        public async Task<IActionResult> GetOfflineList()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var offlineMovies = await _movieRepo.GetOfflineListByUserId(userId);
            return Ok(offlineMovies);
        }


        [HttpDelete("remove-from-offline")]
        [Authorize]
        public async Task<IActionResult> RemoveFromOfflineList([FromBody] RemoveFromOfflineList request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            await _movieRepo.RemoveFromOfflineList(userId, request.MovieId);
            return Ok(new { message = "Movie removed from offline list." });
        }
    }
}
