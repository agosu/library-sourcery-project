using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace LibraryAppApi.Utilities
{
    public interface IImageUtility
    {
        public Task SaveImage(IFormFile file, string directory, string fileName);
        public FileStream GetImage(string directory);
    }
}
