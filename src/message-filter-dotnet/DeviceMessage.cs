using System;
using Newtonsoft.Json;

namespace message_filter
{
    public class DeviceMessage
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("humidity")]
        public string Humidity { get; set; }

        [JsonProperty("temperature")]
        public string Temperature { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        public override string ToString()
        {
            return base.ToString();
        }
    }
}
