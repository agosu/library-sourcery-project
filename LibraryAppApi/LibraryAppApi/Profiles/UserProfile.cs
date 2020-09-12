using AutoMapper;
using LibraryAppApi.Models;
using LibraryAppData.Models;

namespace LibraryAppApi.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(u => u.DefaultOffice, o => o.MapFrom(src => src.Office.Name))
                .ForMember(u => u.Role, o => o.MapFrom(src => src.Role.Name));

            CreateMap<UserForCreationDto, User>();
            CreateMap<UserForUpdatingDto, User>();
        }
    }
}
