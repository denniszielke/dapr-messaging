

## Install Cert-Manager

kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.1.0/cert-manager.yaml


## Install Operator

export APP_INSIGHTS_KEY=


https://github.com/open-telemetry/opentelemetry-operator

kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml


kubectl apply -f - <<EOF
apiVersion: opentelemetry.io/v1alpha1
kind: OpenTelemetryCollector
metadata:
  name: dapr
spec:
  config: |
    receivers:
      jaeger:
        protocols:
          grpc:
    extensions:
      health_check:
      pprof:
        endpoint: :1888
      zpages:
        endpoint: :55679
    processors:
      queued_retry:
    exporters:
      logging:
        loglevel: debug
      azuremonitor:
      azuremonitor/2:
        endpoint: "https://dc.services.visualstudio.com/v2/track"
        instrumentation_key: "HERE_INSTRUMENTATION_KEY"
        maxbatchsize: 100
        maxbatchinterval: 10s
    service:
      extensions: [pprof, zpages, health_check]
      pipelines:
        traces:
          receivers: [jaeger]
          processors: [queued_retry]
          exporters: [azuremonitor/2,logging]
EOF


## Dapr configuration

kubectl apply -f - <<EOF
apiVersion: dapr.io/v1alpha1
kind: Configuration
metadata:
  name: tracing
  namespace: default
spec:
  tracing:
    samplingRate: "1"
    zipkin:
      endpointAddress: "http://simplest-collector.default.svc.cluster.local:14250/api/v2/spans"
EOF