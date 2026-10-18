const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('spotifyBridge',{
 connect:clientId=>ipcRenderer.invoke('spotify:connect',clientId),
 disconnect:()=>ipcRenderer.invoke('spotify:disconnect'),
 state:()=>ipcRenderer.invoke('spotify:state'),
 command:(action,options)=>ipcRenderer.invoke('spotify:command',action,options),
 open:target=>ipcRenderer.invoke('spotify:open',target),
 onUpdate:callback=>{ipcRenderer.on('spotify:update',(_e,data)=>callback(data));}
});
