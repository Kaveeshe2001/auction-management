﻿using System.ComponentModel.DataAnnotations;

namespace auction_backend.Dto
{
    public class LoginDto
    {
        [Required]
        public string Username { get; set; }
        [Required] 
        public string Password { get; set; }
    }
}
