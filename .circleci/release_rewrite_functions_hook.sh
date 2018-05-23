node_version() {
    echo -e "\n[INFO] ================================================================================================="
    echo "[INFO] NodeJS: Updating to release version: $1."
    echo "[INFO] ================================================================================================="
    find . -type f -name "lerna.json" -exec sed -i 's|\"version.*\"|\"version\": \"'$1'\"|g' {} \;
    find . -type f -name "package.json" -exec sed -i 's|\"version.*\"|\"version\": \"'$1'\"|g' {} \;
    find . -type f -name "package.json" -exec sed -i 's|\"@opuscapita/fsm-workflow-core\".*\"|\"@opuscapita/fsm-workflow-core\": \"'$1'\"|g' {} \;
    find . -type f -name "package.json" -exec sed -i 's|\"@opuscapita/fsm-workflow-task-manager\".*\"|\"@opuscapita/fsm-workflow-task-manager\": \"'$1'\"|g' {} \;
    find . -type f -name "package.json" -exec sed -i 's|\"@opuscapita/fsm-workflow-history\".*\"|\"@opuscapita/fsm-workflow-history\": \"'$1'\"|g' {} \;
    find . -type f -name "package.json" -exec sed -i 's|\"@opuscapita/fsm-workflow-editor\".*\"|\"@opuscapita/fsm-workflow-editor\": \"'$1'\"|g' {} \;
    git --no-pager diff --color
}