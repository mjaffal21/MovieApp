using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IMovieInterface
    {
        Task<string> GetPopularMovies();
        Task<string> GetTopRatedMovies();
        Task<string> GetUpcomingMovies();
        Task<string> GetMovieDetails(int? id);
        Task<OfflineList> AddToOfflineList(string userId, int movieId);
        Task<IEnumerable<OfflineList>> GetOfflineListByUserId(string userId);
        Task RemoveFromOfflineList(string userId, int movieId);
    }
}
