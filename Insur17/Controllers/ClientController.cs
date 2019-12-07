using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Insur17.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Insur17.Controllers
{
    public class ClientController : Controller
    {
        private IClientRepository _ClientRepository { get; }

        public ClientController(IClientRepository clientRepository)
        {
            _ClientRepository = clientRepository;
        }

        public IActionResult Index()
        {
            List<Client> client_list = new List<Client>();
            client_list = _ClientRepository.get_clients();
            return View(client_list);
        }
       

        // GET: Client/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Client/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Client/Create
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

        // GET: Client/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Client/Edit/5
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

        // GET: Client/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Client/Delete/5
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


        #region ClientsListForAutocomplete - full name and ClientSerial for autocomplate
        /// <summary>
        /// gets full name and ClientSerial for autocomplate using GetClientsListByPartialClientName function
        /// </summary>
        /// <param name="term"></param>
        /// <returns></returns>
        public List<Client> ClientsListForAutocomplete(string query)
        {

            var model = _ClientRepository.GetClientsListByPartialClientName(query);
            return model;


            //     var c = model.Select(x => new { name = x.LastName + ' ' + x.FirstName, x.Serial, x.id });
            //     var b = c.ToArray<object>();
            ////  var b=Json(c,Newtonsoft.Json.JsonSerializerSettings.)
            //   //    var b = Json(c, JsonRequestBehavior.AllowGet);
            //     //  var b = Json(c,);
            //     return Json(c); 

        }
        #endregion

        #region GetClientsListByPartialClientName - used in ClientsListForAutocomplete ActionResult
        /// <summary>
        ///  gets full name and ClientSerial for autocomplate from ClientViewModel
        ///  for ClientsListForAutocomplete ActionResult
        /// </summary>
        /// <param name="partialClientName"></param>
        /// <returns></returns>
        //private List<Client> GetClientsListByPartialClientName(string partialClientName)
        //{
        //    clientViewModel.FindCleintsByPartialClientName(partialClientName); ;

        //    return clientViewModel.ClientsList;
        //}
        #endregion

    }
}