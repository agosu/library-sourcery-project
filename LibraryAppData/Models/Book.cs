using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAppData.Models
{
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Title { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        [MaxLength(20)]
        public string Format { get; set; }
        [Required]
        public int PubDate { get; set; }
        [MaxLength(255)]
        public string Publisher { get; set; }
        [MaxLength(50)]
        public string Isbn { get; set; }
        [MaxLength(1000)]
        public string Description { get; set; }
        [Required]
        [MaxLength(255)]
        public string BookCover { get; set; }
        [Required]
        [Range(0, 5)]
        public float Rating { get; set; }
        public int NumOfRatings { get; set; }
        public int NumOfReviews { get; set; }
        public bool IsAvailable { get; set; }
        public Category Category { get; set; }
        [ForeignKey("CategoryId")]
        [Required]
        public int CategoryId { get; set; }
        public int NumOfPages { get; set; }
    }
}
