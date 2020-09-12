export const filterTypes = [
    {
        index: 0,
        filterTypeName: "category",
        label: "Category",
        filters: [
            { label: "All books" },
            { label: "Business" },
            { label: "Computer Science" },
            { label: "Data Science" },
            { label: "Design" },
            { label: "Development" },
            { label: "Productivity" },
        ],
    },
    {
        index: 1,
        filterTypeName: "status",
        label: "Status",
        filters: [
            { label: "Available" },
            { label: "Unavailable" },
        ],
    },
    {
        index: 2,
        filterTypeName: "office",
        label: "Office",
        filters: [
            { label: "Vilnius" },
            { label: "Kaunas" },
        ],
    },
    {
        index: 3,
        filterTypeName: "author",
        label: "Author",
        filters: [
        //    Fetch list of authors from books
        ],
    },
];
