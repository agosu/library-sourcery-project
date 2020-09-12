using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryAppData.Migrations
{
    public partial class SeedingBooksTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "BookCover", "Category", "Description", "Format", "IsAvailable", "Isbn", "NumOfRatings", "NumOfReviews", "PubDate", "Publisher", "Rating", "Title" },
                values: new object[,]
                {
                    { 1, "https://imagery.pragprog.com/products/59/tpp.jpg?1339433898", "business", null, "Paperback", true, "020161622X", 14469, 796, 1999, "Addison-Wesley Professional", 4.31f, "The Pragmatic Programmer: From Journeyman to Master" },
                    { 18, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1372039943l/387190.jpg", "development", null, "Paperback", true, "0132350882", 14469, 796, 1999, "Addison-Wesley Professional", 4.31f, "Test Driven Development: By Example" },
                    { 17, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328830222l/44882.jpg", "development", null, "Paperback", true, "0735619670", 14469, 796, 1999, "Addison-Wesley Professional", 4.31f, "Code" },
                    { 16, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1287493789l/179133.jpg", "design", null, "Paperback", true, "0201633612", 14469, 796, 1999, "Addison-Wesley Professional", 4.31f, "Domain-Driven Design: Tackling Complexity in the Heart of Software" },
                    { 15, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1385191091l/52084.jpg", "design", null, "Paperback", true, "020161622X", 14469, 796, 1999, "Addison-Wesley Professional", 4.31f, "Programming Pearls" },
                    { 14, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1433511045l/105099.jpg", "design", null, "Paperback", true, "0201485672", 14469, 796, 1999, "Addison-Wesley Professional", 4.31f, "Effective Java Programming Language Guide" },
                    { 13, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348627451l/44919.jpg", "design", null, "Paperback", true, "0201835959", 14469, 796, 1999, "Addison-Wesley Professional", 4.31f, "Working Effectively with Legacy Code" },
                    { 12, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1387741681l/108986.jpg", "data science", null, "Paperback", true, "0201616222", 14469, 796, 1999, "Addison-Wesley Professional", 4.31f, "Introduction to Algorithms" },
                    { 11, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408309444l/58128.jpg", "data science", null, "Paperback", true, "0201616223", 14469, 796, 1999, "Addison-Wesley Professional", 4.31f, "Head First Design Patterns" },
                    { 10, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1391032531l/515601.jpg", "data science", null, "Paperback", true, "0201616224", 14469, 796, 1999, "Addison-Wesley Professional", 4.31f, "The C Programming Language" },
                    { 9, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328834793l/2998152.jpg", "computer science", null, "Paperback", true, "0201616225", 6043, 531, 1999, "Addison-Wesley Professional", 4.01f, "JavaScript: The Good Parts" },
                    { 8, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1391032527l/43713.jpg", "computer science", null, "Paperback", false, "0201616226", 9653, 536, 1999, "MIT Press", 4.11f, "Structure and Interpretation of Computer Programs (MIT Electrical Engineering and Computer Science)" },
                    { 7, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348430512l/13629.jpg", "computer science", null, "Paperback", true, "0201835959", 12349, 561, 1999, "Addison-Wesley Professional", 4.04f, "The Mythical Man-Month: Essays on Software Engineering'" },
                    { 6, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386925632l/44936.jpg", "computer science", null, "Hardcover", true, "0201485672", 6609, 258, 1999, "Addison-Wesley Professional", 4.24f, "Refactoring: Improving the Design of Existing Code" },
                    { 5, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347470803l/10284614.jpg", "computer science", null, "Paperback", false, "0201616227", 14469, 796, 1999, "Addison-Wesley Professional", 4.31f, "The Clean Coder: A Code of Conduct for Professional Programmers" },
                    { 4, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348027904l/85009.jpg", "computer science", null, "Hardcover", false, "0201633612", 14469, 796, 1999, "Addison-Wesley Professional", 4.31f, "Design Patterns: Elements of Reusable Object-Oriented Software" },
                    { 3, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1396837641l/4845.jpg", "business", null, "Paperback", false, "0735619670", 8075, 376, 2004, "Microsoft Press", 4.29f, "Code Complete" },
                    { 2, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1436202607l/3735293._SX318_.jpg", "business", null, "Paperback", true, "0132350882", 14469, 796, 2000, "Prentice Hall", 4.4f, "Clean Code: A Handbook of Agile Software Craftsmanship" },
                    { 19, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1440294142l/70156._SX318_.jpg", "productivity", null, "Paperback", true, "0201616228", 14469, 796, 1999, "Addison-Wesley Professional", 4.31f, "Patterns of Enterprise Application Architecture" },
                    { 20, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1349026758l/6713575.jpg", "productivity", null, "Paperback", true, "0201616229", 14469, 796, 1999, "Addison-Wesley Professional", 4.31f, "Coders at Work: Reflections on the Craft of Programming" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 20);
        }
    }
}
