using System.ComponentModel.DataAnnotations;

namespace MicroAlParque.Models
{
    public class LoginInputModel
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
    public class LoginViewModel
    {
        public string UserName { get; set; }
        public string Token { get; set; }
    }
}