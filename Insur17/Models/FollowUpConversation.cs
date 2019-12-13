using System;

namespace Insur17.Models
{
    public class FollowUpConversation
    {
        public int Serial { get; set; }
        public int		ConversationsSerial	{get; set;}
        public DateTime		DateFollowUp	{get; set;}
        public string   	Summary	{get; set;}
        public int		UserSerial	{get; set;}
        public bool		Done	{get; set;}
        public DateTime DateToCall	{get; set;}
        public int		DeliveredTo	{get; set;}
        public int		TypeFollowupConversation	{get; set;}
      
        public bool StopReminder	{get; set;}
        public bool FelgReminder	{get; set;}
        public int		myMinute	{get; set;}
        public int		myHour	{get; set;}
        public int		SendToUserBy	{get; set;}
        public bool MarkAsImportant	{get; set;}
    }
}