using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Insur17.Models
{
    public interface IClientRepository
    {
        List<Client> get_clients();
        Client get_client_by_serial(int serial);
        List<Client> GetClientsListByPartialClientName(string partialClientName);
        FullClient GetFullClientBySerial(int serial);
      
        FullClient GetFullClientByClientSerial(int clientSerial);
    }
}
