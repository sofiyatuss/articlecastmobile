const $=id=>document.getElementById(id);
const synth=window.speechSynthesis;
let chunks=[],index=0,run=0,paused=false,timer=null,active=null;
const status=message=>{$('status').textContent=message};
function split(text,max=160){const sentences=text.replace(/\s+/g,' ').trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g)||[];const out=[];for(const s of sentences){let part='';for(const word of s.trim().split(/\s+/)){if(part&&part.length+word.length+1>max){out.push(part);part=''}part+=(part?' ':'')+word}if(part)out.push(part)}return out}
function stop(){run++;clearTimeout(timer);timer=null;active=null;paused=false;synth.cancel();index=0;status('Stopped.')}
function refreshVoices(){const selected=$('voice').value;const voices=synth.getVoices();$('voice').replaceChildren(new Option('Default device voice',''));voices.forEach((v,i)=>$('voice').add(new Option(`${v.name} (${v.lang})`,String(i))));$('voice').value=selected}
refreshVoices();if('onvoiceschanged' in synth)synth.onvoiceschanged=refreshVoices;
function speakNext(id){if(id!==run||paused)return;if(index>=chunks.length){status('Finished reading.');index=0;return}const u=new SpeechSynthesisUtterance(chunks[index]);active=u;u.rate=Number($('speed').value);const voices=synth.getVoices();const voiceIndex=$('voice').value;if(voiceIndex!=='')u.voice=voices[Number(voiceIndex)]||null;u.onend=()=>{if(id!==run)return;index++;active=null;timer=setTimeout(()=>{timer=null;speakNext(id)},160)};u.onerror=e=>{if(id===run&&!['canceled','interrupted'].includes(e.error))status(`Speech error: ${e.error}`)};synth.speak(u);status(`Reading section ${index+1} of ${chunks.length}...`)}
$('play').onclick=()=>{if(paused){paused=false;if(synth.paused){synth.resume();status('Resumed.')}else{const id=run;speakNext(id)}return}if(synth.speaking||timer)return;chunks=split($('body').value);if(!chunks.length){status('Paste article text first.');return}const id=++run;speakNext(id)};
$('pause').onclick=()=>{if(!paused&&(synth.speaking||timer)){paused=true;clearTimeout(timer);timer=null;synth.pause();status('Paused.')}};
$('stop').onclick=stop;
$('speed').oninput=()=>{$('speedValue').textContent=Number($('speed').value).toFixed(1)+'×'};
function articles(){try{return JSON.parse(localStorage.getItem('articlecast_articles')||'[]')}catch{return []}}
function refreshSaved(){const current=$('saved').value;$('saved').replaceChildren(new Option('Choose saved article...',''));articles().forEach((a,i)=>$('saved').add(new Option(a.title,String(i))));$('saved').value=current}
$('save').onclick=()=>{const title=$('title').value.trim()||'Untitled article';const body=$('body').value.trim();if(!body){status('Paste article text first.');return}const list=articles();list.unshift({title,body});try{localStorage.setItem('articlecast_articles',JSON.stringify(list.slice(0,20)));refreshSaved();status('Saved on this device.')}catch{status('Device storage is full or unavailable.')}};
$('saved').onchange=()=>{const a=articles()[Number($('saved').value)];if(!a)return;stop();$('title').value=a.title;$('body').value=a.body;status('Loaded saved article.')};
$('clear').onclick=()=>{stop();$('title').value='';$('body').value='';status('Cleared.')};
$('podcast').onclick=()=>status('AI Podcast is planned for a later version; it is not connected yet.');
$('full').onclick=()=>status('Read Aloud mode selected.');
if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('./sw.js').catch(()=>{});
