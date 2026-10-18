/* Independent delay-network reverb for devices that fail convolution processing. */
(function(root){
 function createCompatibilityReverb(ctx,input,output){
  const entry=ctx.createGain(),exit=ctx.createGain(),nodes=[entry,exit],feedbacks=[];input.connect(entry);exit.connect(output);
  function allpass(source,seconds){const delay=ctx.createDelay(.1),feedback=ctx.createGain(),direct=ctx.createGain(),delayed=ctx.createGain(),out=ctx.createGain(),g=.45;delay.delayTime.value=seconds;feedback.gain.value=g;direct.gain.value=-g;delayed.gain.value=1-g*g;source.connect(delay);delay.connect(feedback).connect(delay);source.connect(direct).connect(out);delay.connect(delayed).connect(out);nodes.push(delay,feedback,direct,delayed,out);return out;}
  const diffuseIn=ctx.createGain();nodes.push(diffuseIn);let diffuse=diffuseIn;for(const time of [.0047,.0031,.0017,.0009])diffuse=allpass(diffuse,time);diffuse.connect(exit);
  const times=[.0371,.0533,.0719,.0893,.0417,.0599,.0797,.0971];
  for(let i=0;i<times.length;i++){
   const delay=ctx.createDelay(.3),filter=ctx.createBiquadFilter(),feedback=ctx.createGain(),tap=ctx.createGain(),pan=ctx.createStereoPanner();
   delay.delayTime.value=times[i];filter.type='lowpass';filter.Q.value=.5;filter.frequency.value=4200;feedback.gain.value=0;tap.gain.value=.14;pan.pan.value=i<4?-.8:.8;
   entry.connect(delay);delay.connect(filter);filter.connect(feedback).connect(delay);filter.connect(tap).connect(pan).connect(diffuseIn);
   nodes.push(delay,filter,feedback,tap,pan);feedbacks.push({feedback,filter,time:times[i]});
  }
  return {entry,exit,setDecay(seconds,occupancy=0){const t=ctx.currentTime;for(const f of feedbacks){f.feedback.gain.setTargetAtTime(Math.min(.82,Math.pow(.001,f.time/Math.max(.2,seconds))),t,.06);f.filter.frequency.setTargetAtTime(5200-occupancy*2800,t,.06);}},disconnect(){try{input.disconnect(entry);}catch{}nodes.forEach(n=>n.disconnect());}};
 }
 function calibrateChannels(channels,target=.7){
  let energy=0;for(const ch of channels)for(const n of ch){if(!Number.isFinite(n))throw Error('Invalid reverb response.');energy+=n*n;}energy/=channels.length;
  if(energy<1e-16)throw Error('The reverb response is silent.');const gain=Math.min(16,target/Math.sqrt(energy));
  return channels.map(ch=>Float32Array.from(ch,x=>x*gain));
 }
 const api={createCompatibilityReverb,calibrateChannels};if(typeof module==='object')module.exports=api;else root.ReverbEngine=api;
})(typeof window==='undefined'?globalThis:window);
