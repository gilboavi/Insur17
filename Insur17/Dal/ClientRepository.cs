﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Insur17.Models;
using Microsoft.Extensions.Configuration;

namespace Insur17.Dal
{
    public class ClientRepository: IClientRepository
    {
        const string sql_client_helper_tables = " SELECT[Serial], [ParamName] FROM [ParamClientType] ORDER BY ParamName " + ";" +
    " SELECT[Serial], [AgentName] FROM [Agents]  ORDER BY AgentName " + ";" +
    " SELECT[Serial], [ParamName] FROM [ParamOperation] ORDER BY ParamName ;";

        const string sql_client = "SELECT  * FROM  [ClientsWithParams]  WHERE [Serial]= @serial;";

        const string sql_communicatuion = "SELECT [CommunicationType] , [CommunicationValue] ," +
                        "  [Comment] , Serial FROM  [Communication] WHERE [ClientSerial]= @serial; ";

        const string sql_conversation = " SELECT CONVERT( varchar, [Datee] , 103) , " +
                        " SummaryOfConversation, GoalOfTalkName , " + " " +
                        "UserName ,TypeFollowupConversationName ," + " " + " NoPolice ," + " Done , Immediately ," +
                        " [Serial] " + " " +
                        " FROM [ConversationWithParam]  WHERE ClientSerial=@serial ; ";

        const string sql_followup_conversation = " SELECT  	[DateFollowUp]  , Summary , UserName , " +
                " [StatusFollowUp]  , [ConversationsSerial] , [Serial] " + " " +
                "FROM [FollowUpConversationWithParamsAndClientSerial] WHERE ClientSerial=@serial ; ";

        const string sql_for_auto_complete = "SELECT *  FROM Clients " +
                "WHERE cast([id] as nvarchar) like {0} + '%' " +
                "OR[LastName]  like {0} + '%' " +
                "OR[FirstName] like {0} + '%'  Order by LastName";

        const string sql_families = "SELECT *  FROM FamilyMembers Where ClientSerial= @serial; ";

        const string sql_family_members = " Select LastName, FirstName,Member_type, ClientSerial From FamilyMembersWithParams Where FamiliesSerial=@families_serial";

        public ClientRepository(IConfiguration connection)
        {
            MyStringConnection = new my_connection(connection).MyStringConnection;
            //  MyStringConnection =  connection["ConnectionStrings:DefaultConnection"]; ;
        }

        public string MyStringConnection { get; }

        public List<Client> GetClientsListByPartialClientName(string partialClientName)
        {
            List<Client> clientList = new List<Client>();
            //   string connectionString = my_connection.MyStringConnection;

            using (SqlConnection connection = new SqlConnection(MyStringConnection))
            {
                //SqlDataReader
                connection.Open();
                string sql = string.Format(sql_for_auto_complete, partialClientName);
              //  string sql = "Select * From Clients where FirstName Like"+ " '%"+ partialClientName+"' ";
                SqlCommand command = new SqlCommand(sql, connection);
                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        Client my_client = new Client();
                        my_client.Serial = Convert.ToInt32(dataReader["Serial"]);
                        my_client.id = Convert.ToInt32(dataReader["id"]);
                        my_client.FirstName = Convert.ToString(dataReader["FirstName"]);
                        my_client.LastName = Convert.ToString(dataReader["LastName"]);
                       



                        my_client.Sex = Convert.ToString(dataReader["Sex"]);
                        clientList.Add(my_client);
                    }
                }
                connection.Close();
            }
            return clientList;
        }

        public List<Client> get_clients()
        {

            List<Client> clientList = new List<Client>();
            //   string connectionString = my_connection.MyStringConnection;

            using (SqlConnection connection = new SqlConnection(MyStringConnection))
            {
                //SqlDataReader
                connection.Open();

                string sql = "Select * From Clients where FirstName='אבי' ";
                SqlCommand command = new SqlCommand(sql, connection);
                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        Client my_client = new Client();
                        my_client.id = Convert.ToInt32(dataReader["id"]);
                        my_client.FirstName = Convert.ToString(dataReader["FirstName"]);
                        my_client.LastName = Convert.ToString(dataReader["LastName"]);
                        try
                        {
                            my_client.Birthday = Convert.ToDateTime(dataReader["Birthday"]);
                        }
                        catch (Exception)
                        { }



                        my_client.Sex = Convert.ToString(dataReader["Sex"]);
                        clientList.Add(my_client);
                    }
                }
                connection.Close();
            }
            return clientList;
        }

        public Client get_client_by_serial(int serial)
        {
            throw new NotImplementedException();
        }
    }
}