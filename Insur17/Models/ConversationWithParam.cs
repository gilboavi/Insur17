using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Insur17.Models
{
    public class ConversationWithParam
    {
        public int Serial { get; set; }
        public int ClientSerial { get; set; }
        public int MeetingSerial { get; set; }
        public DateTime Datee { get; set; }
        public int Get_call_name { get; set; }
        public int SendToUserBy { get; set; }
        public int DeliveredTo { get; set; }
        public string SummaryOfConversation { get; set; }
        public DateTime DayToCall { get; set; }
        public int GoalOfTalk { get; set; }
        public int Priority { get; set; }
        public bool Immediately { get; set; }
        public bool ToExecution { get; set; }
        public int SumSale { get; set; }
        public bool Meeting { get; set; }
        public bool Sale { get; set; }
        public bool Yozma { get; set; }
        public bool Done { get; set; }
        public bool Suspend { get; set; }
        public DateTime HourToCall { get; set; }
        public bool FormIsOpenn { get; set; }
        public int TypeOfCall { get; set; }
        public bool StatusGetCallName { get; set; }
        public int TypeFollowupConversation { get; set; }

        public string NoPolice { get; set; }
        public DateTime DataOfSending { get; set; }
        public int TypeTevia { get; set; }
        public string HourOfDatee { get; set; }

        public int id { get; set; }
        public int days { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SendToName { get; set; }
        public string TypeFollowupConversationName { get; set; }
        public string TypeTeviaName { get; set; }
        public string UserName { get; set; }
        public int UserSerial { get; set; }
        public string GoalOfTalkName { get; set; }

        public int SerialOfStatus_tevia { get; set; }
    }
}
