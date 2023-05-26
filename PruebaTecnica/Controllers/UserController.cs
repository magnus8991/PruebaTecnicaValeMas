using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entidad;
using Logica;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MicroAlParque.Models;
using Datos;

namespace MicroAlParque.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public UserController(PruebaTecnicaContext contexto)
        {
            _userService = new UserService(contexto);
        }
         // GET: api/User
        [HttpGet]
        public ActionResult<QueryRequest<UserViewModel>> All()
        {
            var response = _userService.All();
            return Ok(response);
        }
        
        // POST: api/User
        [HttpPost]
        public ActionResult<Request<UserViewModel>> Create(UserInputModel userInput)
        {
            User user = MapUser(userInput);
            var response = _userService.Save(user);
            return Ok(response);
        }
      
        private User MapUser(UserInputModel userInput)
        {
            var User = new User();
            User.UserName = userInput.UserName;
            User.Password = userInput.Password;
            User.Email = userInput.Email;
            return User;
        }
    }
}