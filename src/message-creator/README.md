# Launch

## Debug

```
dapr run --components-path /Users/dennis/Desktop/components  --app-id message-creator --app-port 3000 node app.js
```


## Build

```
REGISTRY_NAME=dzbuild 
az acr login --name $REGISTRY_NAME
az configure --defaults acr=$REGISTRY_NAME
az acr build --registry $REGISTRY_NAME --image message-creator .
```


## Deploy

```
kubectl apply -f ../../deploy/depl-message-creator.yaml
```

## Test

```
kubectl port-forward deployment/message-creator-app 3000

kubectl logs deployment/message-creator-app message-creator
```