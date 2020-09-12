using AutoMapper;
using LibraryAppApi.Models;
using LibraryAppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAppApi.Profiles
{
    public class ReservationProfile : Profile
    {
        public ReservationProfile()
        {
            CreateMap<Reservation, ReservationDto>();
            
            CreateMap<Reservation, ReservationByBookDto>()
                .ForMember(
                    dest=> dest.OfficeName,
                    opt => opt.MapFrom(src => src.Library.Office.Name)
                )
                .ForMember(
                    dest => dest.UserName,
                    opt => opt.MapFrom(src => src.User.FullName)
                )
                .ForMember(
                    dest => dest.BookId,
                    opt => opt.MapFrom(src => src.Library.BookId)
                );

            CreateMap<Reservation, ReservationByOfficeDto>()
               .ForMember(
                   dest => dest.OfficeName,
                   opt => opt.MapFrom(src => src.Library.Office.Name)
               )
               .ForMember(
                   dest => dest.UserName,
                   opt => opt.MapFrom(src => src.User.FullName)
               )
               .ForMember(
                   dest => dest.BookId,
                   opt => opt.MapFrom(src => src.Library.BookId)
               )
                .ForMember(
                   dest => dest.Title,
                   opt => opt.MapFrom(src => src.Library.Book.Title)
               )
               .ForMember(
                   dest => dest.Author,
                   opt => opt.MapFrom(src => src.Library.Book.Author)
               )
               .ForMember(
                   dest => dest.BookCover,
                   opt => opt.MapFrom(src => src.Library.Book.BookCover)
               )
               .ForMember(
                   dest => dest.Rating,
                   opt => opt.MapFrom(src => src.Library.Book.Rating)
               )
               .ForMember(
                   dest => dest.Status,
                   opt => opt.MapFrom(src => src.ReturnDate == null ? "Borrowed" : "Completed")
               );

            CreateMap<Reservation, ReservationByUserDto>()
             .ForMember(
                 dest => dest.OfficeName,
                 opt => opt.MapFrom(src => src.Library.Office.Name)
             )
             .ForMember(
                 dest => dest.BookId,
                 opt => opt.MapFrom(src => src.Library.BookId)
             )
              .ForMember(
                 dest => dest.Title,
                 opt => opt.MapFrom(src => src.Library.Book.Title)
             )
             .ForMember(
                 dest => dest.Author,
                 opt => opt.MapFrom(src => src.Library.Book.Author)
             )
             .ForMember(
                 dest => dest.BookCover,
                 opt => opt.MapFrom(src => src.Library.Book.BookCover)
             )
             .ForMember(
                 dest => dest.Rating,
                 opt => opt.MapFrom(src => src.Library.Book.Rating)
             )
             .ForMember(
                 dest => dest.Status,
                 opt => opt.MapFrom(src => src.ReturnDate == null ? "Borrowed" : "Completed")
             );


        }
    }
}
