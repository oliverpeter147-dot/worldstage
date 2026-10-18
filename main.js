const {app,BrowserWindow,session}=require('electron');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
app.whenReady().then(()=>{
 const uiURL=pathToFileURL(path.join(__dirname,'index.html')).href;
 session.defaultSession.setPermissionRequestHandler((wc,permission,callback)=>callback(permission==='media'&&wc.getURL()===uiURL));
 const w=new BrowserWindow({width:1440,height:1020,minWidth:1040,minHeight:760,backgroundColor:'#101518',autoHideMenuBar:true,webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true}});
 w.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 w.webContents.on('will-navigate',e=>e.preventDefault());
 w.loadFile(path.join(__dirname,'index.html'));
 if(process.argv.includes('--smoke-test')) w.webContents.once('did-finish-load',async()=>{try{const result=await w.webContents.executeJavaScript('runSelfTest()',true);console.log('SELFTEST '+JSON.stringify(result));const fs=require('fs');fs.writeFileSync(path.join(app.getPath('temp'),'WorldStage-1.3-Preview.png'),(await w.webContents.capturePage()).toPNG());fs.writeFileSync(path.join(app.getPath('temp'),'WorldStage-1.3-Validation.json'),JSON.stringify(result,null,2));app.exit(result.ok?0:1);}catch(e){console.error(e);app.exit(1);}});
});
app.on('window-all-closed',()=>app.quit());
