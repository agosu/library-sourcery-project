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
    [Route("api/comments")]
    [Authorize]
    public class CommentsController : Controller
    {
        private LibraryContext db;

        public CommentsController(LibraryContext context)
        {
            db = context;
        }

        [HttpGet("book/{bookId}")]
        public IActionResult GetCommentsByBookId(int bookId)
        {
            var comments = from b in db.Books.Where(b => b.Id == bookId)
                           join c in db.Comments on b equals c.Book
                           join u in db.Users on c.User equals u into cc
                           from x in cc.DefaultIfEmpty()
                           select new CommentDto()
                           {
                               Id = c.Id,
                               Author = x.FullName,
                               Text = c.Text,
                               Image = x.PhotoUrl,
                               CreatedOn = CustomFormat(c.CreatedOn),
                               Rating = c.Rating,
                               IsLiked = db.CommentsLikes.First(s => s.UserId == x.Id && s.CommentId == c.Id) != null
                           };
            return Ok(comments.ToList());
        }

        [HttpPost]
        public IActionResult AddComment([FromBody] CommentForCreationDto c)
        {
            var userName = User.Identity.Name;
            var user = db.Users.FirstOrDefault(u => u.Email == userName);
            var book = db.Books.FirstOrDefault(b => b.Id == c.BookId);
            
            if (book == null || user == null)
            {
                return NotFound();
            }

            var comment = new Comment{ Book = book, User = user, Text = c.Text, CreatedOn = DateTime.Now, Rating = 0 };
            db.Add(comment);
            db.SaveChanges();
            
            return Ok();
        }

        [HttpPost("like/{commentId}")]
        public IActionResult AddLikeToComment(int commentId)
        {
            var userName = User.Identity.Name;
            var user = db.Users.FirstOrDefault(u => u.Email == userName);
            var comment = db.Comments.FirstOrDefault(c => c.Id == commentId);
            
            if (user == null || comment == null)
            {
                return NotFound();
            }
            
            var existingLike = db.CommentsLikes.FirstOrDefault(cl => cl.User.Id == user.Id && cl.Comment.Id == comment.Id);
            if (existingLike != null)
            {
                return BadRequest();
            }

            var like = new CommentLike{ Comment = comment, User = user };
            db.CommentsLikes.Add(like);
            comment.Rating += 1;
            db.SaveChanges();
            
            return Ok();
        }
        
        [HttpDelete("unlike/{commentId}")]
        public IActionResult RemoveLikeFromComment(int commentId)
        {
            var userName = User.Identity.Name;
            var like = db.CommentsLikes.SingleOrDefault(x => x.Comment.Id == commentId && x.User.Email == userName);

            if (like == null)
            {
                return NotFound();
            }

            db.CommentsLikes.Remove(like);
            db.Comments.Find(commentId).Rating -= 1;
            db.SaveChanges();
            
            return NoContent();
        }

        [HttpDelete("{commentId}")]
        public IActionResult DeleteComment(int commentId)
        {
            var comment = db.Comments.Find(commentId);

            if (comment == null)
            {
                return NotFound();
            }
            
            db.Comments.Remove(comment);
            db.SaveChanges();

            return NoContent();
        }

        [HttpPut("edit/{commentId}")]
        public IActionResult EditComment(int commentId, [FromBody] string text)
        {
            var comment = db.Comments.Find(commentId);

            if (comment == null)
            {
                return NotFound();
            }
            
            comment.Text = text;
            db.SaveChanges();

            return Ok();
        }

        private static string CustomFormat(DateTime dateTime)
        {
            return dateTime.ToString("MMMM dd, yyyy hh:mm tt", CultureInfo.InvariantCulture);
        }
    }
}