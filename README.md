# dapr-actor-messages

Sample application to demonstrate pubsub, remote invocation and distributed tracing on Azure

![](/img/ai.png)

### Prep

1.) Create Application Insights and add instrumentation key in components/collector-config.yaml

2.) Create ServiceBus Namespaces and add SB Connection string in components/azuresb.yaml

```
KUBE_GROUP=appconfig
SB_NAMESPACE=dzdapr$RANDOM
LOCATION=westeurope

az servicebus namespace create --resource-group $KUBE_GROUP --name $SB_NAMESPACE --location $LOCATION
az servicebus namespace authorization-rule keys list --name RootManageSharedAccessKey --namespace-name $SB_NAMESPACE --resource-group $KUBE_GROUP --query "primaryConnectionString" | tr -d '"'
SB_CONNECTIONSTRING=$(az servicebus namespace authorization-rule keys list --name RootManageSharedAccessKey --namespace-name $SB_NAMESPACE --resource-group $KUBE_GROUP --query "primaryConnectionString" | tr -d '"')
```

3.) Install dapr in cluster

```
dapr init -k
```

4.) Deploy component configuration
```
kubectl apply -f components
```

5.) Deploy apps

```
kubectl apply -f deploy
```

6.) Connect to app via port forwarding

```
kubectl port-forward deployment/message-creator-app 3000
```

7.) Open localhost:3000 and create traffic
