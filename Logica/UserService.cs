using System;
using Entidad;
using Datos;
using System.Linq;
using System.Collections.Generic;

namespace Logica
{
    public class UserService
    {
        private readonly PruebaTecnicaContext _contexto;

        public UserService(PruebaTecnicaContext contexto)
        {
            _contexto = contexto;
        }

        public Request<User> Save(User user)
        {
            Request<User> response = new Request<User>(user);
            try
            {
                response = SearchForName(user.UserName);
                response = (response.Error) ?
                    new Request<User>(user, "Datos guardados correctamente", false) :
                    new Request<User>(null, "El usuario que intentar guardar ya se encuentra registrado", true);
                if (!response.Error)
                {
                    _contexto.Users.Add(response.Item);
                    _contexto.SaveChanges();
                }
            }
            catch (Exception E)
            {
                response = new Request<User>(null, "Error de la aplicación: " + E.Message, true);
            }
            return response;
        }

        public User Validate(string nombreUser, string contrasena) 
        {
            return _contexto.Users.FirstOrDefault(t => t.UserName == nombreUser && t.Password == contrasena);
        }
        
        public Request<User> SearchForName(string UserName)
        {
            Request<User> response = new Request<User>(new User());
            try
            {
                response.Item = _contexto.Users.Find(UserName);
                response = (response.Item == null) ?
                    new Request<User>(null, "El User con Identificacion {Identificacion} no se encuentra registrado", true) :
                    new Request<User>(response.Item, "User encontrado", false);
            }
            catch (Exception E)
            {
                response = new Request<User>(null, "Error de la aplicación: " + E.Message, true);
            }
            return response;
        }
        public QueryRequest<User> All()
        {
            QueryRequest<User> response = new QueryRequest<User>();
            try
            {
                response.Items = _contexto.Users.ToList();
                response = (response.Items.Count == 0) ?
                    new QueryRequest<User>(new List<User>(), "No se han encontrado usuarios registrados", true) :
                    new QueryRequest<User>(response.Items.ToList(), "Consulta realizada con éxito", false);
            }
            catch (Exception e)
            {
                response = new QueryRequest<User>(new List<User>(), "Error: " + e.Message, true);
            }
            return response;
        }
    }
}