using Entidad;
using System;
using System.ComponentModel.DataAnnotations;

namespace MicroAlParque.Models
{
    public class UserInputModel
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }

        public UserInputModel() { }
    }

    public class UserViewModel : UserInputModel
    {
        public string Estado { get; set; }
        public UserViewModel() { }
        public UserViewModel(User user)
        {
            UserName = user.UserName;
            Password = user.Password;
            Email = user.Email;
        }
    }
}