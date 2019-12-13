using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Insur17.Models
{
    public class Communication
    {
        public int Serial { get; set; }
        public int ClientSerial { get; set; }
        public  string    CommunicationType	{get; set;}
        public string     CommunicationValue	{get; set;}
        public string Comment	{get; set;}
        public int Priority { get; set; }
    }
}
