(function(){
 const get=id=>document.getElementById(id),bridge=window.spotifyBridge;
 let connected=false,busy=false,poll,nowPlaying='',failures=0;
 function message(text){get('spotifyStatus').textContent=text;}
 function controls(enabled){for(const id of ['spotifyPlay','spotifyPause','spotifyNext','spotifyPrevious','spotifyRefresh','spotifyTransfer','spotifyUriPlay','spotifyDevices'])get(id).disabled=!enabled;get('spotifyDisconnect').disabled=!enabled;}
 function disconnected(){connected=false;clearInterval(poll);controls(false);get('spotifyTrack').textContent='Not connected';get('spotifyDevices').replaceChildren(new Option('Active Spotify device',''));}
 async function run(fn){if(busy)return;busy=true;try{await fn();}catch(e){message(e.message.replace(/^Error invoking remote method '[^']+': (?:Error: )?/,''));}finally{busy=false;}}
 async function refresh(){if(!connected)return;try{const state=await bridge.state();if(!state.connected){disconnected();message('Spotify disconnected.');return;}failures=0;nowPlaying=state.trackUrl;get('spotifyTrack').textContent=state.track?state.track+' — '+state.artists+(state.isPlaying?' · Playing':' · Paused'):'No active track · start music in Spotify first';const choice=get('spotifyDevices').value;get('spotifyDevices').replaceChildren(new Option('Active Spotify device',''));for(const d of state.devices.filter(d=>d.id&&!d.isRestricted))get('spotifyDevices').append(new Option(d.name+(d.isActive?' · active':''),d.id));if([...get('spotifyDevices').options].some(o=>o.value===choice))get('spotifyDevices').value=choice;message('Connected · playback stays in Spotify. Venue effects and master volume apply to WorldStage sources only.');}catch(e){failures++;if(failures>=3)clearInterval(poll);throw e;}}
 async function command(action,uri){if(action==='play'){document.getElementById('audio').pause();if(typeof disconnectLive==='function')disconnectLive();}await bridge.command(action,{deviceId:get('spotifyDevices').value||undefined,uri});await new Promise(r=>setTimeout(r,500));await refresh();}
 get('spotifyClientId').value=localStorage.getItem('spotifyClientId')||'';controls(false);
 if(!bridge){message('Spotify controls are available in the Windows app.');get('spotifyConnect').disabled=true;return;}
 get('spotifyConnect').onclick=()=>run(async()=>{const id=get('spotifyClientId').value.trim();const result=await bridge.connect(id);disconnected();localStorage.setItem('spotifyClientId',id);message('Complete Spotify sign-in in your browser. Register callback: '+result.redirect);get('spotifyDisconnect').disabled=false;});
 get('spotifyDisconnect').onclick=()=>run(async()=>{await bridge.disconnect();disconnected();message('Disconnected. Session tokens cleared from memory.');});
 get('spotifyOpen').onclick=()=>run(()=>bridge.open('desktop'));
 get('spotifyWeb').onclick=()=>run(()=>bridge.open('web'));
 get('spotifyDashboard').onclick=()=>run(()=>bridge.open('dashboard'));
 get('spotifyRefresh').onclick=()=>run(refresh);
 for(const [id,action]of Object.entries({spotifyPlay:'play',spotifyPause:'pause',spotifyNext:'next',spotifyPrevious:'previous',spotifyTransfer:'transfer'}))get(id).onclick=()=>run(()=>command(action));
 get('spotifyUriPlay').onclick=()=>run(()=>command('play',get('spotifyUri').value));
 get('spotifyTrackLink').onclick=()=>run(()=>bridge.open(nowPlaying||'web'));
 bridge.onUpdate(data=>{if(data.error){message(data.error);if(!connected)get('spotifyDisconnect').disabled=true;return;}if(data.connected){connected=true;controls(true);failures=0;clearInterval(poll);run(refresh);poll=setInterval(()=>{if(!document.hidden&&!busy)run(refresh);},10000);}});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&connected&&!busy)run(refresh);});
})();
