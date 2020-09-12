using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace LibraryAppData.Models
{
    public class LibraryBalanceView
    {
        public int Id { get; set; }
        public string OfficeName { get; set; }
        public string OfficeAddress { get; set; }
        public int AdminUserId { get; set; }
        public int? FreeBookCount { get; set; }
    }
}
