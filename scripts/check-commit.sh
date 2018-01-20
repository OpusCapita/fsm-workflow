#!/bin/bash

set -ex

# latest commit
LATEST_COMMIT=$(git rev-parse HEAD)

# latest commit where core was changed
CORE_COMMIT=$(git log -1 --format=format:%H --full-diff core)

# latest commit where crud-editor was changed
CRUD_EDITOR_COMMIT=$(git log -1 --format=format:%H --full-diff crud-editor)

# latest commit where task-manager was changed
TASK_MANAGER_COMMIT=$(git log -1 --format=format:%H --full-diff task-manager)

if [ $CORE_COMMIT = $LATEST_COMMIT ]
  then
    echo "files in core has changed"
    # run script
fi

if [ $CRUD_EDITOR_COMMIT = $LATEST_COMMIT ]
  then
    echo "files in crud-editor has changed"
    # run script
fi

if [ $TASK_MANAGER_COMMIT = $LATEST_COMMIT ]
  then
    echo "files in task-manager has changed"
    # run script
fi