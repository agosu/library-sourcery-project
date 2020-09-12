using AutoMapper;
using LibraryAppApi.Models;
using LibraryAppData.Models;

namespace LibraryAppApi.Profiles
{
    public class BookProfile : Profile
    {
        public BookProfile()
        {
            CreateMap<Book, BookDto>()
                .ForMember(x => x.Author, o => o.MapFrom(src => src.Author.Split(seperator, System.StringSplitOptions.RemoveEmptyEntries)))
                .ForMember(x => x.Category, o => o.MapFrom(src=> src.Category.Text));
            CreateMap<BookForCreationDto, Book>();
            CreateMap<BookForUpdatingDto, Book>();
        }
        string[] seperator = { ", " };
    }
}
