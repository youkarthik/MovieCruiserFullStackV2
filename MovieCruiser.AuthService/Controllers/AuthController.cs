using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieCruiser.AuthService.Models;
using MovieCruiser.AuthService.Services;

namespace MovieCruiser.AuthService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly ITokenGenerator _tokenGenerator;

        public AuthController(IUserService service, ITokenGenerator tokenGenerator)
        {
            _service = service;
            _tokenGenerator = tokenGenerator;
        }

        [HttpPost]
        [Route("RegisterUser")]
        public IActionResult RegisterUser([FromBody]User user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = _service.RegisterUser(user);
                return Created("/api/Auth/RegisterUser", result);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(StatusCodes.Status409Conflict, ex.Message);
            }
            catch (Exception)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        //check the user crediential and supply token if appropriate
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody]User user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                User _user = _service.GetUserByCredentials(user.UserId, user.Password);

                //calling the function for Jwt token for repective user.
                string value = _tokenGenerator.GetJwtToken(user.UserId);

                //returning the jwt token for futher acccess.
                return Ok(value);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }

}