# dapr-actor-messages


helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm upgrade redis bitnami/redis --install --set cluster.enabled=false --set password=secretpassword --namespace default
helm delete redis

cat <<EOF | kubectl apply -f -
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: statestore
spec:
  type: state.redis
  version: v1
  metadata:
  - name: redisHost
    value: redis-master:6379
  - name: redisPassword
    value: secretpassword
EOF

kubectl apply -f https://raw.githubusercontent.com/dapr/quickstarts/master/distributed-calculator/deploy/dotnet-subtractor.yaml
kubectl apply -f https://raw.githubusercontent.com/dapr/quickstarts/master/distributed-calculator/deploy/go-adder.yaml
kubectl apply -f https://raw.githubusercontent.com/dapr/quickstarts/master/distributed-calculator/deploy/node-divider.yaml
kubectl apply -f https://raw.githubusercontent.com/dapr/quickstarts/master/distributed-calculator/deploy/python-multiplier.yaml
kubectl apply -f https://raw.githubusercontent.com/dapr/quickstarts/master/distributed-calculator/deploy/react-calculator.yaml

kubectl apply -f https://raw.githubusercontent.com/dapr/quickstarts/master/distributed-calculator/deploy/redis.yaml