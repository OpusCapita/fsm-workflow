#!/bin/bash

# set -ex

# latest commit
LATEST_COMMIT=$(git rev-parse HEAD)

# latest commit where core was changed
CORE_COMMIT=$(git log -1 --format=format:%H --full-diff core)

# latest commit where crud-editor was changed
CRUD_EDITOR_COMMIT=$(git log -1 --format=format:%H --full-diff crud-editor)

# latest commit where task-manager was changed
TASK_MANAGER_COMMIT=$(git log -1 --format=format:%H --full-diff task-manager)

# replace "/", "#", etc. in current git branch name
urlencode() {
  node -e "console.log('${*}'.replace('/', '%2F').replace('#', '%23'))"
}

REPO="fsm-workflow"
GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`
SAFE_GIT_BRANCH=`urlencode $GIT_BRANCH`

echo "Current branch is $SAFE_GIT_BRANCH"

if [ $CORE_COMMIT = $LATEST_COMMIT ]
  then
    echo "files in core has changed"
    # run script
fi

if [ $CRUD_EDITOR_COMMIT = $LATEST_COMMIT ]
  then
    echo "files in crud-editor has changed"
    curl -s -X POST -d build_parameters[CIRCLE_JOB]=build-crud-editor \
      https://circleci.com/api/v1.1/project/github/opuscapita/${REPO}/tree/${SAFE_GIT_BRANCH}?circle-token=${CIRCLE_CI_TOKEN} \
      | grep build_url | perl -pe 's/^.*(?=https)//g' | perl -pe 's/".*$//g' \
      > /dev/null
fi

if [ $TASK_MANAGER_COMMIT = $LATEST_COMMIT ]
  then
    echo "files in task-manager has changed"
    # run script
fi

echo "check-commit is done."