using backend.Data;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;


namespace backend.Repositories
{
    public class MovieInterface : IMovieInterface
    {
        private readonly HttpClient _httpClient;
        private const string TMDBApiUrl = "https://api.themoviedb.org/3";
        private readonly TMDBSettings _tmdbSettings;
        private readonly ApplicationDbContext _context;
        private readonly IMemoryCache _cache;
        private static readonly TimeSpan CacheDuration = TimeSpan.FromHours(2);
        public MovieInterface(HttpClient httpClient, IOptions<TMDBSettings> tmdbSettings, ApplicationDbContext context, IMemoryCache memoryCache)
        {
            _httpClient = httpClient;
            _tmdbSettings = tmdbSettings.Value;
            _context = context;
            _cache = memoryCache;
        }

        public async Task<string> GetMovieDetails(int? movie_id)
        {
            var cacheKey = $"MovieDetails_{movie_id}";
            if (_cache.TryGetValue(cacheKey, out string cachedMovieDetails))
            {
                return cachedMovieDetails;
            }
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"{TMDBApiUrl}/movie/{movie_id}?append_to_response=videos"),
                Headers =
                {
                    { "accept", "application/json" },
                    { "Authorization", $"Bearer {_tmdbSettings.api_key}" }
                },
            };


            using (var response = await _httpClient.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                _cache.Set(cacheKey, body, CacheDuration);
                return body;
            }
        }

        public async Task<string> GetPopularMovies()
        {
            var cacheKey = "PopularMovies";
            if (_cache.TryGetValue(cacheKey, out string cachedPopularMovies))
            {
                return cachedPopularMovies;
            }
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"{TMDBApiUrl}/movie/popular"),
                Headers =
            {
                { "accept", "application/json" },
                { "Authorization", $"Bearer {_tmdbSettings.api_key}" }
            }
            };

            using (var response = await _httpClient.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                _cache.Set(cacheKey, body, CacheDuration);
                return body;
            }
        }

        public async Task<string> GetTopRatedMovies()
        {
            var cacheKey = "TopRatedMovies";
            if (_cache.TryGetValue(cacheKey, out string cachedTopRatedMovies))
            {
                return cachedTopRatedMovies;
            }
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"{TMDBApiUrl}/movie/top_rated"),
                Headers =
            {
                { "accept", "application/json" },
                { "Authorization", $"Bearer {_tmdbSettings.api_key}" }
            }
            };

            using (var response = await _httpClient.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                _cache.Set(cacheKey, body, CacheDuration);
                return body;
            }
        }

        public async Task<string> GetUpcomingMovies()
        {
            var cacheKey = "UpcomingMovies";
            if (_cache.TryGetValue(cacheKey, out string cachedUpcomingMovies))
            {
                return cachedUpcomingMovies;
            }
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"{TMDBApiUrl}/movie/upcoming"),
                Headers =
            {
                { "accept", "application/json" },
                { "Authorization", $"Bearer {_tmdbSettings.api_key}" }
            }
            };

            using (var response = await _httpClient.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                _cache.Set(cacheKey, body, CacheDuration);
                return body;
            }
        }

        public async Task<OfflineList> AddToOfflineList(string userId, int movieId)
        {
            var movieDetails = await GetMovieDetails(movieId);
            var offlineList = new OfflineList
            {
                UserId = userId,
                MovieId = movieId
            };
            await _context.OfflineLists.AddAsync(offlineList);
            await _context.SaveChangesAsync();
            _cache.Remove($"OfflineList_{userId}");
            return offlineList;
        }
        public async Task<IEnumerable<OfflineList>> GetOfflineListByUserId(string userId)
        {
            var cacheKey = $"OfflineList_{userId}";
            if (_cache.TryGetValue(cacheKey, out IEnumerable<OfflineList> cachedOfflineList))
            {
                return cachedOfflineList;
            }
            var offlineList = await _context.OfflineLists
                .Where(offline => offline.UserId == userId)
                .ToListAsync();

            _cache.Set(cacheKey, offlineList, CacheDuration);

            return offlineList;
        }
        public async Task RemoveFromOfflineList(string userId, int movieId)
        {
            var item = await _context.OfflineLists
                .Where(ol => ol.UserId == userId && ol.MovieId == movieId)
                .FirstOrDefaultAsync();

            if (item != null)
            {
                _context.OfflineLists.Remove(item);
                await _context.SaveChangesAsync();
                _cache.Remove($"OfflineList_{userId}");
            }
        }
    }
}
