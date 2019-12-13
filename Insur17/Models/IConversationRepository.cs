using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Insur17.Models
{
  
    public interface IConversationRepository
    {
        List<Conversation> GetConversationListByClientSerial(int clientSerial, string str_query);
    }
}
