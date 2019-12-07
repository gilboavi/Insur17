using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;



namespace Insur17.Models
{
    public class FullClient
    {
        public Client CurrentClient { get; set; }
        public User CurrentUser { get; set; }

        public List<Communication> CommunicationsList { get; set; }
        public List<Conversation> ConversationsList { get; set; }
        public List<PoliceWithCompanyAndStatusNames> LifePoliciesList { get; set; }
        public List<ConversationsListWithNames> ConversationsListWithFullname { get; set; }
        public List<ConversationWithParam> ConversationWithParamList { get; set; }
        public List<ParamHealthFund> HealthFundList { get; set; }

        public List<Document> DocumentsList { get; set; }

        public List<Payment> PaymentsList { get; set; }
        public List<Meeting> MeetingsList { get; set; }
        public List<PorposalWithCompanyAndTypeProposalNames> ProposalsList { get; set; }

        public int CurrentClientSerial { get; set; }

        public List<Client> ClientsList { get; set; }

        public List<ParamClientType> ParamClientTypeList { get; set; }

        public List<Agent> AgentList { get; set; }

        public string ClientNoFound { get; set; }

        public bool ClientIdExsits { get; set; }
        public bool ClientSaved { get; set; }

        public string ControlMessage { get; set; }
        public string DescriptionOfDocument { get; set; }

        public FullClient()
        {
            ControlMessage = string.Empty;
            
        }

        public bool Duplicate { get; set; }

        public List<ParamOperation> OperationList { get; set; }

        public List<ParamWorkStatu> WorkStatusList { get; set; }

        public FullConversation FullConversation { get; set; }

        public string ClientStatus { get; set; }

        public bool NewClient { get; set; }
    }
}