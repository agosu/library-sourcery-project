using LibraryAppApi.Utilities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace LibraryAppApi.Controllers
{
    [Route("api/images")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IWebHostEnvironment _enviroment;
        private readonly IImageUtility _imageUtility;

        //Injecting IWebHostEnvironment to get the location where our environment is located so we can use it in FileStream first argument
        public ImageController(IWebHostEnvironment enviroment, IImageUtility imageUtility)
        {
            _enviroment = enviroment;
            _imageUtility = imageUtility;
        }
        [HttpPost]
        //IFormFile is an interface which accepts files, with it you can see name of file, how many bytes it has etc.
        public async Task<IActionResult> UploadBookCover(IFormFile file)
        { 
            //Gets us current path to our current environment we also postfix it with folder name where we hold our book covers
            var directory = _enviroment.ContentRootPath + "\\Images";
            var uniqueName =  Guid.NewGuid() + file.FileName;
            await _imageUtility.SaveImage(file, directory, uniqueName);
            //Since js cant reach response headers with doing aditional request I added end point pointing to the image that has been uploaded so we can use it to store it in db
            return CreatedAtRoute("GetImage", new { name = file.FileName }, "https://localhost:44310/api/images/" + uniqueName);
        }
        [HttpGet("{name}", Name = "GetImage")]
        public IActionResult GetBookCover(string name)
        {
            var directory = _enviroment.ContentRootPath + "\\Images" + "\\" + name; ;
            return File(_imageUtility.GetImage(directory), "image/jpeg");
        }
    }
}
