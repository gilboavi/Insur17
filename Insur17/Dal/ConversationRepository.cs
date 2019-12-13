using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Insur17.Models;
using Microsoft.Extensions.Configuration;

namespace Insur17.Dal
{
    public class ConversationRepository : IConversationRepository
    {
        public string MyStringConnection { get; }

        public ConversationRepository(IConfiguration connection)
        {
            MyStringConnection = new my_connection(connection).MyStringConnection;
          
        }

        #region strings for sql
        const string sql_conversation_helper_tables=
         " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamGoalOfTalk] ORDER BY ParamName " + ";" +
         " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamTeviaType] ORDER BY ParamName " + ";" +
         " SELECT[Serial], [UserName] FROM [InsurDB].[dbo].[Users] ORDER BY UserName " + ";" +
         " SELECT[Serial], [ParamName] FROM[InsurDB].[dbo].[ParamTypeFollowupConversation] ORDER BY ParamName " + ";" +
         " SELECT NoPolice From LifePolicies Where ClientSerial=@client_serial " + ";";

        const string sql_conversation_with_followup = " SELECT  " +
                                                                        "	[Datee], SummaryOfConversation, GoalOfTalkName , " +
                                                                        " UserName,TypeFollowupConversationName  ," +
                                                                        " [Serial] " +
                                                                        " FROM [InsurDB].[dbo].[ConversationWithParam] " +
                                                                        " WHERE ClientSerial=@serial; " +
                                                " SELECT  	[DateFollowUp]  , Summary , UserName , " +
                                                " [StatusFollowUp], [ConversationsSerial]," + " " +
                                                " [Serial] " + " " +
                                                " FROM [InsurDB].[dbo].[FollowUpConversationWithParamsAndClientSerial] " +
            " WHERE ClientSerial=@serial; ";

        const string sql_followup = " SELECT  " + " " +
            "	[DateFollowUp] as  [תאריך]  , Summary as [תקציר הפניה],UserName as [מטפל בפניה],[StatusFollowUp] as [סטוטס הפניה] ," + " " +
            " [Serial] " + " " +
            "FROM [InsurDB].[dbo].[FollowUpConversationWithParams] WHERE ClientSerial=@client_serial ; "
            ;

        #endregion

        public string get_sql_conversations_list_string  (string type_where)
        {
           
         //   var by_client_serial = " WHERE ClientSerial=@client_serial ; ";
            var by_no_police = " WHERE NoPolice=@client_serial ; ";
            var by_meeting_serial = "Where  MeetingSerial=@client_serial ;";
            var where_str = " WHERE ClientSerial=@client_serial ; ";
            var sql_conversation = " SELECT  " + " " +" ClientSeria , NoPolice " + ", " +
                "  CONVERT( varchar, [Datee] , 103)	   , SummaryOfConversation,GoalOfTalkName  " + ", " +
                "UserName,TypeFollowupConversationName ,TypeFollowupConversationName  , Immediately " + " ," +
                " [Serial] " + " " +
                "FROM [InsurDB].[dbo].[ConversationWithParam] ";

            sql_conversation = " SELECT  *  FROM [InsurDB].[dbo].[ConversationWithParam]";
            switch (type_where)
            {
                case "no_police":
                    where_str = by_no_police;
                    break;
                case "meeting_serial":
                    where_str = by_meeting_serial;
                    break;
            }

            return sql_conversation + " " + where_str;
        }

        public List<Conversation> GetConversationListByClientSerial(int clientSerial, string str_query)
        {
            string sql_str = get_sql_conversations_list_string(str_query);

            List<Conversation> objList = new List<Conversation>();
            //   string connectionString = my_connection.MyStringConnection;

            using (SqlConnection connection = new SqlConnection(MyStringConnection))
            {
                //SqlDataReader
              
                connection.Open();
               
               
                SqlCommand command = new SqlCommand(sql_str, connection);
                command.Parameters.Add("@client_serial", System.Data.SqlDbType.Int, 4).Value = clientSerial;
                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        Conversation my_objt = new Conversation();
                        my_objt.Serial = Convert.ToInt32(dataReader["Serial"]);
                        my_objt.ClientSerial = Convert.ToInt32(dataReader["ClientSerial"]);
                        my_objt.SummaryOfConversation = Convert.ToString(dataReader["SummaryOfConversation"]);

                        my_objt.GoalOfTalkName = Convert.ToString(dataReader["GoalOfTalkName"]);
                        my_objt.TypeFollowupConversationName = Convert.ToString(dataReader["TypeFollowupConversationName"]);
                        my_objt.UserName = Convert.ToString(dataReader["UserName"]);
                        my_objt.NoPolice = Convert.ToString(dataReader["NoPolice"]);
                        my_objt.Datee = Convert.ToDateTime(dataReader["Datee"]);

                        
                        objList.Add(my_objt);
                    }
                }
                connection.Close();
            }

            return objList;
        }
    }
}
