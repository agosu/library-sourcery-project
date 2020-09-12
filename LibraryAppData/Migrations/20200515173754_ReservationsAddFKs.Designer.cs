﻿// <auto-generated />
using System;
using LibraryAppData.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace LibraryAppData.Migrations
{
    [DbContext(typeof(LibraryContext))]
    [Migration("20200515173754_ReservationsAddFKs")]
    partial class ReservationsAddFKs
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("LibraryAppData.Models.Book", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Author")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BookCover")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(1000)")
                        .HasMaxLength(1000);

                    b.Property<string>("Format")
                        .IsRequired()
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<bool>("IsAvailable")
                        .HasColumnType("bit");

                    b.Property<string>("Isbn")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<int>("NumOfRatings")
                        .HasColumnType("int");

                    b.Property<int>("NumOfReviews")
                        .HasColumnType("int");

                    b.Property<int>("PubDate")
                        .HasColumnType("int");

                    b.Property<string>("Publisher")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<float>("Rating")
                        .HasColumnType("real");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("Books");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Author = "Andy Hunt, Dave Thomas",
                            BookCover = "https://imagery.pragprog.com/products/59/tpp.jpg?1339433898",
                            Category = "business",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "020161622X",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.31f,
                            Title = "The Pragmatic Programmer: From Journeyman to Master"
                        },
                        new
                        {
                            Id = 2,
                            Author = "Robert C. Martin",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1436202607l/3735293._SX318_.jpg",
                            Category = "business",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "0132350882",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 2000,
                            Publisher = "Prentice Hall",
                            Rating = 4.4f,
                            Title = "Clean Code: A Handbook of Agile Software Craftsmanship"
                        },
                        new
                        {
                            Id = 3,
                            Author = "Steve McConnell",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1396837641l/4845.jpg",
                            Category = "business",
                            Format = "Paperback",
                            IsAvailable = false,
                            Isbn = "0735619670",
                            NumOfRatings = 8075,
                            NumOfReviews = 376,
                            PubDate = 2004,
                            Publisher = "Microsoft Press",
                            Rating = 4.29f,
                            Title = "Code Complete"
                        },
                        new
                        {
                            Id = 4,
                            Author = "Erich Gamma, Ralph Johnson, John Vlissides, Richard Helm",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348027904l/85009.jpg",
                            Category = "computer science",
                            Format = "Hardcover",
                            IsAvailable = false,
                            Isbn = "0201633612",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.31f,
                            Title = "Design Patterns: Elements of Reusable Object-Oriented Software"
                        },
                        new
                        {
                            Id = 5,
                            Author = "Andy Hunt, Dave Thomas",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347470803l/10284614.jpg",
                            Category = "computer science",
                            Format = "Paperback",
                            IsAvailable = false,
                            Isbn = "020161622X",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.31f,
                            Title = "The Clean Coder: A Code of Conduct for Professional Programmers"
                        },
                        new
                        {
                            Id = 6,
                            Author = "Martin Fowler, Kent Beck, Don Roberts, Erich Gamma",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386925632l/44936.jpg",
                            Category = "computer science",
                            Format = "Hardcover",
                            IsAvailable = true,
                            Isbn = "0201485672",
                            NumOfRatings = 6609,
                            NumOfReviews = 258,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.24f,
                            Title = "Refactoring: Improving the Design of Existing Code"
                        },
                        new
                        {
                            Id = 7,
                            Author = "Frederick P. Brooks Jr.",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348430512l/13629.jpg",
                            Category = "computer science",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "0201835959",
                            NumOfRatings = 12349,
                            NumOfReviews = 561,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.04f,
                            Title = "The Mythical Man-Month: Essays on Software Engineering'"
                        },
                        new
                        {
                            Id = 8,
                            Author = "Harold Abelson, Gerald Jay Sussman, Julie Sussman",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1391032527l/43713.jpg",
                            Category = "computer science",
                            Format = "Paperback",
                            IsAvailable = false,
                            Isbn = "0201616222",
                            NumOfRatings = 9653,
                            NumOfReviews = 536,
                            PubDate = 1999,
                            Publisher = "MIT Press",
                            Rating = 4.11f,
                            Title = "Structure and Interpretation of Computer Programs (MIT Electrical Engineering and Computer Science)"
                        },
                        new
                        {
                            Id = 9,
                            Author = "Douglas Crockford",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328834793l/2998152.jpg",
                            Category = "computer science",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "0201616223",
                            NumOfRatings = 6043,
                            NumOfReviews = 531,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.01f,
                            Title = "JavaScript: The Good Parts"
                        },
                        new
                        {
                            Id = 10,
                            Author = "Andy Hunt, Dave Thomas",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1391032531l/515601.jpg",
                            Category = "data science",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "0201616224",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.31f,
                            Title = "The C Programming Language"
                        },
                        new
                        {
                            Id = 11,
                            Author = "Andy Hunt, Dave Thomas",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408309444l/58128.jpg",
                            Category = "data science",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "0201616225",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.31f,
                            Title = "Head First Design Patterns"
                        },
                        new
                        {
                            Id = 12,
                            Author = "Andy Hunt, Dave Thomas",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1387741681l/108986.jpg",
                            Category = "data science",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "0201616226",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.31f,
                            Title = "Introduction to Algorithms"
                        },
                        new
                        {
                            Id = 13,
                            Author = "Andy Hunt, Dave Thomas",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348627451l/44919.jpg",
                            Category = "design",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "0201616227",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.31f,
                            Title = "Working Effectively with Legacy Code"
                        },
                        new
                        {
                            Id = 14,
                            Author = "Andy Hunt, Dave Thomas",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1433511045l/105099.jpg",
                            Category = "design",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "0201616228",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.31f,
                            Title = "Effective Java Programming Language Guide"
                        },
                        new
                        {
                            Id = 15,
                            Author = "Andy Hunt, Dave Thomas",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1385191091l/52084.jpg",
                            Category = "design",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "0201616229",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.31f,
                            Title = "Programming Pearls"
                        },
                        new
                        {
                            Id = 16,
                            Author = "Andy Hunt, Dave Thomas",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1287493789l/179133.jpg",
                            Category = "design",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "0201616230",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.31f,
                            Title = "Domain-Driven Design: Tackling Complexity in the Heart of Software"
                        },
                        new
                        {
                            Id = 17,
                            Author = "Andy Hunt, Dave Thomas",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328830222l/44882.jpg",
                            Category = "development",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "0201616231",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.31f,
                            Title = "Code"
                        },
                        new
                        {
                            Id = 18,
                            Author = "Andy Hunt, Dave Thomas",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1372039943l/387190.jpg",
                            Category = "development",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "0201616232",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.31f,
                            Title = "Test Driven Development: By Example"
                        },
                        new
                        {
                            Id = 19,
                            Author = "Andy Hunt, Dave Thomas",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1440294142l/70156._SX318_.jpg",
                            Category = "productivity",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "0201616233",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.31f,
                            Title = "Patterns of Enterprise Application Architecture"
                        },
                        new
                        {
                            Id = 20,
                            Author = "Andy Hunt, Dave Thomas",
                            BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1349026758l/6713575.jpg",
                            Category = "productivity",
                            Format = "Paperback",
                            IsAvailable = true,
                            Isbn = "0201616234",
                            NumOfRatings = 14469,
                            NumOfReviews = 796,
                            PubDate = 1999,
                            Publisher = "Addison-Wesley Professional",
                            Rating = 4.31f,
                            Title = "Coders at Work: Reflections on the Craft of Programming"
                        });
                });

            modelBuilder.Entity("LibraryAppData.Models.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(1000)")
                        .HasMaxLength(1000);

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("LibraryAppData.Models.Library", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<long>("Count")
                        .HasColumnType("bigint");

                    b.Property<int>("CreatedById")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<int>("OfficeId")
                        .HasColumnType("int");

                    b.Property<int>("UpdatedById")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.HasIndex("CreatedById");

                    b.HasIndex("OfficeId");

                    b.HasIndex("UpdatedById");

                    b.ToTable("Libraries");
                });

            modelBuilder.Entity("LibraryAppData.Models.Office", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("Offices");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "A. Juozapavičiaus pr. 11D",
                            Name = "Kaunas"
                        },
                        new
                        {
                            Id = 2,
                            Address = "Žalgirio g. 135",
                            Name = "Vilnius"
                        });
                });

            modelBuilder.Entity("LibraryAppData.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("BookedFrom")
                        .HasColumnType("datetime2");

                    b.Property<int>("LibraryId")
                        .HasColumnType("int");

                    b.Property<DateTime>("PlannedReturnDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<DateTime>("ReturnDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LibraryId");

                    b.HasIndex("UserId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("LibraryAppData.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DefaultOffice")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhotoUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DefaultOffice = "Kaunas office",
                            Email = "tom@email.com",
                            FullName = "Tom Parkins",
                            PhoneNumber = "+37019999999",
                            PhotoUrl = "https://randomuser.me/api/portraits/men/62.jpg",
                            Role = "Front-end developer"
                        },
                        new
                        {
                            Id = 2,
                            DefaultOffice = "Vilnius office",
                            Email = "jim@email.com",
                            FullName = "Jim Cornel",
                            PhoneNumber = "+37092999999",
                            PhotoUrl = "https://randomuser.me/api/portraits/men/60.jpg",
                            Role = "Full-stack developer"
                        },
                        new
                        {
                            Id = 3,
                            DefaultOffice = "Kaunas office",
                            Email = "jess@email.com",
                            FullName = "Jessica Albins",
                            PhoneNumber = "+37099899999",
                            PhotoUrl = "https://randomuser.me/api/portraits/women/62.jpg",
                            Role = "Back-end developer"
                        });
                });

            modelBuilder.Entity("LibraryAppData.Models.Comment", b =>
                {
                    b.HasOne("LibraryAppData.Models.Book", "Book")
                        .WithMany()
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LibraryAppData.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("LibraryAppData.Models.Library", b =>
                {
                    b.HasOne("LibraryAppData.Models.Book", "Book")
                        .WithMany()
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LibraryAppData.Models.User", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LibraryAppData.Models.Office", "Office")
                        .WithMany()
                        .HasForeignKey("OfficeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LibraryAppData.Models.User", "UpdatedBy")
                        .WithMany()
                        .HasForeignKey("UpdatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("LibraryAppData.Models.Reservation", b =>
                {
                    b.HasOne("LibraryAppData.Models.Library", "Library")
                        .WithMany()
                        .HasForeignKey("LibraryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LibraryAppData.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
