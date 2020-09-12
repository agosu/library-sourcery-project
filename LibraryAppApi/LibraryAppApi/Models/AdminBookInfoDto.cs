using LibraryAppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAppApi.Models
{
    public class AdminBookInfoDto
    {
        public BookForCreationDto Book { get; set; }
        public IEnumerable<LibraryForCreationDto> Libraries { get; set; } = new List<LibraryForCreationDto>();
    }
}
