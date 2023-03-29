const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInIsolatedWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title)
})
