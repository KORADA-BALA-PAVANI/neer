const birthdayData = {
  friendName: "BESTIE",
  birthdayMessage: "Happy Birthday!",
  friendshipLevel: 99.9,
  letter: `My dearest bestie,

Today is your day, but somehow I feel lucky too — because life gave me a person like you.

Thank you for every stupid conversation, Evening walks , every laugh that made no sense, every little fight, and every memory that became a story we still talk about.

I hope this bday brings you peace, confidence, beautiful surprises and everything your heart quietly wishes for.

No matter how much life changes, I hope we always find our way back to the same kind of laughter.

Neer Don't Forget u have mee . Be strong and Stay happy . cheers to the bday girl

Happy Birthday, Neer. ❤️`,
  memories: [
    {image:"images/pic1.jpeg", title:"Our College Memory", text:"Close up ad tesunapudu 😁.."},
    
    {image:"images/pic3.jpeg", title:"Twinnigs Outfits", text:"A tiny moment that somehow became a huge memory.(Pic medha click chey)"},
    {image:"images/pic4.jpeg", title:"Always Us", text:"One more memory from clg days."}
  ]
};

const quizQuestions = [
  ["Who is more likely to start laughing at the worst possible moment?",["Me 😂","You 😂","Both of us","Obviously both"]],
  ["Who would survive longer without their phone?",["Me","You","Neither","Let's not test this"]],
  ["Our most travelling plan usually starts with…",["“From U”","“From Gang”","“Me”","All three"]],
  ["Who is more likely to send a random message at midnight?",["Me","You","Both","No one "]],
  ["Our friendship is basically powered by…",["Food","Gossip","Memories","Everything"]],
  ["If we get lost, who is most likely to say “I know the way”?",["Me","You","Both","Google Maps"]],
  ["Who apologizes first after a silly fight?",["Me","You","Depends","We forget why we fought"]],
  ["A perfect bestie day needs…",["Food","Long talks","Random fun","All of these"]],
  ["Our conversations usually end with…",["Good night","One last thing","More gossip","3 hours later"]],
  ["How well do you know your bestie?",["A little","Pretty well","Very well","Obviously 100%"]]
];

let currentPage = 1, quizIndex = 0, score = 0, memoryIndex = 0, choiceIndex = 0, letterOpen = false;
const totalPages = 15;
const app = document.getElementById("app");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const indicator = document.getElementById("pageIndicator");
const toast = document.getElementById("toast");

function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function imgOrPlaceholder(m){
  return `<img src="${m.image}" alt="${esc(m.title)}" onerror="this.outerHTML='<div class=&quot;placeholder-photo&quot;>Add your photo here 📷</div>'">`;
}
function shell(content, cls=""){
  return `<section class="page ${cls}"><div class="page-inner">${content}</div></section>`;
}
function render(){
  let content="", cls="";
  switch(currentPage){
    case 1:
      cls="curtain";
      content=`<div class="heart"></div><div class="eyebrow">A little surprise</div><h1>Hey Bestie...</h1><p class="script">I made something for you.</p><button class="cta" onclick="startJourney()">START THE SURPRISE ✨</button>`;
      break;
    case 2:
      content=`<div class="eyebrow">Page 02 · A little message</div><h2>Before anything else...</h2><div class="card glass"><p class="lead typewriter">Happiest Bday neer......... I hope ur doing well.Some how i found u because of Banu Sir raa ! From classmates to Besties we have a beautiful journey ✨  </p><p class="script">And I'm really glad I found you.</p></div>`;
      break;
    case 3:
      content=`<div class="eyebrow">Page 03 · Our story</div><h2>But ours...</h2><div class="card glass story-lines"><span>Classroom / Hostel Gossips</span><span>Travelling together</span><span>Pranks</span></div><div class="script">We have alot of memores from your BTech Journey raa ..</div>`; 
      break;
    case 4:
      const m=birthdayData.memories[memoryIndex];
      content=`<div class="eyebrow">Page 04 · Memory ${memoryIndex+1} / ${birthdayData.memories.length}</div><h2>Remember this?</h2><div class="memory glass" onclick="openMemory()">${imgOrPlaceholder(m)}<div style="padding:15px 5px 2px"><h3>${esc(m.title)}</h3><p class="lead">${esc(m.text)}</p></div></div><button class="cta" onclick="nextMemory()">${memoryIndex< birthdayData.memories.length-1?"NEXT MEMORY →":"CONTINUE →"}</button>`;
      break;
    case 5:
      const q=quizQuestions[quizIndex];
      content=`<div class="eyebrow">Page 05 · Fun quiz</div><h2>Okay... enough emotional stuff.</h2><p class="lead">Let's see how well you actually know your bestie!</p><div class="quiz"><div class="progress"><div style="width:${((quizIndex)/quizQuestions.length)*100}%"></div></div><strong>Question ${quizIndex+1} / ${quizQuestions.length}</strong><h3>${esc(q[0])}</h3><div class="options">${q[1].map((o,i)=>`<button class="option" onclick="answerQuiz(${i})">${esc(o)}</button>`).join("")}</div></div>`;
      break;
    case 6:
      const msg=score>=9?"Okay... you actually know me!":score>=7?"Not bad, bestie. You were paying attention!":score>=5?"We have some catching up to do 😂":"We may need a friendship training session.";
      content=`<div class="eyebrow">Page 06 · Quiz result</div><p class="script">Calculating Bestie Level...</p><div class="score">${score} / 10 💗</div><h3>${msg}</h3><p class="lead">Score saved for this little journey. The friendship itself is definitely not graded.</p><button class="cta" onclick="goNext()">SEE OUR FRIENDSHIP LEVEL →</button>`;
      break;
    case 7:
      content=`<div class="eyebrow">Page 07 · Friendship meter</div><h2>FRIENDSHIP LEVEL</h2><div id="meterNumber" class="score" style="font-size:clamp(4rem,11vw,8rem)">0%</div><div class="meter"><div id="meterFill"></div></div><p class="script">Some friendships are measured in years.<br>Ours is measured in memories.</p>`;
      break;
    case 8:
      const choices=[
        ["Late-night talks 🌙","Random calls 📞"],
        ["Food together 🍕","Movies together 🎬"],
        ["Laughing for no reason 😂","Deep conversations ❤️"]
      ];
      const c=choices[choiceIndex];
      content=`<div class="eyebrow">Page 08 · This or that</div><h2>One more game...</h2><div class="choice-wrap"><button class="choice" onclick="chooseThis('${encodeURIComponent(c[0])}')">${c[0]}</button><div class="vs">VS</div><button class="choice" onclick="chooseThis('${encodeURIComponent(c[1])}')">${c[1]}</button></div><p class="lead">${choiceIndex+1} / ${choices.length}</p>`;
      if(choiceIndex>=choices.length) content=`<div class="eyebrow">Page 08 · This or that</div><h2>Yep... that sounds exactly like us.</h2><p class="script">No further evidence required. 💗</p>`;
      break;
    case 9:
      content=`<div class="eyebrow">Page 09 · A serious question</div><h2>One serious question...</h2><p class="lead">If we could go back and relive just ONE day together, which day would you choose?</p><textarea id="memoryAnswer" placeholder="Write the day or memory here naku msg chey adhe ento neer ..."></textarea><button class="cta" onclick="saveAnswer()">SAVE THIS MEMORY ❤️</button>`;
      break;
    case 10:
      content=letterOpen?`<div class="eyebrow">Page 10 · The letter</div><div class="letter"><div class="script" style="color:#b55b83;font-size:2.6rem">For you, ${esc(birthdayData.friendName)}...</div><div style="white-space:pre-line">${esc(birthdayData.letter)}</div></div>`:
      `<div class="eyebrow">Page 10 · Something I don't say often</div><h2>I have something I don't say often...</h2><div class="envelope" onclick="openLetter()"></div><button class="cta" onclick="openLetter()">OPEN THE LETTER 💌</button>`;
      break;
    case 11:
      const photos=birthdayData.memories.slice(0,4);
      content=`<div class="eyebrow">Page 11 · Photo wall</div><h2>A few pieces of our chaos...</h2><div class="polaroids">${photos.map((m,i)=>`<div class="polaroid p${i+1}" onclick="openSpecific('${m.image}')">${imgOrPlaceholder(m)}<div style="font-family:Parisienne;font-size:1.2rem;margin-top:7px">${esc(m.title)}</div></div>`).join("")}</div>`;
      break;
    case 12:
      content=`<div class="eyebrow">Page 12 · The final surprise</div><h2>And finally...</h2><p class="lead">There's one thing I really want you to know.</p><button class="cta" onclick="goNext()">ONE LAST CLICK ✨</button>`;
      break;
    case 13:
      cls="final";
      content=`<div class="firework" style="left:20%;top:25%"></div><div class="firework" style="right:22%;top:35%;animation-delay:.4s"></div><div class="firework" style="left:50%;top:15%;animation-delay:.8s"></div><div class="balloons">🎈 ✨ 🎈</div><div class="eyebrow">Page 13 · The big reveal</div><h1>HAPPY BIRTHDAY,<br>${esc(birthdayData.friendName)} 🎂💗</h1><p class="lead">${esc(birthdayData.birthdayMessage)}</p><div class="script">Today is all about you.</div>`;
      break;
    case 14:
      content=`<div class="eyebrow">Page 14 · From my heart</div><p class="script">Thank you for being there.</p><div class="card glass story-lines"><span>For the stupid conversations.</span><span>The random calls. The fights. The laughter.</span><span>The memories. And all the moments in between.</span></div><h3>Life may change a lot...</h3><h3>But I hope our friendship never becomes just a memory.</h3><h2>Happy Birthday, Bestie. ❤️</h2>`;
      break;
    case 15:
      content=`<div class="eyebrow">Page 15 · The end... or is it?</div><h2>Our story doesn't end here.</h2><p class="lead">This is just another memory we're adding to it.</p><button class="cta" onclick="restart()">START THE JOURNEY AGAIN 🔄</button>`;
      break;
  }
  app.innerHTML=shell(content,cls);
  indicator.textContent=`${String(currentPage).padStart(2,"0")} / ${String(totalPages).padStart(2,"0")}`;
  backBtn.style.display=currentPage===1?"none":"block";
  nextBtn.style.display=[1,4,5,6,8,9,10,12,15].includes(currentPage)?"none":"block";
  if(currentPage===7) animateMeter();
  if(currentPage===1) startParticles();
}

function transition(fn){
  const old=app.firstElementChild;
  old?.classList.add("fade-out");
  setTimeout(()=>{fn();render()},300);
}
function goNext(){ if(currentPage<totalPages) transition(()=>currentPage++); }
function goBack(){ if(currentPage>1) transition(()=>currentPage--); }
function startJourney(){transition(()=>currentPage=2)}
function restart(){score=0;quizIndex=0;memoryIndex=0;choiceIndex=0;letterOpen=false;transition(()=>currentPage=1)}
nextBtn.onclick=goNext;backBtn.onclick=goBack;

function nextMemory(){
  if(memoryIndex< birthdayData.memories.length-1){memoryIndex++;render()}else{memoryIndex=0;goNext()}
}
function answerQuiz(i){
  const correct=[3,1,2,2,4,4,4,4,3,4];
  if(i===correct[quizIndex]) score++;
  toastMsg(i===correct[quizIndex]?"Bestie points! 💗":"Hmm... I'll let that one slide 😂");
  setTimeout(()=>{if(quizIndex<quizQuestions.length-1){quizIndex++;render()}else{currentPage=6;render();burstConfetti()}},550);
}
function animateMeter(){
  const target=Number(birthdayData.friendshipLevel)||99.9, n=document.getElementById("meterNumber"), f=document.getElementById("meterFill");
  let start=0; f.style.width="0%";
  const t0=performance.now();
  function step(t){const p=Math.min(1,(t-t0)/2500),e=1-Math.pow(1-p,3),v=start+(target-start)*e;n.textContent=v.toFixed(1)+"%";f.style.width=v+"%";if(p<1)requestAnimationFrame(step)}
  requestAnimationFrame(step);
}
function chooseThis(){choiceIndex++; if(choiceIndex>=3){choiceIndex=3;render()}else render()}
function saveAnswer(){const a=document.getElementById("memoryAnswer")?.value.trim();if(!a){toastMsg("Write a little memory first 💗");return}localStorage.setItem("bestieMemoryAnswer",a);toastMsg("I'll remember that. ❤️");setTimeout(goNext,800)}
function openLetter(){letterOpen=true;render();burstConfetti(25)}
function openMemory(){const m=birthdayData.memories[memoryIndex];openSpecific(m.image)}
function openSpecific(src){const lb=document.getElementById("lightbox"),im=document.getElementById("lightboxImg");im.src=src;lb.classList.add("show");lb.setAttribute("aria-hidden","false")}
document.getElementById("closeLightbox").onclick=()=>{document.getElementById("lightbox").classList.remove("show")}
document.getElementById("lightbox").onclick=e=>{if(e.target.id==="lightbox")e.currentTarget.classList.remove("show")}
function toastMsg(s){toast.textContent=s;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1200)}
function startParticles(){if(document.querySelector(".particle"))return;const box=document.getElementById("particles");for(let i=0;i<45;i++){const p=document.createElement("i");p.className="particle";p.style.left=Math.random()*100+"%";p.style.animationDelay=Math.random()*7+"s";p.style.animationDuration=5+Math.random()*7+"s";box.appendChild(p)}}
function burstConfetti(count=90){const box=document.getElementById("confetti");for(let i=0;i<count;i++){const c=document.createElement("i");c.style.position="absolute";c.style.left=Math.random()*100+"%";c.style.top="-5%";c.style.width=5+Math.random()*7+"px";c.style.height=9+Math.random()*10+"px";c.style.background=["#f6a8c8","#bda9ff","#e9c98b","#fff"][i%4];c.style.transform=`rotate(${Math.random()*360}deg)`;c.style.animation=`fall ${2+Math.random()*2}s linear forwards`;box.appendChild(c);setTimeout(()=>c.remove(),4500)}}
const style=document.createElement("style");style.textContent="@keyframes fall{to{transform:translate3d("+ (Math.random()*100-50)+"px,110vh,0) rotate(720deg);opacity:0}}";document.head.appendChild(style);
document.addEventListener("keydown",e=>{if(e.key==="ArrowRight")goNext();if(e.key==="ArrowLeft")goBack();if(e.key==="Escape")document.getElementById("lightbox").classList.remove("show")});
render();
