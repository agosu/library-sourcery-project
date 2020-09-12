using LibraryAppData.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryAppData.Context
{
    public class LibraryContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Office> Offices { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Library> Libraries { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<CommentLike> CommentsLikes { get; set; }
        public DbSet<Wish> WishList { get; set; }
        public DbSet<WishLike> WishesLikes { get; set; }
        public DbSet<Waitlist> Waitlists { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<LibraryBalanceView> LibraryBalanceView { get; set; }
        public LibraryContext() {}

        public LibraryContext(DbContextOptions<LibraryContext> options)
            :base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User()
                {
                    Id = 1,
                    FullName = "Tom Parkins",
                    //Role = "Front-end developer",
                    OfficeId = 1,
                    Email = "tom@email.com",
                    PhoneNumber = "+37019999999",
                    PhotoUrl = "https://randomuser.me/api/portraits/men/62.jpg"
                },
                new User()
                {
                    Id = 2,
                    FullName = "Jim Cornel",
                    //Role = "Full-stack developer",
                    OfficeId = 1,
                    Email = "jim@email.com",
                    PhoneNumber = "+37092999999",
                    PhotoUrl = "https://randomuser.me/api/portraits/men/60.jpg"
                },
                new User()
                {
                    Id = 3,
                    FullName = "Jessica Albins",
                    //Role = "Back-end developer",
                    OfficeId = 2,
                    Email = "jess@email.com",
                    PhoneNumber = "+37099899999",
                    PhotoUrl = "https://randomuser.me/api/portraits/women/62.jpg"
                }
                );
            modelBuilder.Entity<Book>().HasData(
                 new Book()
                 {
                     Id = 1,
                     Isbn = "020161622X",
                     Title = "The Pragmatic Programmer: From Journeyman to Master",
                     Author =  "Andy Hunt, Dave Thomas",
                     Format = "Paperback",
                     PubDate = 1999,
                     Publisher = "Addison-Wesley Professional",
                     BookCover = "https://imagery.pragprog.com/products/59/tpp.jpg?1339433898",
                     Rating = 4.31f,
                     NumOfRatings = 14469,
                     NumOfReviews = 796,
                     IsAvailable = true,
                     CategoryId = 2,
                 },
                new Book()
                {
                    Id = 2,
                    Isbn = "0132350882",
                    Title = "Clean Code: A Handbook of Agile Software Craftsmanship",
                    Author = "Robert C. Martin",
                    Format = "Paperback",
                    PubDate = 2000,
                    Publisher = "Prentice Hall",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1436202607l/3735293._SX318_.jpg",
                    Rating = 4.4f,
                    NumOfRatings = 14469,
                    NumOfReviews = 796,
                    IsAvailable = true,
                    CategoryId = 2,
                },
                new Book()
                {
                    Id = 3,
                    Isbn = "0735619670",
                    Title = "Code Complete",
                    Author = "Steve McConnell",
                    Format = "Paperback",
                    PubDate = 2004,
                    Publisher = "Microsoft Press",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1396837641l/4845.jpg",
                    Rating = 4.29f,
                    NumOfRatings = 8075,
                    NumOfReviews = 376,
                    IsAvailable = false,
                    CategoryId = 2,
                },
                new Book()
                {
                    Id = 4,
                    Isbn = "0201633612",
                    Title = "Design Patterns: Elements of Reusable Object-Oriented Software",
                    Author = "Erich Gamma, Ralph Johnson, John Vlissides, Richard Helm",
                    Format = "Hardcover",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348027904l/85009.jpg",
                    Rating = 4.31f,
                    NumOfRatings = 14469,
                    NumOfReviews = 796,
                    IsAvailable = false,
                    CategoryId = 3,
                },
                new Book()
                {
                    Id = 5,
                    Isbn = "020161622X",
                    Title = "The Clean Coder: A Code of Conduct for Professional Programmers",
                    Author = "Andy Hunt, Dave Thomas",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347470803l/10284614.jpg",
                    Rating = 4.31f,
                    NumOfRatings = 14469,
                    NumOfReviews = 796,
                    IsAvailable = false,
                    CategoryId = 3,
                },
                new Book()
                {
                    Id = 6,
                    Isbn = "0201485672",
                    Title = "Refactoring: Improving the Design of Existing Code",
                    Author = "Martin Fowler, Kent Beck, Don Roberts, Erich Gamma",
                    Format = "Hardcover",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386925632l/44936.jpg",
                    Rating = 4.24f,
                    NumOfRatings = 6609,
                    NumOfReviews = 258,
                    IsAvailable = true,
                    CategoryId = 3,
                },
                new Book()
                {
                    Id = 7,
                    Isbn = "0201835959",
                    Title = "The Mythical Man-Month: Essays on Software Engineering'",
                    Author = "Frederick P. Brooks Jr.",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348430512l/13629.jpg",
                    Rating = 4.04f,
                    NumOfRatings = 12349,
                    NumOfReviews = 561,
                    IsAvailable = true,
                    CategoryId = 3,
                },
                new Book()
                {
                    Id = 8,
                    Isbn = "0201616222",
                    Title = "Structure and Interpretation of Computer Programs (MIT Electrical Engineering and Computer Science)",
                    Author = "Harold Abelson, Gerald Jay Sussman, Julie Sussman",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "MIT Press",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1391032527l/43713.jpg",
                    Rating = 4.11f,
                    NumOfRatings = 9653,
                    NumOfReviews = 536,
                    IsAvailable = false,
                    CategoryId = 3,
                },
                new Book()
                {
                    Id = 9,
                    Isbn = "0201616223",
                    Title = "JavaScript: The Good Parts",
                    Author = "Douglas Crockford",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328834793l/2998152.jpg",
                    Rating = 4.01f,
                    NumOfRatings = 6043,
                    NumOfReviews = 531,
                    IsAvailable = true,
                    CategoryId = 3,
                },
                new Book()
                {
                    Id = 10,
                    Isbn = "0201616224",
                    Title = "The C Programming Language",
                    Author = "Andy Hunt, Dave Thomas",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1391032531l/515601.jpg",
                    Rating = 4.31f,
                    NumOfRatings = 14469,
                    NumOfReviews = 796,
                    IsAvailable = true,
                    CategoryId = 4,
                },
                new Book()
                {
                    Id = 11,
                    Isbn = "0201616225",
                    Title = "Head First Design Patterns",
                    Author = "Andy Hunt, Dave Thomas",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408309444l/58128.jpg",
                    Rating = 4.31f,
                    NumOfRatings = 14469,
                    NumOfReviews = 796,
                    IsAvailable = true,
                    CategoryId = 4,
                },
                new Book()
                {
                    Id = 12,
                    Isbn = "0201616226",
                    Title = "Introduction to Algorithms",
                    Author = "Andy Hunt, Dave Thomas",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1387741681l/108986.jpg",
                    Rating = 4.31f,
                    NumOfRatings = 14469,
                    NumOfReviews = 796,
                    IsAvailable = true,
                    CategoryId = 4,
                },
                new Book()
                {
                    Id = 13,
                    Isbn = "0201616227",
                    Title = "Working Effectively with Legacy Code",
                    Author = "Andy Hunt, Dave Thomas",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348627451l/44919.jpg",
                    Rating = 4.31f,
                    NumOfRatings = 14469,
                    NumOfReviews = 796,
                    IsAvailable = true,
                    CategoryId = 5,
                },
                new Book()
                {
                    Id = 14,
                    Isbn = "0201616228",
                    Title = "Effective Java Programming Language Guide",
                    Author = "Andy Hunt, Dave Thomas",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1433511045l/105099.jpg",
                    Rating = 4.31f,
                    NumOfRatings = 14469,
                    NumOfReviews = 796,
                    IsAvailable = true,
                    CategoryId = 5,
                },
                new Book()
                {
                    Id = 15,
                    Isbn = "0201616229",
                    Title = "Programming Pearls",
                    Author = "Andy Hunt, Dave Thomas",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1385191091l/52084.jpg",
                    Rating = 4.31f,
                    NumOfRatings = 14469,
                    NumOfReviews = 796,
                    IsAvailable = true,
                    CategoryId = 5,
                },
                new Book()
                {
                    Id = 16,
                    Isbn = "0201616230",
                    Title = "Domain-Driven Design: Tackling Complexity in the Heart of Software",
                    Author = "Andy Hunt, Dave Thomas",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1287493789l/179133.jpg",
                    Rating = 4.31f,
                    NumOfRatings = 14469,
                    NumOfReviews = 796,
                    IsAvailable = true,
                    CategoryId = 5,
                },
                new Book()
                {
                    Id = 17,
                    Isbn = "0201616231",
                    Title = "Code",
                    Author = "Andy Hunt, Dave Thomas",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328830222l/44882.jpg",
                    Rating = 4.31f,
                    NumOfRatings = 14469,
                    NumOfReviews = 796,
                    IsAvailable = true,
                    CategoryId = 6,
                },
                new Book()
                {
                    Id = 18,
                    Isbn = "0201616232",
                    Title = "Test Driven Development: By Example",
                    Author = "Andy Hunt, Dave Thomas",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1372039943l/387190.jpg",
                    Rating = 4.31f,
                    NumOfRatings = 14469,
                    NumOfReviews = 796,
                    IsAvailable = true,
                    CategoryId = 6,
                },
                new Book()
                {
                    Id = 19,
                    Isbn = "0201616233",
                    Title = "Patterns of Enterprise Application Architecture",
                    Author = "Andy Hunt, Dave Thomas",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1440294142l/70156._SX318_.jpg",
                    Rating = 4.31f,
                    NumOfRatings = 14469,
                    NumOfReviews = 796,
                    IsAvailable = true,
                    CategoryId = 7,
                },
                new Book()
                {
                    Id = 20,
                    Isbn = "0201616234",
                    Title = "Coders at Work: Reflections on the Craft of Programming",
                    Author = "Andy Hunt, Dave Thomas",
                    Format = "Paperback",
                    PubDate = 1999,
                    Publisher = "Addison-Wesley Professional",
                    BookCover = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1349026758l/6713575.jpg",
                    Rating = 4.31f,
                    NumOfRatings = 14469,
                    NumOfReviews = 796,
                    IsAvailable = true,
                    CategoryId = 7,
                }
                );
            modelBuilder.Entity<Office>().HasData(
                new Office()
                {
                    Id = 2,
                    Name = "Kaunas",
                    Address = "A. Juozapavičiaus pr. 11D"
                },
                new Office()
                {
                    Id = 1,
                    Name = "Vilnius",
                    Address = "Žalgirio g. 135"
                }
                );
            modelBuilder.Entity<Category>().HasData(
                new Category()
                {
                    Id = 1,
                    Text = "All Books",
                    Redirect_path = "/library/all"
                },
                new Category()
                {
                    Id = 2,
                    Text = "Business",
                    Redirect_path = "/library/business"
                },
                new Category()
                {
                    Id = 3,
                    Text = "Computer Science",
                    Redirect_path = "/library/computer-science"
                },
                new Category()
                {
                    Id = 4,
                    Text = "Data Science",
                    Redirect_path = "/library/data-science"
                },
                new Category()
                {
                    Id = 5,
                    Text = "Design",
                    Redirect_path = "/library/design"
                },
                new Category()
                {
                    Id = 6,
                    Text = "Development",
                    Redirect_path = "/library/development"
                },
                new Category()
                {
                    Id = 7,
                    Text = "Productivity",
                    Redirect_path = "/library/productivity"
                }
                );
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "User", Description = "Default role"},
                new Role { Id = 2, Name = "Admin", Description = "Administrator role" }
                );
           base.OnModelCreating(modelBuilder);
        }

    }
}
