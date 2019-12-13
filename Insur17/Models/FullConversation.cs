using System.Collections.Generic;

namespace Insur17.Models
{
    public class FullConversation
    {
        public List<ConversationWithParam> ConversationWithParamList { get; set; }

        public int UserRole;
        public Conversation CurrentConversation { get; set; }
        public int CurrentClientSerial { get; set; }
        public List<Conversation> ConversationsSendToUser { get; set; }
        public int CurrentUserSerial { get; set; }
        public int CurrentUserRole { get; set; }

        public List<ConversationsListWithNames> ConversationList { get; set; }

        public List<FollowUpConversation> FollowUpConversationList { get; set; }

        public List<ConversationWithParam> ConversationWithParamsList { get; set; }
        public List<FollowUpConversationWithParam> FollowUpConversationWithParamsList { get; set; }
        public List<FollowUpConversationWithParamsAndClientSerial> FollowUpConversationWithParamsAndClientSerialList { get; set; }
        public List<User> UsersList { get; set; }
        public List<ParamGoalOfTalk> GoalOfTalkList { get; set; }
        public List<ParamTeviaDetail> TeviaDetailList { get; set; }
        public List<ParamTeviaType> TeviaTypeList { get; set; }

        public string ClientFullName { get; set; }
        public int ClientSerial { get; set; }
        public int ConversationSerial { get; set; }
        public int MyHour { get; set; }
        public int MyMinute { get; set; }

        public string ReminderStr { get; set; }



        public int MeetingSerial { get; set; }
        public string SendByName { get; set; }

        public int SerialOfStatus_tevia { get; set; }
        // use to get the serial of tevia name
        public int GoalOfTalksNumber { get; set; }
        // the name of the form action was fired 
        public string FormName { get; set; }

        public List<ParamTeviaType> ParamTeviaTypeList { get; set; }
        public List<LifePolicy> LifePoliciesList { get; set; }
    }
}