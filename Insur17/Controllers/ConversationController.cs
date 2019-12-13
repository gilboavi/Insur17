using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Insur17.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Insur17.Controllers
{
    public class ConversationController : Controller
    {

        private IConversationRepository _ConversationRepository { get; }

        public ConversationController(IConversationRepository myRepository)
        {
            _ConversationRepository = myRepository;
        }

        public List<Conversation> GetConversationListByClientSerial(int client_serial)
        {
            var my_list = _ConversationRepository.GetConversationListByClientSerial(client_serial, "");

            return my_list;
        }



        // GET: Conversation
        public ActionResult Index()
        {
            return View();
        }

        // GET: Conversation/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Conversation/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Conversation/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Conversation/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Conversation/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Conversation/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Conversation/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}