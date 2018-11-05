using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieCruiser.Service.Models;
using MovieCruiser.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MovieCruiser.Service.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class MovieController : Controller
    {
        private readonly IMovieService _service;

        /// <summary>
        /// Movie Controller constuctor
        /// </summary>
        /// <param name="service">injecting service layer object</param>
        public MovieController(IMovieService service)
        {
            _service = service;
        }
        
        
        /// <summary>
        /// Movie Get opertaion without parameter
        /// </summary>
        /// <returns>Ok object result containing list of all movies</returns>
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
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// Movie Get operration with id as paramenter
        /// </summary>
        /// <param name="id">Movie key id</param>
        /// <returns>Single Movie object if exists</returns>
        [HttpGet("{id}")]
        public IActionResult Get([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = _service.GetMovieById(id);
                return Ok(result);
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

        /// <summary>
        /// Post method to add a new movie
        /// </summary>
        /// <param name="movie">Movie object</param>
        /// <returns>Status code based on the operation status</returns>
        [HttpPost]
        public IActionResult Post([FromBody] Movie movie)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var result = _service.AddMovie(movie);
                return Created("/api/Movie", result);

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

        /// <summary>
        /// Delete method to delete a movie by its id from the collection
        /// </summary>
        /// <param name="id">movie object key identifier</param>
        /// <returns>Status code based on the operation status</returns>
        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _service.DeleteMovie(id);
                return Ok();

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

        /// <summary>
        /// Put method to update he comments field of a particular movie based on its id
        /// </summary>
        /// <param name="id">movie object key identifier</param>
        /// <param name="comment">comment string</param>
        /// <returns>Status code based on the operation status</returns>
        [HttpPut("{id}")]
        public IActionResult Put([FromRoute] int id, [FromBody] string comment)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _service.UpdateMovieComments(id, comment);
                return Ok();
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
