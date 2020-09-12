using AutoMapper;
using LibraryAppApi.Models;
using LibraryAppData.Models;

namespace LibraryAppApi.Profiles
{
    public class RoleProfile : Profile
    {
        public RoleProfile()
        {
            CreateMap<Role, RoleDto>();
        }
    }
}
