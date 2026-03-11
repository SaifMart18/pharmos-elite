const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  printReceipt: (data) => ipcRenderer.invoke('print-receipt', data),
  onBarcodeScanned: (callback) => ipcRenderer.on('barcode-received', (event, value) => callback(value)),
});
