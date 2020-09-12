using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace LibraryAppApi.Utilities
{
    public class ImageUtility : IImageUtility
    {
        public FileStream GetImage(string directory)
        {
            return File.OpenRead(directory);
        }

        public async Task SaveImage(IFormFile file, string directory, string fileName)
        {
            //We use FileStream to save file, first argument is path, second  file mode set to create (FileMode.Create) and lastly file access set to write (FileAccess.Write)
            await using (var fileStream = new FileStream(Path.Combine(directory, fileName), FileMode.Create, FileAccess.Write))
            {
               file.CopyTo(fileStream);
            }
        }
    }
}
