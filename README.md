# [kubernetes-tutorial](https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/cluster-intro/)
A gentle introduction to kubernetes


# Definitions

**``Kubernetes is a coordinator, orchestrator of a cluster of machines connected and configured to work as one unit.``**

In order for this to work one aspect is of crucial importance:

	*Applications/Services need to be containerized as this allows decoupling of the **application package** from the machine that runs it. In other words, this newly created container "containing" your application can be deployed on any machine that's available and can even be replicated since it is not tied to any machine in particular.*

From there on,
> Kubernetes automates the distribution and scheduling of application containers across a cluster in a more efficient way.

# A Cluster

*If a cluster is a group of machines working together as one unit*, then kubernetes allows the distinction of 2 different types of machine:
1.	The master: *Coordinator of the cluster*
	Schedules applications
	Maintains applications desired states
	Scales applications
	Rolls new updates
2.	The nodes: ***The dedicated workers** of the cluster, running the applications*

**Note**: *Machines* here can refer to either physical machines or virtual ones 

## Creating a cluster


### Minikube

***``Minikube manages a cluster on a machine``***


Get minikube version
```
$ minikube version
> minikube version: v1.2.0
```

Start the cluster
```
$ minikube start --vm-driver="hyperv" --memory=2048 --cpus=4 --hyperv-virtual-switch="minikube-eth" --v=7 --alsologtostderr -p minikube-vm
```
> Minikube started a virtual machine for you, and a Kubernetes cluster is now running in that VM.


### Kubectl

***``Kubectl is a command line interface to interact with the cluster/kubernetes``***

Get some cluster information
```
$ kubectl version
> Client Version: version.Info{Major:"1", Minor:"15", GitVersion:"v1.15.0", GitCommit:"e8462b5b5dc2584fdcd18e6bcfe9f1e4d970a529", GitTreeState:"clean", BuildDate:"2019-06-19T16:40:16Z", GoVersion:"go1.12.5", Compiler:"gc", Platform:"windows/amd64"}
> Server Version: version.Info{Major:"1", Minor:"15", GitVersion:"v1.15.0", GitCommit:"e8462b5b5dc2584fdcd18e6bcfe9f1e4d970a529", GitTreeState:"clean", BuildDate:"2019-06-19T16:32:14Z", GoVersion:"go1.12.5", Compiler:"gc", Platform:"linux/amd64"}
```
> The client version is the kubectl version; the server version is the Kubernetes version installed on the master


Some more information
```
$ kubectl cluster-info
> Kubernetes master is running at https://172.17.7.164:8443
> KubeDNS is running at https://172.17.7.164:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

View nodes in the cluster
```
$ kubectl get nodes
> NAME       STATUS   ROLES    AGE    VERSION
> minikube   Ready    master   126m   v1.15.0
```


## Deploying an App


A deployment is a configuration object stored on the master. 

The master realises the deployment (specifications) and strives to keep the deployment specifications valid (selfhealing, ...) 

### Deployement

We will proceed to ***deploying*** a **containerized application** on top of our running cluster/kunernetes

> The Deployment instructs Kubernetes how to create and update instances of your application

> Once you've created a Deployment, the Kubernetes master schedules mentioned application instances onto individual Nodes in the cluster.

> Once the application instances are created, a Kubernetes Deployment Controller continuously monitors those instances. If the Node hosting an instance goes down or is deleted, the Deployment controller replaces the instance with an instance on another Node in the cluster. This provides a ***self-healing mechanism*** to address machine failure or maintenance.


***``Kubectl uses the Kubernetes API to interact with the cluster``***

*``The common format of a kubectl command is:`` **``kubectl action resource``***


A deployment is created with the **run** command. 

A name (*kubernetes-bootcamp*) need to be assigned to the deployment

The application image location needs to be provided (*gcr.io/google-samples/kubernetes-bootcamp:v1*). It can also be fetched form the Docker Hub

A port on which the app is accessible is also needed (*8080*)
```
$ kubectl run kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1 --port=8080
> kubectl run --generator=deployment/apps.v1 is DEPRECATED and will be removed in a future version. Use kubectl run --generator=run-pod/v1 or kubectl create instead.
> deployment.apps/kubernetes-bootcamp created
```
> This performed a few things for you:
> -	Searched for a suitable node where an instance of the application could be run (we have only 1 available node in minikube)
> -	Scheduled the application to run on that Node
> -	Configured the cluster to reschedule the instance on a new Node when needed


Get the current deployments
```
$ kubectl get deployments
> NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
> kubernetes-bootcamp   1/1     1            1           5m9s
```
***1*** deployment (only ***1*** item in the table) running ***1*** instance of the app (READY x/***1***) 

## Accessing the app

***``A Pod is Kubernetes’resiliency wrapper for containers, allowing you to horizontally
scale replicas. (https://kubernetes.io/docs/concepts/workloads/pods/pod/)``***

> Pods that are running inside Kubernetes are running on a private, isolated network. By default they are visible from other pods and services within the same kubernetes cluster, but not outside that network

> When we use kubectl, we're interacting through an API endpoint **on the master controller** to communicate with our application.

> Options to expose our application will be explored later. For now a proxy can be created to forward communication from our localhost to the cluster pods via some port.

On a second terminal,
```
$ kubectl proxy
> Starting to serve on 127.0.0.1:8001
```
It my understanding that this proxy connects the terminal to the internal API endpoint on the master controller instead of its external public API endpoint also used by kubectl

Query the internal version of the master controller
```
$ curl http://localhost:8001/version
> {
  "major": "1",
  "minor": "15",
  "gitVersion": "v1.15.0",
  "gitCommit": "e8462b5b5dc2584fdcd18e6bcfe9f1e4d970a529",
  "gitTreeState": "clean",
  "buildDate": "2019-06-19T16:32:14Z",
  "goVersion": "go1.12.5",
  "compiler": "gc",
  "platform": "linux/amd64"
}
```

If we want to talk to a specific pod, we need its name:
```
$ kubectl get pods
> NAME                                   READY   STATUS    RESTARTS   AGE
> kubernetes-bootcamp-5b48cfdcbd-bzd7d   1/1     Running   0          22m
```
Notice the difference between the deployment name and the pod name

Let's save the pod name in a variable
```
Set POD_NAME=kubernetes-bootcamp-5b48cfdcbd-bzd7d
echo %POD_NAME%
```

Let's connect to the pod
```
$ curl http://localhost:8001/api/v1/namespaces/default/pods/%POD_NAME%/proxy/
> Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-bzd7d | v=1
```


## Viewing Pods and Nodes

### Pods

***``A Pod is a Kubernetes abstraction that represents a group of one or more application containers (such as Docker or rkt), and some shared resources for those containers. Those resources include:``
``- Shared storage, as Volumes``
``- Networking, as a unique cluster IP address``
``- Information about how to run each container, such as the container image version or specific ports to use``***


***``The containers in a Pod share an IP Address and port space, are always co-located and co-scheduled, and run in a shared context on the same Node``***

> Pods are the atomic unit on the Kubernetes platform. When we create a Deployment on Kubernetes, that Deployment creates Pods with containers inside them (as opposed to creating containers directly). Each Pod is tied to the Node where it is scheduled, and remains there until termination (according to restart policy) or deletion. In case of a Node failure, identical Pods are scheduled on other available nodes in the cluster


> *Containers should only be scheduled together in a single Pod if they are tightly coupled and need to share resources such as disk.*

### Nodes

A node is a worker machine in the kubernetes cluster. It can be either virtual or physical, and is always controlled by one master
A node can have multiples pods, but a pod can only run on ***one*** node at any time 

> Kubernetes master automatically handles scheduling the pods across the Nodes in the cluster. The Master's automatic scheduling takes into account the available resources on each Node.


Every Kubernetes Node runs at least:
-	Kubelet, ***``a process responsible for communication between the Kubernetes Master and the Node; it manages the Pods and the containers running on a machine.``***
-	A container runtime (like Docker, rkt) ***``responsible for pulling the container image from a registry, unpacking the container, and running the containerized application.``***



### Troubleshooting

The most common operations can be done with the following kubectl commands:
```
    kubectl get - list resources
    kubectl describe - show detailed information about a resource
    kubectl logs - print the logs from a container in a pod
    kubectl exec - execute a command on a container in a pod
```


> The describe command can be used to get detailed information about most of the kubernetes primitives: node, pods, deployments. 

> The describe output is designed to be human readable, not to be scripted against.

Some commands examples
```
kubectl describe pods
kubectl logs %POD_NAME%
kubectl exec %POD_NAME% env
kubectl exec -ti %POD_NAME% bash
kubectl exec -ti %POD_NAME% sh
```

From inside the pods we can do:
```
cat server.js
ls
curl localhost:8080
...
```


# Using a Service to Expose Your App

> A Service in Kubernetes is an abstraction which defines a ***logical set of Pods*** and a ***policy by which to access them***

A service is a concept similar the docker services. They can extend over many nodes, and provide the pods that it controls a single ip and port so that effectively a user connecting to the system will actually connect to the service which will redirect the connection to an available pod on a node of its choice (Load balancing)

> A Service is defined using YAML (preferred) or JSON, like all Kubernetes objects. The set of Pods targeted by a Service is usually determined by a LabelSelector.

> Although each Pod has a unique IP address, those IPs are not exposed outside the cluster without a Service. Services allow your applications to receive traffic. Services can be exposed in different ways by specifying a type in the ServiceSpec:

>	-    ClusterIP (default) - Exposes the Service on an internal IP in the cluster. This type makes the Service only reachable from within the cluster.

>	-    NodePort - Exposes the Service on the same port of each selected Node in the cluster using NAT. Makes a Service accessible from outside the cluster using <NodeIP>:<NodePort>. Superset of ClusterIP.

>	-    LoadBalancer - Creates an external load balancer in the current cloud (if supported) and assigns a fixed, external IP to the Service. Superset of NodePort.

>	-    ExternalName - Exposes the Service using an arbitrary name (specified by externalName in the spec) by returning a CNAME record with the name. No proxy is used. This type requires v1.7 or higher of kube-dns.


## Setting up the Service
> A Service routes traffic across a set of Pods. Services are the abstraction that allow pods to die and replicate in Kubernetes without impacting your application. Discovery and routing among dependent Pods (such as the frontend and backend components in an application) is handled by Kubernetes Services

> Services match a set of Pods using labels and selectors. Labels are key/value pairs attached to objects


let's list current services
```
$ kubectl get services
> NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
> kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   3h58m
```
Note that the current service is of type ClusterIP which by default does not expose the cluster to the outside world.

Some information about the current service
```
kubectl describe services/kubernetes
```
Note the port (443) and the target port (8443). The node port is used from the outside world eg ``curl <minikube ip>:<target port>`` and it isn't here.

When this command is run
```
$ minikube ip -p minikube-vm
> 172.17.7.164

$ curl 172.17.7.164:8443
> Client sent an HTTP request to an HTTPS server.
```

Now, let create a new service with ``kubectl expose``
```
$ kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080
> service/kubernetes-bootcamp exposed
```


And now, 
```
$ kubectl get services
> NAME                  TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
> kubernetes            ClusterIP   10.96.0.1        <none>        443/TCP          4h2m
> kubernetes-bootcamp   NodePort    10.106.205.172   <none>        8080:32454/TCP   7s
```
and, 
```
kubectl describe services/kubernetes-bootcamp
```
The NodePort is set to 32454. Therefore, we get 
```
$ minikube ip -p minikube-vm
> 172.17.7.164

$ curl 172.17.7.164:32454
> Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-bzd7d | v=1
```
The service has been exposed

## Investigating labels

The Deployment created automatically a label for our Pod
```
kubectl describe deployment
```
Under the response we can see,
```
Labels:                 run=kubernetes-bootcamp
```
We can use this lable to query our list of pods,
```
$ kubectl get pods -l run=kubernetes-bootcamp
> NAME                                   READY   STATUS    RESTARTS   AGE
> kubernetes-bootcamp-5b48cfdcbd-bzd7d   1/1     Running   0          120m
```
Or use it to get the service that owns this pod
```
$ kubectl get services -l run=kubernetes-bootcamp
> NAME                  TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
> kubernetes-bootcamp   NodePort   10.106.205.172   <none>        8080:32454/TCP   14m
``` 


We can add an arbitrary label to a pod
```
$ kubectl label pod %POD_NAME% app=v1_IAmAwesome
> pod/kubernetes-bootcamp-5b48cfdcbd-bzd7d labeled
``` 
then,
```
$ kubectl describe pods %POD_NAME%
> Labels:         app=v1_IAmAwesome
                  pod-template-hash=5b48cfdcbd
                  run=kubernetes-bootcamp
```
and query the pods with that label
```
$ kubectl get pods -l app=v1_IAmAwesome
NAME                                   READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-5b48cfdcbd-bzd7d   1/1     Running   0          126m
```

## Deleting the service


```
kubectl describe deployment
```
The service is configured with the label ``run=kubernetes-bootcamp``

The service can be deleted with
```
$ kubectl delete service -l run=kubernetes-bootcamp
> service "kubernetes-bootcamp" deleted
```

The deletion can be confirmed with
```
$ kubectl get services
> NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
> kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   4h25m
```

And now
```
$ curl 172.17.7.164:32454
> curl: (7) Failed to connect to 172.17.7.164 port 32454: Connection refused
```

But,
```
$ kubectl exec -ti %POD_NAME% curl localhost:8080
> Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-bzd7d | v=1
```
proves that the app is still running


# Running multiple Instances of the app (Scaling)

> Scaling out a Deployment will ensure new Pods are created and scheduled to Nodes with available resources

> Running multiple instances of an application will require a way to distribute the traffic to all of them. Services have an integrated load-balancer that will distribute network traffic to all Pods of an exposed Deployment. Services will monitor continuously the running Pods using endpoints, to ensure the traffic is sent only to available Pods.

> Once you have multiple instances of an Application running, you would be able to do Rolling updates without downtime.


## Scaling


Under the response below,
```
$ kubectl get deployments
> NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
> kubernetes-bootcamp   1/1     1            1           137m
```
-	READY is the ratio between number of CURRENT and number of DESIRED replicas.
	-	CURRENT is the number of replicas running now
	-	DESIRED is the configured number of replicas
-	The UP-TO-DATE is the number of replicas that were updated to match the desired (configured) state
-	The AVAILABLE state shows how many replicas are actually AVAILABLE to the users


Let's scale to 4 replicas
```
$ kubectl scale deployments/kubernetes-bootcamp --replicas=4
> deployment.extensions/kubernetes-bootcamp scaled
```

And confirm the scaling,
```
$ kubectl get deployments
> NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
> kubernetes-bootcamp   4/4     4            4           138m
```

Let's take a closer look at the pods
```
$ kubectl get pods
> NAME                                   READY   STATUS    RESTARTS   AGE
> kubernetes-bootcamp-5b48cfdcbd-9znl5   1/1     Running   0          18s
> kubernetes-bootcamp-5b48cfdcbd-bzd7d   1/1     Running   0          138m
> kubernetes-bootcamp-5b48cfdcbd-grstx   1/1     Running   0          18s
> kubernetes-bootcamp-5b48cfdcbd-p69xj   1/1     Running   0          18s


$ kubectl get pods -o wide
> NAME                                   READY   STATUS    RESTARTS   AGE    IP           NODE       NOMINATED NODE   READINESS GATES
> kubernetes-bootcamp-5b48cfdcbd-9znl5   1/1     Running   0          27s    172.18.0.6   minikube   <none>           <none>
> kubernetes-bootcamp-5b48cfdcbd-bzd7d   1/1     Running   0          138m   172.18.0.5   minikube   <none>           <none>
> kubernetes-bootcamp-5b48cfdcbd-grstx   1/1     Running   0          27s    172.18.0.8   minikube   <none>           <none>
> kubernetes-bootcamp-5b48cfdcbd-p69xj   1/1     Running   0          27s    172.18.0.7   minikube   <none>           <none>
```
Note the 4 running pods with different ip addresses


And, the replication event has been successfully logged in events in the last paragraph of the reponse below
```
$ kubectl describe deployments/kubernetes-bootcamp
> Events:
>   Type    Reason             Age   From                   Message
>   ----    ------             ----  ----                   -------
>   Normal  ScalingReplicaSet  53s   deployment-controller  Scaled up replica set kubernetes-bootcamp-5b48cfdcbd to 4
```


## Load balancing

Services have an integrated and automatic load-balancer that will distribute network traffic to all Pods of an exposed Deployment. Services will monitor continuously the running Pods using endpoints, to ensure the traffic is sent only to available Pods.

let's get the NodePort where our service is exposed (30734) and the ip address of our cluster public endpoint
```
$ kubectl describe services/kubernetes-bootcamp
> NodePort:                 <unset>  30734/TCP

$ minikube ip -p minikube-vm
> 172.17.7.164
```
and,
```
$ curl 172.17.7.164:30734
> Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-bzd7d | v=1

$ curl 172.17.7.164:30734
> Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-p69xj | v=1

$ curl 172.17.7.164:30734
> Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-grstx | v=1

$ curl 172.17.7.164:30734
> Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-bzd7d | v=1

$ curl 172.17.7.164:30734
> Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-grstx | v=1

$ curl 172.17.7.164:30734
> Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-grstx | v=1

$ curl 172.17.7.164:30734
> Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-9znl5 | v=1
```
Notice how the pods that curl hits is different each time (kubernetes-bootcamp-5b48cfdcbd-***grstx***, -***p69xj***,... )


## Scaling down

```
$ kubectl scale deployments/kubernetes-bootcamp --replicas=2
> deployment.extensions/kubernetes-bootcamp scaled


$ kubectl get deployments
> NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
> kubernetes-bootcamp   2/2     2            2           157m


$ kubectl get pods -o wide
> NAME                                   READY   STATUS        RESTARTS   AGE    IP           NODE       NOMINATED NODE   READINESS GATES

> kubernetes-bootcamp-5b48cfdcbd-9znl5   1/1     Running       0          19m    172.18.0.6   minikube   <none>           <none>
> kubernetes-bootcamp-5b48cfdcbd-bzd7d   1/1     Running       0          157m   172.18.0.5   minikube   <none>           <none>
> kubernetes-bootcamp-5b48cfdcbd-grstx   1/1     Terminating   0          19m    172.18.0.8   minikube   <none>           <none>
> kubernetes-bootcamp-5b48cfdcbd-p69xj   1/1     Terminating   0          19m    172.18.0.7   minikube   <none>           <none>
```
and eventually,
```
$ kubectl get pods -o wide
> NAME                                   READY   STATUS        RESTARTS   AGE    IP           NODE       NOMINATED NODE   READINESS GATES

> kubernetes-bootcamp-5b48cfdcbd-9znl5   1/1     Running       0          19m    172.18.0.6   minikube   <none>           <none>
> kubernetes-bootcamp-5b48cfdcbd-bzd7d   1/1     Running       0          157m   172.18.0.5   minikube   <none>           <none>
```













# Installing

## Windows "chocolatey" - (sort of npm for windows)
```
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString(‘https://chocolatey.org/install.ps1'))
choco upgrade chocolatey
```

## Docker
See official Installation [here](https://hub.docker.com/editions/community/docker-ce-desktop-windows)

## Minikube, kubectl and Helm

***Minikube manages a cluster on a machine***

***Kubectl interacts with the cluster***

***Helm is package manager for Kubernetes. It allows you to deploy Helm Charts (or packages) onto a K8s cluster with all the resources and dependencies
needed for the application.***
```
choco install kubernetes-cli
choco install minikube
choco install kubernetes-helm
```

### [Minikube](https://kubernetes.io/docs/setup/learning-environment/minikube/) (mini-kubernetes)

1.	Create a "minikube-eth" external Hyper-V virtual switch (on an ethernet connection, and allowed to be shared with the os management)
2.	Put minikube.exe into a folder on a disk (e.g. C:\minikube).
3.	Add the folder to PATH.
4.	Create a folder on the same logical disk as the minikube.exe's folder (e.g. C:\minikube_home).
5.	Set MINIKUBE_HOME env var to the folder in p. 4
6.	CD to the minikube.exe's folder.
7.	minikube start --vm-driver="hyperv" --memory=4096 --cpus=4 --hyperv-virtual-switch="minikube-eth" --v=7 --alsologtostderr -p "minikube-vm"

#### Useful commands
```
minikube --help
minikube version
minikube status -p minikube-vm
minikube start --vm-driver="hyperv" --memory=4096 --cpus=4 --hyperv-virtual-switch="minikube-eth" --v=7 --alsologtostderr -p "minikube-vm"
minikube stop -p minikube-vm
minikube delete -p minikube-vm
minikube ssh -p minikube-vm
minikube dashboard -p minikube-vm
```

#### Notes 
1.	Minikube creates a virtual machine on the host PC where the cluster resides. This virtual machine can be managed from the HyperV environment under Windows, or from the Windows PowerShell (as admin). Under Windows PowerShell, a few useful commands to know about are:
```
	get-vm
	remove-vm
	remove-vm "vm name" -Force
	stop-vm
	Get-NetAdapter
```

2.	As a virtual switch is created, keep in mind that it should be an external switch on a *currently running* ethernet connection, and must be allowed to be shared with the OS. This can be done under HyperV (preferred) or under Windows PowerShell:
```
In hyperV: Windows Home > HyperV Manager > Right Click on left pane item under HyperV Manager > Virtual Switch Manager > Create new > External > Create Virtual Switch > Enter Name, External Network, choose *currently running* ethernet connection, check allow management
```
```
In Windows PowerShell: New-VMSwitch -name ExternalSwitch  -NetAdapterName "Ethernet 3"  -AllowManagementOS $true
```

#### Troubleshooting Resources
https://medium.com/@mudrii/kubernetes-local-development-with-minikube-on-hyper-v-windows-10-75f52ad1ed42
https://chocolatey.org/packages/kubernetes-helm
https://github.com/kubernetes/minikube/issues/2914
https://github.com/kubernetes/minikube/issues/1967
https://github.com/kubernetes/minikube/issues/2866
https://github.com/kubernetes/minikube/issues/2181
https://github.com/kubernetes/minikube/issues/2914
https://stackoverflow.com/questions/55417410/kubernetes-create-deployment-unexpected-schemaerror


### [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-windows) (kube - control)
1.	Rename the "kubectl.exe" under docker installation (kubectl natively ships with the docker installation)
2.	Get path of "kubectlexe installed via choco
3.	Add to PATH so that it is found instead of the kubectl that ships with the docker installation

#### Useful commands
```
kubectl --help
kubectl version
kubectl cluster-info
```

#### Resources
https://kubernetes.io/docs/setup/learning-environment/minikube/
https://kubernetes.io/docs/tasks/