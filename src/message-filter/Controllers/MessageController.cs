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

namespace message_filter.Controllers
{
    [ApiController]
    // [Route("[controller]")]
    public class MessageController : ControllerBase
    {


        private readonly ILogger<MessageController> _logger;

        public MessageController(ILogger<MessageController> logger)
        {
            _logger = logger;
        }


        [Topic("dzpubsub", "senddata")]
        [HttpPost("senddata")]
        public async Task<ActionResult<string>> ReceiveMessages(CloudEvent message, [FromServices] DaprClient daprClient )// [FromBody]DeviceMessage message, [FromServices] DaprClient daprClient)
        {
            _logger.LogInformation("Enter receivemessage");
            _logger.LogInformation(message.ToString());

            var deviceMessage = JsonConvert.DeserializeObject<DeviceMessage>(message.Data.ToString());
            
            _logger.LogInformation(deviceMessage.Id.ToString());

            await daprClient.PublishEventAsync<CloudEvent>("dzpubsub", "important", message);

            return Ok(message.ToString());
        }

        [Topic("dzpubsub", "newdevice")]
        [HttpPost("newdevice")]
        public async Task<ActionResult<string>> ReceiveDeviceMessages(CloudEvent message, [FromServices] DaprClient daprClient )// [FromBody]DeviceMessage message, [FromServices] DaprClient daprClient)
        {
            _logger.LogInformation("Enter receive device messages");
            _logger.LogInformation(message.ToString());

            var deviceMessage = JsonConvert.DeserializeObject<DeviceMessage>(message.Data.ToString());
            
            _logger.LogInformation(deviceMessage.Id.ToString());

            await daprClient.PublishEventAsync<CloudEvent>("dzpubsub", "important", message);

            return Ok(message.ToString());
        }

        [HttpPost("receiverequest")]
        
        public async Task<ActionResult<string>> ReceiveRequest(CloudEvent message, [FromServices] DaprClient daprClient )// [FromBody]DeviceMessage message, [FromServices] DaprClient daprClient)
        {
            _logger.LogInformation("Enter receive request messages");
            _logger.LogInformation(message.ToString());

            var deviceMessage = JsonConvert.DeserializeObject<DeviceMessage>(message.Data.ToString());
            
            if (deviceMessage != null){
                _logger.LogInformation(deviceMessage.ToString());
                _logger.LogInformation(deviceMessage.Id.ToString());
            }

            try{
                await daprClient.InvokeMethodAsync<CloudEvent>("message-receiver", "receiverequest", message);
            }
            catch(Exception ex){
                _logger.LogError(ex, ex.Message);
                return BadRequest();
            }
            return Ok(message.ToString());
        }
    }
}
