using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LibraryAppApi.Models;
using LibraryAppData.Models;
using LibraryAppData.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAppApi.Controllers
{
    [ApiController]
    [Route("api/users")]
    [Authorize]
    public class UserController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public UserController(IMapper mapper, IUserRepository userRepository)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var userEntities = await _userRepository.GetUsersAsync();
            return Ok(_mapper.Map<IEnumerable<UserDto>>(userEntities));
        }

        [HttpGet("{id}", Name = "GetUser")]

        public async Task<IActionResult> GetUser(int id)
        {
            if (!await _userRepository.UserExistsAsync(id))
            {
                return NotFound();
            }
            var userEntity = await _userRepository.GetUserAsync(id);

            return Ok(_mapper.Map<UserDto>(userEntity));
        }

        [HttpGet("token")]
        public async Task<IActionResult> GetUser()
        {
            if (!await _userRepository.UserExistsAsync(User.Identity.Name)) 
            {
                return NotFound();
            }
            var userEntity = await _userRepository.GetUserAsync(User.Identity.Name);

            return Ok(_mapper.Map<UserDto>(userEntity));
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserForCreationDto user)
        {
            if (await _userRepository.EmailExistsAsync(user.Email))
            {
                ModelState.AddModelError(
                    "Email",
                    "The provided email is already registered");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newUserEntity = _mapper.Map<User>(user);
            _userRepository.CreateUser(newUserEntity);
            await _userRepository.SaveAsync();
            return CreatedAtRoute(
                "GetUser",
                new { id = newUserEntity.Id },
                _mapper.Map<UserDto>(newUserEntity));

        }
        [HttpPost("token")]
        public async Task<IActionResult> CreateUser([FromBody] int officeId)
        {

            if (await _userRepository.EmailExistsAsync(User.Identity.Name))
            {
                ModelState.AddModelError(
                    "Email",
                    "The provided email is already registered");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userName = User.Claims.Where(c => c.Type == "name").Select(c => c.Value).FirstOrDefault();
            var user = new UserForCreationDto()
            {
                FullName = userName + " " + userName,
                Email = User.Identity.Name,
                OfficeId = officeId,
                RoleId = 1
            };
            var newUserEntity = _mapper.Map<User>(user);
            _userRepository.CreateUser(newUserEntity);
            await _userRepository.SaveAsync();
            var createdUser = await _userRepository.GetUserAsync(User.Identity.Name);
            return CreatedAtRoute(
                "GetUser",
                new { id = newUserEntity.Id },
                _mapper.Map<UserDto>(createdUser));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateUser(int id,[FromBody] UserForUpdatingDto updatedUser)
        {
            if(!await _userRepository.UserExistsAsync(id))
            {
                return NotFound();
            }
            if (await _userRepository.EmailExistsAsync(updatedUser.Email, id))
            {
                ModelState.AddModelError(
                    "Email",
                    "The provided email is already registered");
            }
            if (await _userRepository.PhoneNumberExistsAsync(updatedUser.PhoneNumber, id))
            {
                ModelState.AddModelError(
                    "PhoneNumber",
                    "The provided phone number is already registered");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var selectedUserToUpdate = await _userRepository.GetUserAsync(id);
            _mapper.Map(updatedUser, selectedUserToUpdate);
            await _userRepository.SaveAsync();
            return NoContent();

        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteUser(int id)
        {
            if (!await _userRepository.UserExistsAsync(id))
            {
                return NotFound();
            }
            _userRepository.DeleteUser(await _userRepository.GetUserAsync(id));
            await _userRepository.SaveAsync();
            return NoContent();
        }
    } 
}