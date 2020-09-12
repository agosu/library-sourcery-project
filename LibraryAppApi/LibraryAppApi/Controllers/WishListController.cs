using System;
using System.Globalization;
using System.Linq;
using LibraryAppApi.Models;
using LibraryAppData.Context;
using LibraryAppData.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAppApi.Controllers
{
    [ApiController]
    [Route("api/wishlist")]
    [Authorize]
    public class WishListController : Controller
    {
        private readonly LibraryContext _db;

        public WishListController(LibraryContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetAllWishes()
        {
            var userName = User.Identity.Name;
            var wishes = from w in _db.WishList
                join u in _db.Users on userName equals u.Email into wu
                from x in wu.DefaultIfEmpty()
                select new WishDto()
                {
                    Id = w.Id,
                    Title = w.Title,
                    Author = w.Author,
                    ImageUrl = w.ImageUrl,
                    Isbn = w.Isbn,
                    PubDate = w.PubDate,
                    Description = w.Description,
                    UserId = w.User.Id,
                    CreatedOn = w.CreatedOn.ToString(CultureInfo.InvariantCulture),
                    Rating = w.Rating,
                    IsLiked = _db.WishesLikes.First(s => s.UserId == x.Id && s.WishId == w.Id) != null
                };

            return Ok(wishes.ToList());
        }

        [HttpGet("{wishId}")]
        public IActionResult GetWishById(int wishId)
        {
            var userName = User.Identity.Name;
            var wish = from w in _db.WishList where w.Id == wishId
                join u in _db.Users on userName equals u.Email into wu
                from x in wu.DefaultIfEmpty()
                select new WishDto()
                {
                    Id = w.Id,
                    Title = w.Title,
                    Author = w.Author,
                    ImageUrl = w.ImageUrl,
                    Isbn = w.Isbn,
                    PubDate = w.PubDate,
                    Description = w.Description,
                    UserId = w.User.Id,
                    CreatedOn = w.CreatedOn.ToString(CultureInfo.InvariantCulture),
                    Rating = w.Rating,
                    IsLiked = _db.WishesLikes.First(s => s.UserId == x.Id && s.WishId == w.Id) != null
                };

            return Ok(wish);
        }

        [HttpPost]
        public IActionResult AddWish([FromBody] WishForCreationDto w)
        {
            var userName = User.Identity.Name;
            var user = _db.Users.FirstOrDefault(u => u.Email == userName);

            if (user == null)
            {
                return NotFound();
            }
            
            var imageUrl = "http://covers.openlibrary.org/b/isbn/" + w.Isbn + "-L.jpg";
            var wish = new Wish{ Title = w.Title, Author = w.Author, ImageUrl = imageUrl, Isbn = w.Isbn,
                PubDate = w.PublicationDate, Description = w.Description, User = user, CreatedOn = DateTime.Now, Rating = 0};

            _db.Add(wish);
            _db.SaveChanges();

            return Ok();
        }
        
        [HttpPut("edit/{wishId}")]
        public IActionResult EditWish(int wishId, [FromBody] WishForUpdateDto w)
        {
            var wish = _db.WishList.Find(wishId);
            var imageUrl = "http://covers.openlibrary.org/b/isbn/" + w.Isbn + "-L.jpg";
            
            if (wish == null)
            {
                return NotFound();
            }
            
            wish.Title = w.Title;
            wish.Author = w.Author;
            wish.ImageUrl = imageUrl;
            wish.Isbn = w.Isbn;
            wish.PubDate = w.PubDate;
            wish.Description = w.Description;
            _db.SaveChanges();

            return Ok();
        }
        
        [HttpPost("like/{wishId}")]
        public IActionResult AddLikeToWish(int wishId)
        {
            var userName = User.Identity.Name;
            var user = _db.Users.FirstOrDefault(u => u.Email == userName);
            var wish = _db.WishList.FirstOrDefault(w => w.Id == wishId);
            
            if (user == null || wish == null)
            {
                return NotFound();
            }

            var existingLike = _db.WishesLikes.FirstOrDefault(wl => wl.User.Id == user.Id && wl.Wish.Id == wish.Id);
            if (existingLike != null)
            {
                return BadRequest();
            }

            var like = new WishLike{ Wish = wish, User = user };
            _db.WishesLikes.Add(like);
            wish.Rating += 1;
            _db.SaveChanges();
            
            return Ok();
        }
        
        [HttpDelete("unlike/{wishId}")]
        public IActionResult RemoveLikeFromWish(int wishId)
        {
            var userName = User.Identity.Name;
            var like = _db.WishesLikes.FirstOrDefault(x => x.Wish.Id == wishId && x.User.Email == userName);

            if (like == null)
            {
                return NotFound();
            }
            
            _db.WishesLikes.Remove(like);
            _db.WishList.Find(wishId).Rating -= 1;
            _db.SaveChanges();

            return NoContent();
        }
    }
}