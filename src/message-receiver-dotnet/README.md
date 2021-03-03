# Message filter

## Create

```
dotnet new webapi --no-https --name message_receiver

dotnet add package Dapr.AspNetCore --version 1.0.0-rc06

dotnet add package CloudNative.CloudEvents 
dotnet add package CloudNative.CloudEvents.AspNetCore 
dotnet add package Newtonsoft.Json 



dapr run --app-id message-receiver-dotnet --components-path ../../components --app-port 5002 --dapr-http-port 3501 dotnet run

```


## Publish messages

```
dapr publish --pubsub dzpubsub --topic senddata --data '{"id": 2, "name": "Dennis", "message": "Why I Sing the Blues"}'

{"id": 2, "subject": "Dennis", "source": "message-creator", "type": "event",  "message": "Why I Sing the Blues"}

curl -X POST http://127.0.0.1:5001/receiverequest -H "Content-Type: application/json" -H "Ce-Specversion: 1.0" -H "Ce-Type: dev.dapr.sample" -H "Ce-Source: dev.dapr.samples/message-filter" -H "Ce-Id: 536808d3-88be-4077-9d7a-a3f162705f79" -d '{"id": "2", "humidity": "3", "temperature": "4", "name": "Dennis", "message": "Why I Sing the Blues"}'

```

## Build

```
REGISTRY_NAME=dzbuild 
az acr login --name $REGISTRY_NAME
az configure --defaults acr=$REGISTRY_NAME
az acr build --registry $REGISTRY_NAME --image message-receiver-dotnet .
```


## Deploy

```
kubectl apply -f ../../deploy/depl-message-receiver-dotnet.yaml

kubectl logs deployment/message-receiver-app message-receiver
```