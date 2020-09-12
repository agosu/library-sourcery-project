using AutoMapper;
using LibraryAppApi.Models;
using LibraryAppData.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
﻿using Microsoft.AspNetCore.Authorization;

namespace LibraryAppApi.Controllers
{
    [ApiController]
    [Route("api/menu")]
    [Authorize]
    public class CategoryController : Controller
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }
        [HttpGet("categories")]
        public async Task<IActionResult> GetMenuCategories()
        {
            var categoryEntities = await _categoryRepository.GetCategories();
            return Ok(_mapper.Map<IEnumerable<CategoriesDto>>(categoryEntities));
        }
    }
}
