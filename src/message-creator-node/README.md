# Launch

## Debug

```
dapr run --components-path ../../components  --app-id message-creator-python --app-port 3000 node app.js
```


## Build

```
REGISTRY_NAME=dzbuild 
az acr login --name $REGISTRY_NAME
az configure --defaults acr=$REGISTRY_NAME
az acr build --registry $REGISTRY_NAME --image message-creator-python .
```


## Deploy

```
kubectl apply -f ../../deploy/depl-message-creator-python.yaml
```

## Test

```
kubectl port-forward deployment/message-creator-app 3000

kubectl logs deployment/message-creator-app message-creator
```