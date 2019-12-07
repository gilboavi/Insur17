using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Insur17.Models
{
    public class Client
    {
        public int Serial { get; set; }
        public int id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public int Agent { get; set; }
        public DateTime Birthday { get; set; }
        public string Sex { get; set; }
        public bool smok { get; set; }
        public int Operation { get; set; }
        public string Street { get; set; }
        public string StreetWork { get; set; }
        public string City { get; set; }
        public string CityWork { get; set; }
        public string Micud { get; set; }
        public string MicudWork { get; set; }
        public string Post_box { get; set; }
        public string Post_boxWork { get; set; }
        public string Email { get; set; }
        public string Phone_work { get; set; }
        public string Phone_home { get; set; }
        public string Selolry { get; set; }
        public string Fax { get; set; }
        public bool Potenion { get; set; }
        public int Family_status { get; set; }
        public int Work_status { get; set; }
        public int Place_work { get; set; }
        public bool falg { get; set; }
        public string Comment { get; set; }
        public int Status { get; set; }
        public DateTime stamp { get; set; }
        public DateTime CreateDate { get; set; }
        public string ClientPicture { get; set; }
        public bool ExsistId { get; set; }
        public bool ExsistMinu { get; set; }
        public string MeetingPlace { get; set; }
        public DateTime StopSmok { get; set; }
        public int ClientRating { get; set; }
        public int NoHealthFund { get; set; }

    }
}
