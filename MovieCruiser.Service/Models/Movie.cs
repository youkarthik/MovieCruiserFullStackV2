using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MovieCruiser.Service.Models
{
    /// <summary>
    /// Movie model
    /// </summary>
    public class Movie
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "comments")]
        public string Comments { get; set; }
        [JsonProperty(PropertyName = "posterPath")]
        public string PosterPath { get; set; }
        [JsonProperty(PropertyName = "releaseDate")]
        public string ReleaseDate { get; set; }
        [JsonProperty(PropertyName = "voteAverage")]
        public double VoteAverage { get; set; }
        [JsonProperty(PropertyName = "voteCount")]
        public int VoteCount { get; set; }


    }
}
