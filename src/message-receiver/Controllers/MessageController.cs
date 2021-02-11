using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudNative.CloudEvents;
using Dapr;
using Dapr.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace message_receiver.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly ILogger<MessageController> _logger;

        public MessageController(ILogger<MessageController> logger)
        {
            _logger = logger;
        }

        [Topic("dzpubsub", "important")]
        [HttpPost("important")]
        public async Task<ActionResult<string>> ImportantMessages(CloudEvent message, [FromServices] DaprClient daprClient )// [FromBody]DeviceMessage message, [FromServices] DaprClient daprClient)
        {
            _logger.LogInformation("Enter important message");
            _logger.LogInformation(message.ToString());

            var deviceMessage = JsonConvert.DeserializeObject<DeviceMessage>(message.Data.ToString());
            
            _logger.LogInformation(deviceMessage.Id.ToString());

            return Ok(message.ToString());
        }

        [HttpPost("receiverequest")]
        
        public async Task<ActionResult<string>> ReceiveRequest(CloudEvent message, [FromServices] DaprClient daprClient )// [FromBody]DeviceMessage message, [FromServices] DaprClient daprClient)
        {
            _logger.LogInformation("Enter receive request messages");
            _logger.LogInformation(message.ToString());

            var deviceMessage = JsonConvert.DeserializeObject<DeviceMessage>(message.Data.ToString());
            
            _logger.LogInformation(deviceMessage.Id.ToString());
            
            return Ok(message.ToString());
        }

    }
}
