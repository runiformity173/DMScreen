const WORKSPACE_ICON_CLOSED = `<svg width="30" height="30" fill="currentColor" class="bi bi-folder2" viewBox="0 0 16 16"><path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5z"/></svg>`;
const WORKSPACE_ICON_OPEN = `<svg width="30" height="30" fill="currentColor" class="bi bi-folder2-open" viewBox="0 0 16 16"><path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A.5.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z"/></svg>`;

// I am an honest man: the following code was AI generated.
function readStore() {
    return JSON.parse(localStorage.getItem("DMScreen2") || "{}");
}

function writeStore(store) {
    localStorage.setItem("DMScreen2", JSON.stringify(store));
}

function makeWorkspaceId(taken) {
    let id;
    do {
        id = "ws-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
    } while (taken.has(id));
    taken.add(id);
    return id;
}

function uniqueWorkspaceName(base, workspaces) {
    const taken = new Set(workspaces.map(i => i.name));
    if (!taken.has(base)) return base;
    let n = 2;
    while (taken.has(`${base} ${n}`)) n++;
    return `${base} ${n}`;
}

function migrateWorkspaces() {
    const store = readStore();
    let changed = false;
    if (!Array.isArray(store.workspaces)) {
        store.workspaces = [];
        changed = true;
    }
    if (Array.isArray(store.windows)) {
        if (store.workspaces.length === 0) {
            const taken = new Set();
            store.workspaces.push({id: makeWorkspaceId(taken), name: "Default", windows: store.windows});
        }
        delete store.windows;
        changed = true;
    }
    if (store.workspaces.length === 0) {
        const taken = new Set();
        store.workspaces.push({id: makeWorkspaceId(taken), name: "Default", windows: []});
        changed = true;
    }
    const taken = new Set();
    for (const workspace of store.workspaces) {
        if (!Array.isArray(workspace.windows)) {
            workspace.windows = [];
            changed = true;
        }
        if (typeof workspace.id !== "string" || !workspace.id || taken.has(workspace.id)) {
            workspace.id = makeWorkspaceId(taken);
            changed = true;
        } else {
            taken.add(workspace.id);
        }
        if (typeof workspace.name !== "string" || !workspace.name) {
            workspace.name = "Unnamed";
            changed = true;
        }
    }
    if (!store.workspaces.some(i => i.id === store.activeWorkspaceId)) {
        store.activeWorkspaceId = store.workspaces[0].id;
        changed = true;
    }
    if (changed) writeStore(store);
    return store;
}

function withStore(mutator) {
    const store = migrateWorkspaces();
    const result = mutator(store);
    writeStore(store);
    return result;
}

function getWorkspaces() {
    return migrateWorkspaces().workspaces;
}

function getActiveWorkspaceId() {
    return migrateWorkspaces().activeWorkspaceId;
}

function getActiveWorkspace() {
    const store = migrateWorkspaces();
    return store.workspaces.find(i => i.id === store.activeWorkspaceId) || store.workspaces[0];
}

function getActiveWindows() {
    return getActiveWorkspace().windows;
}

function setActiveWindows(windows) {
    withStore(store => {
        store.workspaces.find(i => i.id === store.activeWorkspaceId).windows = windows;
    });
}

/* --- Actions --- */

function createWorkspace(name) {
    const workspace = withStore(store => {
        const taken = new Set(store.workspaces.map(i => i.id));
        const created = {
            id: makeWorkspaceId(taken),
            name: uniqueWorkspaceName(name || "New Workspace", store.workspaces),
            windows: [],
        };
        store.workspaces.push(created);
        return created;
    });
    switchWorkspace(workspace.id);
    return workspace;
}

function renameWorkspace(id, name) {
    const trimmed = (name || "").trim();
    if (!trimmed) return false;
    const renamed = withStore(store => {
        const workspace = store.workspaces.find(i => i.id === id);
        if (!workspace) return false;
        workspace.name = uniqueWorkspaceName(trimmed, store.workspaces.filter(i => i.id !== id));
        return true;
    });
    if (renamed) renderWorkspaceSelector();
    return renamed;
}

function deleteWorkspace(id) {
    const wasActive = getActiveWorkspaceId() === id;
    const removed = withStore(store => {
        if (store.workspaces.length <= 1) return false;
        store.workspaces = store.workspaces.filter(i => i.id !== id);
        return true;
    });
    if (!removed) {
        alert("You need to keep at least one workspace.");
        return false;
    }
    if (wasActive) renderActiveWorkspace();
    else renderWorkspaceSelector();
    return true;
}

function switchWorkspace(id) {
    if (!getWorkspaces().some(i => i.id === id)) return false;
    saveActiveWindows();
    withStore(store => {
        store.activeWorkspaceId = id;
    });
    renderActiveWorkspace();
    return true;
}

function renderActiveWorkspace() {
    clearWindows();
    load();
    renderWorkspaceSelector();
}

/* --- Selector UI --- */

let workspaceSelectOpen = false;

function setWorkspaceSelectorOpen(open) {
    workspaceSelectOpen = open;
    const menu = document.getElementById("workspaceMenu");
    const toggler = document.getElementById("workspaceToggler");
    if (menu) menu.classList.toggle("forcedOpen", open);
    if (toggler) toggler.innerHTML = open ? WORKSPACE_ICON_OPEN : WORKSPACE_ICON_CLOSED;
}

function toggleWorkspaceSelector() {
    if (!workspaceSelectOpen) renderWorkspaceSelector();
    setWorkspaceSelectorOpen(!workspaceSelectOpen);
}

function renderWorkspaceSelector() {
    const list = document.getElementById("workspaceList");
    if (!list) return;
    const activeId = getActiveWorkspaceId();
    const workspaces = getWorkspaces();
    list.textContent = "";

    for (const workspace of workspaces) {
        const row = document.createElement("div");
        row.className = "workspaceRow" + (workspace.id === activeId ? " active" : "");

        const open = document.createElement("button");
        open.className = "workspaceOpen";
        open.title = workspace.name;

        const name = document.createElement("span");
        name.className = "workspaceName";
        name.textContent = workspace.name;
        open.appendChild(name);

        const count = document.createElement("span");
        count.className = "windowCount";
        count.textContent = workspace.windows.length;
        open.appendChild(count);

        open.onclick = () => {
            if (workspace.id !== activeId) switchWorkspace(workspace.id);
            setWorkspaceSelectorOpen(false);
        };

        const rename = document.createElement("button");
        rename.className = "workspaceAction";
        rename.textContent = "✎";
        rename.title = "Rename workspace";
        rename.onclick = () => {
            const name = prompt("Workspace name", workspace.name);
            if (name !== null) renameWorkspace(workspace.id, name);
        };

        const remove = document.createElement("button");
        remove.className = "workspaceAction delete";
        remove.textContent = "×";
        remove.onclick = () => {
            if (confirm(`Delete the workspace "${workspace.name}"? This can't be undone.`)) {
                deleteWorkspace(workspace.id);
            }
        };

        row.append(open, rename, remove);
        list.appendChild(row);
    }

    const add = document.createElement("button");
    add.className = "newWorkspace";
    add.textContent = "+ New Workspace";
    add.onclick = () => {
        const name = prompt("Workspace name", uniqueWorkspaceName("New Workspace", workspaces));
        if (name !== null && name.trim()) createWorkspace(name.trim());
    };
    list.appendChild(add);
}

document.addEventListener("click", (e) => {
    if (!workspaceSelectOpen) return;
    const menu = document.getElementById("workspaceMenu");
    if (menu && !menu.contains(e.target) && e.target.id !== "workspaceToggler") {
        setWorkspaceSelectorOpen(false);
    }
});
// end AI generated code