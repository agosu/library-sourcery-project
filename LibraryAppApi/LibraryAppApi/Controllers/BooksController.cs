using AutoMapper;
using LibraryAppApi.Models;
using LibraryAppData.Models;
using LibraryAppData.Repositories;
using LibraryAppData.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryAppApi.Controllers
{
    [Route("api/books")]
    [ApiController]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public BooksController(IBookRepository bookRepository, IMapper mapper)
        {
            _bookRepository = bookRepository ?? throw new ArgumentNullException(nameof(bookRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public async Task<IActionResult> GetBooksAsync([FromQuery] BookFilters filters)
        {
            var bookEntities = await _bookRepository.GetBooks(filters);
            return Ok(_mapper.Map<IEnumerable<BookDto>>(bookEntities));
        }
        
        [HttpGet("{id}", Name = "GetBook")]
        public async Task<IActionResult> GetBookAsync(int id)
        {
            if (!await _bookRepository.BookExists(id))
            {
                return NotFound();
            }
            var selectedBookEntity = await _bookRepository.GetBook(id);
            return Ok(_mapper.Map<BookDto>(selectedBookEntity));
        }
        
        //TODO: BELOW ACTIONS ARE AVAILABLE ONLY FOR ADMINS -- IMPLEMENT LATER!
        [HttpPost]
        public async Task<IActionResult> CreateBookAsync([FromBody] BookForCreationDto book)
        {
            var bookEntity = _mapper.Map<Book>(book);
            _bookRepository.AddBook(bookEntity);
            await _bookRepository.Save();
            return CreatedAtRoute(
              "GetBook",
              new { id = bookEntity.Id },
              bookEntity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBookAsync(int id, [FromBody] BookForUpdatingDto book)
        {
            if (!await _bookRepository.BookExists(id))
            {
                return NotFound();
            }
            var selectedBookEntity = await _bookRepository.GetBook(id);
            _mapper.Map(book, selectedBookEntity);
            await _bookRepository.Save();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookAsync(int id)
        {
            if (!await _bookRepository.BookExists(id))
            {
                return NotFound();
            }
            _bookRepository.DeleteBook(await _bookRepository.GetBook(id));
            await _bookRepository.Save();
            return NoContent();
        }
    }
}