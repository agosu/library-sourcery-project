using System;
using System.Linq;
using LibraryAppApi.Models;
using LibraryAppData.Context;
using LibraryAppData.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAppApi.Controllers
{
    [ApiController]
    [Route("api/waitlist")]
    [Authorize]
    public class WaitlistController : Controller
    {
        private readonly LibraryContext _dbContext;

        public WaitlistController(LibraryContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("book/{bookId}")]
        public IActionResult GetWaitlistByBookId(int bookId)
        {
            var waitlist = from b in _dbContext.Books.Where(b => b.Id == bookId)
                           join w in _dbContext.Waitlists on b equals w.Library.Book
                           join u in _dbContext.Users on w.User equals u
                           join o in _dbContext.Offices on w.Library.Office equals o
                           select new WaitlistDto()
                           {
                               Id = w.Id,
                               EmployeeName = u.FullName,
                               OfficeName = o.Name, //don't know if this is needed
                               RequestedOn = w.RequestedOn,
                           };
            return Ok(waitlist.ToList());
        }
        [HttpPost]
        public IActionResult JoinWaitlist([FromBody] WaitlistForCreationDto w)
        {

            var library = _dbContext.Libraries.FirstOrDefault(l => l.Id == w.LibraryId);
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == w.UserId); //change later to get from token (?)

            if(library == null || user == null)
            {
                return NotFound();
            }

            var waitlist = new Waitlist{ Library = library, User = user, RequestedOn = DateTime.Now, IsActive = true };
            _dbContext.Add(waitlist);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}
