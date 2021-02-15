# Message filter

## Create

```
dotnet new webapi --no-https --name message-filter

dotnet add package Dapr.AspNetCore --version 1.0.0-rc06

dotnet add package CloudNative.CloudEvents 
dotnet add package CloudNative.CloudEvents.AspNetCore 
dotnet add package Newtonsoft.Json 



dapr run --app-id message-filter  --components-path /Users/dennis/Desktop/components --app-port 5000 --dapr-http-port 3500 dotnet run

```


## Publish messages

```
dapr publish --publish-app-id message-filter --pubsub dzpubsub --topic newdevice --data '{"id": "2", "humidity": "3", "temperature": "4", "name": "Dennis", "message": "Why I Sing the Blues"}'

{"id": "2", "subject": "Dennis", "source": "message-creator", "type": "event",  "message": "Why I Sing the Blues"}


dapr invoke --app-id message-filter --method message/receiverequest --payload '{"id": "2", "humidity": "3", "temperature": "4", "name": "Dennis", "message": "Why I Sing the Blues"}'

curl -X POST http://127.0.0.1:5000/newdevice -H "Content-Type: application/json" -H "Ce-Specversion: 1.0" -H "Ce-Type: dev.dapr.sample" -H "Ce-Source: dev.dapr.samples/message-filter" -H "Ce-Id: 536808d3-88be-4077-9d7a-a3f162705f79" -d '{"id": "2", "humidity": "3", "temperature": "4", "name": "Dennis", "message": "Why I Sing the Blues"}'
```


{"id": "2", "humidity": "3", "temperature": "4", "name": "Dennis", "message": "Why I Sing the Blues"}

## Build

```
REGISTRY_NAME=dzbuild 
az acr login --name $REGISTRY_NAME
az configure --defaults acr=$REGISTRY_NAME
az acr build --registry $REGISTRY_NAME --image message-filter:latest .
```


## Deploy

```
kubectl apply -f ../../deploy/depl-message-filter.yaml

kubectl logs deployment/message-filter-app daprd

kubectl logs deployment/message-filter-app message-filter
```