using System.ComponentModel.DataAnnotations;

namespace Entidad
{
    public class User
    {
        [Key]
        [StringLength(20)]
        public string UserName { get; set; }
        [StringLength(20)]
        public string Password { get; set; }
        [StringLength(30)]
        public string Email { get; set; }
    }
}
