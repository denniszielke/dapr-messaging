using System;
using Newtonsoft.Json;

namespace message_receiver
{
    public class DeviceMessage
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("humidity")]
        public int Humidity { get; set; }

        [JsonProperty("temperature")]
        public int Temperature { get; set; }

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
