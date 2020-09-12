using AutoMapper;
using LibraryAppApi.Models;
using LibraryAppData.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryAppApi.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDashboardRepository _dashboardRepository;

        public DashboardController(IMapper mapper, IDashboardRepository dashboardRepository)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _dashboardRepository = dashboardRepository ?? throw new ArgumentNullException(nameof(dashboardRepository));
        }
        [HttpGet("{id}/enjoy")]
        public async Task<IActionResult> GetYouMightEnjoyAsync(int id)
        {
            var filteredBookEntities =await _dashboardRepository.YouMightEnjoyBooksAsync(id);
            return Ok(_mapper.Map<IEnumerable<BookDto>>(filteredBookEntities));
        }
        [HttpGet("new")]
        public async Task<IActionResult> GetNewBooksAsync()
        {
            var newBooks = await _dashboardRepository.NewBooksAsync();
            return Ok(_mapper.Map<IEnumerable<BookDto>>(newBooks));
        }
        [HttpGet("{id}/reading")]
        public async Task<IActionResult> GetCurrentlyReadingBooksAsync(int id)
        {
            var currentlyReadingEntities = await _dashboardRepository.CurrentlyReadingBooksAsync(id, false);
            return Ok(_mapper.Map<IEnumerable<BookDto>>(currentlyReadingEntities));
        }
    }
}
