using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using LibraryAppApi.Models;
using LibraryAppData.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Serilog;

namespace LibraryAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReservationsController : Controller
    {
        private readonly LibraryContext _context;
        private readonly IMapper _mapper;
        IConfiguration _configuration;
        public ReservationsController(LibraryContext context, IMapper mapper, IConfiguration configuration)
        {
            this._context = context;
            this._mapper = mapper;
            this._configuration = configuration;
        }
        
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var reservation = _context.Reservations.FirstOrDefault(r => r.Id == id);
                if (reservation == null)
                    throw new KeyNotFoundException($"Reservation not found id: {id}");

                return Ok(_mapper.Map<ReservationDto>(reservation));
            }
            catch (KeyNotFoundException ex)
            {
                Log.Error(ex, $"The reservation not found: {nameof(id)}={id}");
                return NotFound();
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"ReservationsController.Get({nameof(id)}={id}). User={User.Identity?.Name}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpGet("bybook/{bookId}")]
        public IActionResult GetListByBook(int bookId)
        {
            try
            {
                var reservations = _context.Reservations
                    .Include(r => r.Library.Office)
                    .Include(r => r.User)
                    .Where(r => r.Library.BookId == bookId && r.ReturnDate == null);
                var l = reservations.ToList();
                
                return Ok(_mapper.Map<List<ReservationByBookDto>>(l));
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"ReservationsController.GetListByBook({nameof(bookId)}={bookId}). User={User.Identity?.Name}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpGet("byoffice/{officeId}")]
        public IActionResult GetListByOfficeId(int officeId)
        {
            try
            {
                var reservations = _context.Reservations
                    .Include(r => r.Library.Office)
                    .Include(r => r.Library.Book)
                    .Include(r => r.User)
                    .Where(r => r.Library.OfficeId == officeId);
                    
                
                var l = reservations.ToList();

                return Ok(_mapper.Map<List<ReservationByOfficeDto>>(l));
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"ReservationsController.GetListByOfficeId({nameof(officeId)}={officeId}). User={User.Identity?.Name}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpGet("my")]
        public IActionResult GetListByUser()
        {
            try
            {
                string userName = User.Identity.Name;
                var reservations = _context.Reservations
                    .Include(r => r.Library.Office)
                    .Include(r => r.Library.Book)
                    .Include(r => r.User)
                    .Where(r => r.User.Email == userName);

                var l = reservations.ToList();

                return Ok(_mapper.Map<List<ReservationByUserDto>>(l));
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"ReservationsController.GetListByUser. User={User.Identity?.Name}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpPost("checkout")]
        public IActionResult CheckOut(ReservationCheckoutDto reservationCheckoutDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var library = _context.Libraries.FirstOrDefault(l => l.Id == reservationCheckoutDto.LibraryId);
                if (library == null)
                    throw new KeyNotFoundException($"Library not found ({nameof(reservationCheckoutDto.LibraryId)} = {reservationCheckoutDto.LibraryId})");

                var user = _context.Users.FirstOrDefault(u => u.Email == User.Identity.Name);
                if (user == null)
                    throw new KeyNotFoundException($"User not found: {User.Identity.Name}");

                var reservedCount = _context.Reservations.Count(r => r.LibraryId == reservationCheckoutDto.LibraryId && r.ReturnDate == null);
                if (library.BookCount < reservedCount + 1)
                {
                    throw new OverflowException("All books are reserved");
                }


                int duration = _configuration.GetValue<int>("AppSettings:ReservationDurationInDays");
                DateTime plannedReturnDate = reservationCheckoutDto.PlannedReturnDate ?? DateTime.Now.Date.AddDays(duration);

                _context.Reservations.Add(new LibraryAppData.Models.Reservation
                {
                    BookedFrom = DateTime.Now.Date,
                    PlannedReturnDate = plannedReturnDate,
                    LibraryId = reservationCheckoutDto.LibraryId,
                    UserId = user.Id,
                }) ;


                var waitItem = _context.Waitlists.FirstOrDefault(w => w.LibraryId == reservationCheckoutDto.LibraryId && w.UserId == user.Id);
                if (waitItem != null)
                {
                    waitItem.IsActive = false;
                }

                _context.SaveChanges();
                return Ok();
            }
            catch (KeyNotFoundException)
            {
                Log.Error($"Library not found (${nameof(reservationCheckoutDto.LibraryId)} = {reservationCheckoutDto.LibraryId})");
                return StatusCode(StatusCodes.Status204NoContent);
            }
            catch (OverflowException oex)
            {
                Log.Error($"{oex.Message} (${nameof(reservationCheckoutDto.LibraryId)} = {reservationCheckoutDto.LibraryId})");
                return BadRequest(oex.Message);
            }

            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
         
        }

        [HttpPut("checkin/{id}")]
        public IActionResult CheckIn(int id, ReservationCheckinDto reservationCheckinDto )
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.Email == User.Identity.Name);
                if (user == null)
                    throw new KeyNotFoundException($"User not found: {User.Identity.Name}");

                int userId = user.Id;

                var reservation = _context.Reservations.FirstOrDefault(r => r.Id == id && r.UserId == userId);
                if (reservation == null)
                    throw new KeyNotFoundException($"Reservation not found: {nameof(id)} = {id}");
                if (reservation.ReturnDate.HasValue)
                    throw new KeyNotFoundException($"Reservation is closed already: {nameof(id)} = {id}");

                var book = _context.Libraries
                                .Include(l => l.Book)
                                .Where(l => l.Id == reservation.LibraryId)
                                .Select(l => l.Book)
                                .FirstOrDefault();

                if (book == null)
                    throw new KeyNotFoundException($"Book not found: {nameof(reservation.LibraryId)} = {reservation.LibraryId}");

                reservation.ReturnDate = System.DateTime.Now.Date;
                reservation.Rating = reservationCheckinDto.Rating;

                if (!string.IsNullOrEmpty(reservationCheckinDto.Comment))
                {
                    _context.Comments.Add(new LibraryAppData.Models.Comment
                    {
                        BookId = book.Id,
                        CreatedOn = System.DateTime.Now,
                        Text = reservationCheckinDto.Comment,
                        UserId = userId
                    });
                }

                if (reservationCheckinDto.Rating.HasValue && reservationCheckinDto.Rating > 0)
                {

                    var bookRating = _context.Reservations
                                    .Where(c => c.Library.BookId == book.Id && c.Rating > 0)
                                    .Select(c => c.Rating)
                                    .ToList();

                    bookRating.Add(reservationCheckinDto.Rating);

                    book.Rating = Convert.ToSingle(bookRating.Average());
                }
                _context.SaveChanges();
                return Ok();
            }
            catch (KeyNotFoundException kex)
            {
                Log.Error(kex.Message);
                return StatusCode(StatusCodes.Status204NoContent);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpPut("edit/{id}")]
        public IActionResult Edit(int id, ReservationEditDto reservationEditDto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.Email == User.Identity.Name);
                if (user == null)
                    throw new KeyNotFoundException($"User not found");
                int userId = user.Id;

                var reservation = _context.Reservations.FirstOrDefault(r => r.Id == id && r.UserId == userId);
                if (reservation == null)
                    throw new KeyNotFoundException("Reservation not found");
                if (reservation.ReturnDate.HasValue)
                    throw new KeyNotFoundException("Reservation is closed already");

                reservation.PlannedReturnDate = reservationEditDto.PlannedReturnDate;
                
                _context.SaveChanges();
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                Log.Error(ex.Message);
                return StatusCode(StatusCodes.Status204NoContent);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }


    }
}
