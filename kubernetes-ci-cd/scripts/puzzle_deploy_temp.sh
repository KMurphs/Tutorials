#!/bin/bash

#Retrieve the latest git commit hash
BUILD_TAG=`git rev-parse --short HEAD`

# Create the deployment and service for the puzzle server aka puzzle
sed 's#127.0.0.1:30500/puzzle:$BUILD_TAG#127.0.0.1:30500/puzzle:'$BUILD_TAG'#' applications/puzzle/k8s/deployment.yaml | kubectl apply -f - --force=true

