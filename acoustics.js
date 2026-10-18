/* Geometry-inspired listening models. Dimensions below describe virtual scenes,
 * not surveyed buildings. No preset is a measured venue reconstruction. */
(function(root){
 'use strict';
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function stadiumProfile(venue={}){
  if(venue.acoustics)return venue.acoustics;
  return {length:210,width:155,height:36,roof:.3,decay:1.7,label:'Generic virtual stadium bowl'};
 }
 function stadiumParameters(venue,settings={}){
  const p=stadiumProfile(venue),seat=settings.seat||'stands',occupancy=clamp(settings.occupancy??.85,0,1),roof=clamp(settings.roof??p.roof,0,1),distance=clamp(settings.distance??.25,0,1);
  const source=[-p.length*.34,0,2.5];
  const listener=seat==='pitch'?[p.length*(-.12+.3*distance),p.width*.08,1.7]:seat==='rear'?[p.length*.3,p.width*.25,p.height*.72]:[p.length*(.02+.22*distance),p.width*.36,p.height*.3];
  const dist=(a,b)=>Math.hypot(...a.map((x,i)=>x-b[i]));
  const direct=dist(source,listener),walls=[[-p.length-source[0],source[1],source[2]],[p.length-source[0],source[1],source[2]],[source[0],-p.width-source[1],source[2]],[source[0],p.width-source[1],source[2]]];
  const paths=walls.map((image,i)=>{const reflected=dist(image,listener);return {time:Math.max(.012,(reflected-direct)/343),gain:(.24-.13*occupancy)*direct/reflected,pan:[-.8,.6,-.95,.95][i],kind:'stand'};});
  if(roof>.01){const reflected=dist([source[0],source[1],2*p.height-source[2]],listener);paths.push({time:Math.max(.009,(reflected-direct)/343),gain:roof*(.18-.055*occupancy)*direct/reflected,pan:-.12,kind:'roof'});}
  const decay=clamp((settings.decay??p.decay)*(1.24-.48*occupancy)*(.72+.72*roof),.25,9);
  return {paths,decay,roof,occupancy,direct,seat,distance,tailStart:Math.min(...paths.map(p=>p.time))+.06,tailGain:(.018+.065*roof)*(1-.55*occupancy),highDecay:.27+.27*roof};
 }
 function stadiumIR(rate,venue,settings={}){
  const p=stadiumParameters(venue,settings),length=Math.ceil(rate*Math.max(p.decay*1.2,...p.paths.map(x=>x.time+.25))),channels=[new Float32Array(length),new Float32Array(length)];
  let seed=17389;const rand=()=>{seed=(seed*16807)%2147483647;return seed/2147483647*2-1;};
  // A filtered pulse preserves stand echoes without an unnaturally bright click.
  for(const path of p.paths)for(let c=0;c<2;c++){
   const pan=Math.sqrt((1+(c?1:-1)*path.pan)/2),delay=path.time+(c?1:-1)*path.pan*.00035;
   for(let bounce=0;bounce<3;bounce++){
    const start=Math.round((delay+bounce*.017)*rate),gain=path.gain*pan*Math.pow(.3,bounce);
    for(let n=0;n<Math.ceil(rate*.006);n++){const i=start+n;if(i>=0&&i<length)channels[c][i]+=gain*Math.exp(-n/(rate*.00055))*(n===0?1:.32*rand());}
   }
  }
  // Low frequencies persist longer; open sky and an occupied bowl reduce late energy.
  for(let c=0;c<2;c++){let low=0;for(let i=Math.round(p.tailStart*rate);i<length;i++){const t=i/rate-p.tailStart,n=rand();low+=.035*(n-low);const onset=1-Math.exp(-t/.065);channels[c][i]+=p.tailGain*onset*(low*Math.exp(-6.91*t/p.decay)+n*.14*Math.exp(-6.91*t/(p.decay*p.highDecay)));}}
  return {channels,parameters:p};
 }
 function roomIR(rate,decay){const length=Math.ceil(rate*decay),channels=[new Float32Array(length),new Float32Array(length)];let seed=9271;for(let c=0;c<2;c++){const d=channels[c];let low=0;for(let i=0;i<length;i++){seed=seed*16807%2147483647;const n=seed/2147483647*2-1;low+=.12*(n-low);const t=i/rate;d[i]=(low*.7+n*.13)*Math.exp(-6.91*t/decay)*(t<.018?0:1);}for(const t of [.027,.043,.079,.113]){const i=Math.floor((t+c*.004)*rate);if(i<length)d[i]+=.35;}}return {channels};}
 const api={stadiumProfile,stadiumParameters,stadiumIR,roomIR};if(typeof module==='object')module.exports=api;else root.Acoustics=api;
})(typeof window==='undefined'?globalThis:window);
