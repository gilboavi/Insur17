using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Insur17.Dal
{
    public class my_connection
    {
        public string MyStringConnection { get; }

        public my_connection(IConfiguration connection)
        {

            MyStringConnection = connection["ConnectionStrings:DefaultConnection"];
        }
    }
}
