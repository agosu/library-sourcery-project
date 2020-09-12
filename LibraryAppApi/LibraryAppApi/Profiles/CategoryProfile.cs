using AutoMapper;
using LibraryAppApi.Models;
using LibraryAppData.Models;

namespace LibraryAppApi.Profiles
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<Category, CategoriesDto>();
        }
    }
}
