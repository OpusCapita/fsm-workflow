#!/usr/bin/env bash

set -e

# ToDo write down exactly what this slugify does!!!!!!!!
slugify() {
  echo $1 | iconv -t ascii//TRANSLIT | sed -E s/[^a-zA-Z0-9]+/-/g | sed -E s/^-+\|-+$//g | tr A-Z a-z | cut -c1-53
}

GITHUB_PROJECT="${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}"

DOCKER_IMAGE_REPOSITORY=$(echo ${GITHUB_PROJECT} | tr '[:upper:]' '[:lower:]')-demo
DOCKER_IMAGE_TAG=$(slugify "${CIRCLE_BRANCH}")

APPLICATION_URL_PATH="/"
APPLICATION_URL="http://${MINSK_CORE_K8S_DEMO_DEPLOYMENTS_HOST}/${CIRCLE_PROJECT_REPONAME}/$(slugify $CIRCLE_BRANCH)${APPLICATION_URL_PATH}"

echo "GITHUB_PROJECT: '${GITHUB_PROJECT}'"
echo "DOCKER_IMAGE_REPOSITORY: '${DOCKER_IMAGE_REPOSITORY}'"
echo "DOCKER_IMAGE_TAG: '${DOCKER_IMAGE_TAG}'"
echo "APPLICATION_URL_PATH: '${APPLICATION_URL_PATH}'"
echo "APPLICATION_URL: '${APPLICATION_URL}'"

# login to azure
az login -u "$AZURE_USER" -p "$AZURE_PASS" &> /tmp/az-login.log
# use Minsk Core subscription
az account set -s "$MINSK_CORE_AZURE_SUBSCRIPTION_ID"
# access Minsk Core cluster
az aks get-credentials -n "$MINSK_CORE_K8S_AZURE_NAME" -g "$MINSK_CORE_K8S_AZURE_RG"
# configure $HELM_HOME
helm init --client-only

# put Helm dependencies into correct folder
helm dependency update

# install/update release
helm upgrade \
  --install \
  --force \
  --set ingress.host="${MINSK_CORE_K8S_HOST}" \
  --set ingress.path="${APPLICATION_URL_PATH}"\
  \
  --set image.repository="${DOCKER_IMAGE_REPOSITORY}" \
  --set image.tag="${DOCKER_IMAGE_TAG}" \
  \
  --set github-status-deployment-link.github.user="${GH_NAME}" \
  --set github-status-deployment-link.github.password="${GH_PASS}" \
  --set github-status-deployment-link.github.project="${GITHUB_PROJECT}" \
  --set github-status-deployment-link.github.ref="${CIRCLE_SHA1}" \
  --set github-status-deployment-link.url="${APPLICATION_URL}" \
  \
  --set selfkiller.azureAks.resourceGroup="${MINSK_CORE_K8S_AZURE_RG}" \
  --set selfkiller.azureAks.clusterName="${MINSK_CORE_K8S_AZURE_NAME}" \
  --set selfkiller.image.repository="${DOCKER_IMAGE_REPOSITORY}" \
  --set selfkiller.image.tag="${DOCKER_IMAGE_TAG}" \
  --set selfkiller.github.project="${GITHUB_PROJECT}" \
  --set selfkiller.github.branch="${CIRCLE_BRANCH}" \
  \
  --set slack-notifications.webhook="${MINSK_CORE_SLACK_CI_WEBHOOK_URL}" \
  --set slack-notifications.github.project="${GITHUB_PROJECT}" \
  --set slack-notifications.github.branch="${CIRCLE_BRANCH}" \
  --set slack-notifications.github.user="${CIRCLE_USERNAME}" \
  --set slack-notifications.github.ref="${CIRCLE_SHA1}" \
  --set slack-notifications.ci.jobUrl="${CIRCLE_BUILD_URL}" \
  --set slack-notifications.link.url="${APPLICATION_URL}" \
  \
  --namespace "${MINSK_CORE_K8S_NAMESPACE_DEVELOPMENT}" \
  $(slugify "${CIRCLE_PROJECT_REPONAME}-${CIRCLE_BRANCH}") \
  .
