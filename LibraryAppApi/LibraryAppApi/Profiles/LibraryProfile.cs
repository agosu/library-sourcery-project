using AutoMapper;
using LibraryAppApi.Models;
using LibraryAppData.Models;

namespace LibraryAppApi.Profiles
{
    public class LibraryProfile : Profile
    {
        public LibraryProfile()
        {
            CreateMap<Library, LibraryDto>()
                .ForMember(
                    dest => dest.Book,
                    opt => opt.MapFrom(src => src.Book)
                )
                .ForMember(
                    dest => dest.Office,
                    opt => opt.MapFrom(src => src.Office)
                );

            CreateMap<LibraryForCreationDto, Library>();

            CreateMap<LibraryForUpdatingDto, Library>();
        }
    }
}
