using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Insur17.Dal
{
    public class my_connection
    {
        
        string sql_conversation_with_params = " SELECT  " + " " + " ClientSeria , NoPolice " + ", " +
            "  CONVERT( varchar, [Datee] , 103)	   , SummaryOfConversation,GoalOfTalkName  " + ", " +
            "UserName,TypeFollowupConversationName ,TypeFollowupConversationName  , Immediately " + " ," +
            " [Serial] " + " " +
            "FROM [InsurDB].[dbo].[ConversationWithParam] WHERE NoPolice=@client_serial ;";

        string sql_communication_list = "SELECT  " +
             "	[CommunicationType]  , [CommunicationValue] , [Comment] , Serial  " +
              " FROM [Communication] " + " " +
              "WHERE ClientSerial=@client_serial";

        public string MyStringConnection { get; }
        public string SqlConversationWithParamsList { get; }

        public string SqlCommunicationList { get; }

        public my_connection(IConfiguration connection)
        {

            MyStringConnection = connection["ConnectionStrings:DefaultConnection"];
            SqlConversationWithParamsList = sql_conversation_with_params;
            SqlCommunicationList = sql_communication_list;
        }
    }
}
