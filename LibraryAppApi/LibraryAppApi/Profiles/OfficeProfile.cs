using AutoMapper;
using LibraryAppApi.Models;
using LibraryAppData.Models;

namespace LibraryAppApi.Profiles
{
    public class OfficeProfile : Profile
    {
        public OfficeProfile()
        {
            CreateMap<Office, OfficeDto>();
        }
    }
}
