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
        [JsonProperty(PropertyName = "title")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "comments")]
        public string Comments { get; set; }
        [JsonProperty(PropertyName = "poster_path")]
        public string PosterPath { get; set; }
        [JsonProperty(PropertyName = "release_date")]
        public string ReleaseDate { get; set; }
        [JsonProperty(PropertyName = "vote_average")]
        public double VoteAverage { get; set; }
        [JsonProperty(PropertyName = "vote_count")]
        public int VoteCount { get; set; }
        [JsonProperty(PropertyName = "userid")]
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string UserId { get; set; }


    }
}
