using AutoMapper;
using LibraryAppApi.Models;
using LibraryAppData.Models;
using LibraryAppData.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAppApi.Controllers
{
    [Route("api/library")]
    [ApiController]
    [Authorize]
    public class LibraryController : ControllerBase
    {
        private readonly ILibraryRepository _libraryRepository;
        private readonly IMapper _mapper;
        private readonly IOfficeRepository _officeRepository;
        private readonly IBookRepository _bookRepository;

        public LibraryController(ILibraryRepository libraryRepository, IMapper mapper, IOfficeRepository officeRepository, IBookRepository bookRepository)
        {
            _libraryRepository = libraryRepository ?? throw new ArgumentNullException(nameof(libraryRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _officeRepository = officeRepository;
            _bookRepository = bookRepository;
        }

        [HttpGet(Name = "GetLibrary")]
        public async Task<IActionResult> GetLibrary(int bookId, int officeId)
        {
            Log.Debug("Get library method begins");
            try
            {
                var library = await _libraryRepository.GetLibrary(bookId, officeId);
                if (library == null)
                {
                    throw new KeyNotFoundException();
                }

                Log.Information($"Library found: ({nameof(library.Id)}={library.Id})");
                return Ok(_mapper.Map<LibraryDto>(library));
            }
            catch (KeyNotFoundException)
            {
                Log.Error($"The library not found: ({nameof(bookId)}={bookId}, {nameof(officeId)}={officeId})");
                return NotFound();
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"LibraryController.GetLibrary({nameof(bookId)}={bookId}, {nameof(officeId)}={officeId}). User={User.Identity?.Name}");
                return BadRequest();
            }

        }

        [HttpGet("{bookId}")]
        public async Task<IActionResult> GetList(int bookId)
        {
            try
            {
                var libraries = await _libraryRepository.GetLibrariesByBookId(bookId);
                if (libraries == null || libraries.Count == 0)
                {
                    throw new KeyNotFoundException();
                }


                return Ok(libraries.Select(library => _mapper.Map<LibraryDto>(library)).ToList());
            }
            catch (KeyNotFoundException)
            {
                Log.Error($"The libraries not found {nameof(bookId)}={bookId}");
                return NotFound();
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"LibraryController.GetList({nameof(bookId)}={bookId}). User={User.Identity?.Name}");
                return BadRequest();
            }
        }
        [HttpGet("info/{bookId}")]
        public async Task<IActionResult> GetLibraryInfo(int bookId = -1)
        {
            try
            {
                if(bookId == -1)
                {
                    var offices = await _officeRepository.GetOffices();
                    return Ok(_mapper.Map<IEnumerable<OfficeDto>>(offices));
                    
                }
                var libraries = await _libraryRepository.GetLibrariesByBookId(bookId);
                if (libraries == null || libraries.Count == 0)
                {
                    throw new KeyNotFoundException();
                }


                return Ok(libraries.Select(library => _mapper.Map<LibraryDto>(library)).ToList());
            }
            catch (KeyNotFoundException)
            {
                Log.Error($"The libraries not found {nameof(bookId)}={bookId}");
                return NotFound();
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"LibraryController.GetList({nameof(bookId)}={bookId}). User={User.Identity?.Name}");
                return BadRequest();
            }
        }
        [HttpGet("count/{libraryId}")]
        public async Task<IActionResult> GetBookCount(int libraryId)
        {
            return Ok(await _libraryRepository.GetBookCount(libraryId));
        }
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateLibrary([FromBody] LibraryForCreationDto libraryForCreation)
        {
            if (await _libraryRepository.LibraryExists(libraryForCreation.BookId, libraryForCreation.OfficeId))
            {
                var library = await _libraryRepository.GetLibrary(libraryForCreation.BookId, libraryForCreation.OfficeId);

                return CreatedAtRoute(
                    "GetLibrary",
                    new { bookId = library.BookId, officeId = library.OfficeId },
                    library);
            }

            var libraryEntity = _mapper.Map<Library>(libraryForCreation);
            _libraryRepository.AddLibrary(libraryEntity);
            await _libraryRepository.Save();

            return CreatedAtRoute(
                "GetLibrary", 
                new { bookId = libraryEntity.BookId, officeId = libraryEntity.OfficeId },
                libraryEntity);
        }

        [HttpPost("info")]
        public async Task<IActionResult> PostLibraryInfo([FromBody] AdminBookInfoDto newBook)
        {
            try
            {
                var newBookEntity = _mapper.Map<Book>(newBook.Book);
                _bookRepository.AddBook(newBookEntity);
                await _bookRepository.Save();
                foreach (var lib in newBook.Libraries)
                {
                    lib.BookId = newBookEntity.Id;
                }
                var newLibraryEntities = _mapper.Map<IEnumerable<Library>>(newBook.Libraries);
                
                foreach(var library in newLibraryEntities)
                {
                    if(library.BookCount != 0)
                    {
                        _libraryRepository.AddLibrary(library); 
                    }
                    
                }
                await _libraryRepository.Save();
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"LibraryController.PostLibrayInfo({nameof(newBook)}={newBook}). User={User.Identity?.Name}");
                return BadRequest();
            }
        }

        [HttpPut]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateLibrary([FromBody] LibraryForUpdatingDto library)
        {
            if (!await _libraryRepository.LibraryExists(library.BookId, library.OfficeId))
            {
                return NotFound();
            }

            var libraryToUpdate = await _libraryRepository.GetLibrary(library.BookId, library.OfficeId);
            _mapper.Map(library, libraryToUpdate);

            // libraryToUpdate.UpdatedById = UserId goes here someday
            libraryToUpdate.UpdatedOn = DateTime.Now;

            await _libraryRepository.Save();

            return NoContent();
        }

        [HttpDelete]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteLibrary(int bookId, int officeId)
        {
            try
            {
                if (!await _libraryRepository.LibraryExists(bookId, officeId))
                {
                    throw new KeyNotFoundException();
                }

                var libraryToDelete = await _libraryRepository.GetLibrary(bookId, officeId);

                _libraryRepository.DeleteLibrary(libraryToDelete);
                await _libraryRepository.Save();

                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                Log.Error($"The library for deletion not found {nameof(bookId)}={bookId}, {nameof(officeId)}={officeId}");
                return NotFound();
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"LibraryController.GetLibrary({nameof(bookId)}={bookId}, {nameof(officeId)}={officeId}). User={User.Identity?.Name}");
                return BadRequest();
            }
        }
    }
}
