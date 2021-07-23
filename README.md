# dapr-actor-messages

Sample application to demonstrate pubsub, remote invocation and distributed tracing on Azure

![](/img/ai.png)

### Prep

0.)
```
KUBE_GROUP=dzdapr
KUBE_NAME=dzdapr
SB_NAMESPACE=dzdapr$RANDOM
LOCATION=westeurope
```

1.) Create Application Insights and add instrumentation key in components/collector-config.yaml

```
WORKSPACE_RESOURCE_ID=$(az monitor log-analytics workspace list --resource-group $KUBE_GROUP --query "[?contains(name, '$KUBE_NAME')].id" -o tsv)
az monitor app-insights component create --app $KUBE_NAME-ai --location $LOCATION --resource-group $KUBE_GROUP --application-type web --kind web --workspace $WORKSPACE_RESOURCE_ID

```

2.) Create ServiceBus Namespaces and add SB Connection string in components/azuresb.yaml

```
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
