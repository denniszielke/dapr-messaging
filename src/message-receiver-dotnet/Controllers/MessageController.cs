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
    // [Route("[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly ILogger<MessageController> _logger;

        public MessageController(ILogger<MessageController> logger)
        {
            _logger = logger;
        }

        [Topic("dzpubsub", "important")]
        [HttpPost("important")]
        public async Task<ActionResult<string>> ImportantMessages([FromBody] DeviceMessage message, [FromServices] DaprClient daprClient )// [FromBody]DeviceMessage message, [FromServices] DaprClient daprClient)
        {
            _logger.LogInformation("Enter receive important messages");
            // var deviceMessage = JsonConvert.DeserializeObject<DeviceMessage>(message.Data.ToString());
              
            if (message != null){
                _logger.LogInformation("Received device message:" + message.ToString());
                if (message.Name != null){
                    _logger.LogInformation("Message from:" + message.Name.ToString());
                }    
                if (message.Id != null){
                    _logger.LogInformation("Message id:" + message.Id.ToString());
                }      
                if (message.Message != null){
                    _logger.LogInformation("Message says:" + message.Message.ToString());
                }              
            }

            return Ok("Thanks");
        }


        
        [HttpPost("receiverequest")]
        
        public async Task<ActionResult<string>> ReceiveRequest(DeviceMessage message, [FromServices] DaprClient daprClient )// [FromBody]DeviceMessage message, [FromServices] DaprClient daprClient)
        {
            _logger.LogInformation("Enter receive request messages");

            // var deviceMessage = JsonConvert.DeserializeObject<DeviceMessage>(message.Data.ToString());
            
            if (message != null){
                _logger.LogInformation("Received device message:" + message.ToString());
                 if (message.Name != null){
                    _logger.LogInformation("Message from:" + message.Name.ToString());
                }    
                if (message.Id != null){
                    _logger.LogInformation("Message id:" + message.Id.ToString());
                }      
                if (message.Message != null){
                    _logger.LogInformation("Message says:" + message.Message.ToString());
                }                 
            }

            return Ok("Thanks");
        }
    }
}
