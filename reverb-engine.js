/* Independent delay-network reverb for devices that fail convolution processing. */
(function(root){
 function createCompatibilityReverb(ctx,input,output){
  const entry=ctx.createGain(),exit=ctx.createGain(),nodes=[entry,exit],feedbacks=[];input.connect(entry);exit.connect(output);
  const times=[.0371,.0533,.0719,.0893,.0417,.0599,.0797,.0971];
  for(let i=0;i<times.length;i++){
   const delay=ctx.createDelay(.3),filter=ctx.createBiquadFilter(),feedback=ctx.createGain(),tap=ctx.createGain(),pan=ctx.createStereoPanner();
   delay.delayTime.value=times[i];filter.type='lowpass';filter.frequency.value=5200;tap.gain.value=.23;pan.pan.value=i<4?-.8:.8;
   entry.connect(delay);delay.connect(filter);filter.connect(feedback).connect(delay);filter.connect(tap).connect(pan).connect(exit);
   nodes.push(delay,filter,feedback,tap,pan);feedbacks.push({feedback,filter,time:times[i]});
  }
  return {entry,exit,setDecay(seconds,occupancy=0){const t=ctx.currentTime;for(const f of feedbacks){f.feedback.gain.setTargetAtTime(Math.min(.92,Math.pow(.001,f.time/Math.max(.2,seconds))),t,.06);f.filter.frequency.setTargetAtTime(6500-occupancy*3500,t,.06);}},disconnect(){try{input.disconnect(entry);}catch{}nodes.forEach(n=>n.disconnect());}};
 }
 function calibrateChannels(channels,target=.7){
  let energy=0;for(const ch of channels)for(const n of ch){if(!Number.isFinite(n))throw Error('Invalid reverb response.');energy+=n*n;}energy/=channels.length;
  if(energy<1e-16)throw Error('The reverb response is silent.');const gain=Math.min(16,target/Math.sqrt(energy));
  return channels.map(ch=>Float32Array.from(ch,x=>x*gain));
 }
 const api={createCompatibilityReverb,calibrateChannels};if(typeof module==='object')module.exports=api;else root.ReverbEngine=api;
})(typeof window==='undefined'?globalThis:window);
