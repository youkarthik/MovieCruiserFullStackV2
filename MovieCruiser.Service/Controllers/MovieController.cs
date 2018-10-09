using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MovieCruiser.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MovieCruiser.Service.Controllers
{
    [Route("api/[controller]")]
    public class MovieController : Controller
    {
        private readonly IMovieService _service;

        public MovieController(IMovieService service)
        {
            _service = service;
        }
        // GET: api/<controller>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = _service.GetAllMovies();
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

     
      
    }
}
