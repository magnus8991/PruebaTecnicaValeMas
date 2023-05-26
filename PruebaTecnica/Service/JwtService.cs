using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Entidad;
using MicroAlParque.Config;
using MicroAlParque.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace MicroAlParque.Service
{
    public class JwtService
    {
        private readonly AppSetting _appSettings;
        public JwtService(IOptions<AppSetting> appSettings)=> _appSettings = appSettings.Value;
        public LoginViewModel GenerateToken(User usuarioLogIn)
        {
            // return null if user not found
            if (usuarioLogIn == null) return null;
            var usuarioResponse = new LoginViewModel() { 
                UserName = usuarioLogIn.UserName,
            };
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, usuarioLogIn.UserName.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            usuarioResponse.Token = tokenHandler.WriteToken(token);
            return usuarioResponse;
        }
    }
}