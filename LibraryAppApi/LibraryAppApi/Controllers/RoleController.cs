using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using LibraryAppApi.Models;
using LibraryAppData.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAppApi.Controllers
{
    [ApiController]
    [Route("api/roles")]
    [Authorize]
    public class RoleController : Controller
    {
        private readonly LibraryContext _context;
        private readonly IMapper _mapper;
        public RoleController(LibraryContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetList()
        {
            var roles = _context.Roles.ToList();

            return Ok(_mapper.Map<List<RoleDto>>(roles));
        }
    }
}