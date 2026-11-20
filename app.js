const app = document.getElementById("app");

app.innerHTML = `
<style>
*{box-sizing:border-box}
body{
  margin:0;
  background:#0b1119;
  color:#f2f5f9;
  font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
}
button,input,select{font:inherit}
.container{max-width:760px;margin:auto;padding:20px 15px 40px}
header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
.logo{font-size:25px;font-weight:800;color:#f97316}
.card{background:#17212d;border:1px solid #263546;border-radius:16px;padding:18px;margin-bottom:16px}
h2{margin:0 0 14px;font-size:19px}
h3{margin:0 0 8px;font-size:16px}
.muted{color:#9baaba;font-size:14px}
button{cursor:pointer;border:0;border-radius:10px;padding:12px 16px;font-weight:700}
.primary{background:#f97316;color:white}
.secondary{background:#263546;color:white}
input,select{width:100%;background:#0b1119;color:white;border:1px solid #35485a;border-radius:10px;padding:12px;margin:7px 0}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.stat{background:#0b1119;padding:14px;border-radius:12px}
.stat strong{display:block;font-size:23px;margin-top:5px}
.item{background:#0b1119;border-radius:12px;padding:12px;margin-top:10px}
.item-top{display:flex;justify-content:space-between;gap:10px}
.delete{background:#7f1d1d;color:white;padding:8px 10px}
nav{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
nav button{background:#263546;color:white}
nav button.active{background:#f97316}
.hidden{display:none}
</style>

<div class="container">
<header>
  <div>
    <div class="logo">🍕 PozzaPlan</div>
    <div class="muted">Dein Team. Deine Planung.</div>
  </div>
</header>

<nav id="nav">
  <button class="active" data-tab="home">Übersicht</button>
  <button data-tab="members">Mitglieder</button>
  <button data-tab="events">Termine</button>
</nav>

<section id="home">
  <div class="card">
    <h2>Teamübersicht</h2>
    <div class="grid">
      <div class="stat">
        <span class="muted">Mitglieder</span>
        <strong id="memberCount">0</strong>
      </div>
      <div class="stat">
        <span class="muted">Termine</span>
        <strong id="eventCount">0</strong>
      </div>
    </div>
  </div>

  <div class="card">
    <h2>Nächste Termine</h2>
    <div id="nextEvents"></div>
  </div>
</section>

<section id="members" class="hidden">
  <div class="card">
    <h2>Mitglied hinzufügen</h2>
    <input id="memberName" placeholder="Vor- und Nachname">
    <input id="memberAmount" type="number" step="0.01" placeholder="Beitrag (€)">
    <button class="primary" id="addMember">Mitglied hinzufügen</button>
  </div>

  <div class="card">
    <h2>Mitgliederliste</h2>
    <div id="memberList"></div>
  </div>
</section>

<section id="events" class="hidden">
  <div class="card">
    <h2>Termin erstellen</h2>
    <input id="eventName" placeholder="Name des Termins">
    <input id="eventDate" type="date">
    <input id="eventLocation" placeholder="Ort">
    <button class="primary" id="addEvent">Termin speichern</button>
  </div>

  <div class="card">
    <h2>Alle Termine</h2>
    <div id="eventList"></div>
  </div>
</section>
</div>
`;

let members = JSON.parse(localStorage.getItem("pozzaplan_members") || "[]");
let events = JSON.parse(localStorage.getItem("pozzaplan_events") || "[]");

function save(){
  localStorage.setItem("pozzaplan_members",JSON.stringify(members));
  localStorage.setItem("pozzaplan_events",JSON.stringify(events));
  render();
}

function escapeHTML(value){
  return String(value).replace(/[&<>"']/g,function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
  });
}

function render(){
  document.getElementById("memberCount").textContent=members.length;
  document.getElementById("eventCount").textContent=events.length;

  document.getElementById("memberList").innerHTML=members.length
    ?members.map((m,i)=>`
      <div class="item">
        <div class="item-top">
          <div>
            <h3>${escapeHTML(m.name)}</h3>
            <div class="muted">${Number(m.amount).toFixed(2)} € Beitrag</div>
          </div>
          <button class="delete" onclick="deleteMember(${i})">Löschen</button>
        </div>
      </div>
    `).join("")
    :'<p class="muted">Noch keine Mitglieder vorhanden.</p>';

  const sorted=[...events].sort((a,b)=>a.date.localeCompare(b.date));

  document.getElementById("eventList").innerHTML=sorted.length
    ?sorted.map(e=>`
      <div class="item">
        <h3>${escapeHTML(e.name)}</h3>
        <div class="muted">${escapeHTML(e.date)} · ${escapeHTML(e.location||"Kein Ort angegeben")}</div>
        <button class="delete" onclick="deleteEvent('${e.id}')">Löschen</button>
      </div>
    `).join("")
    :'<p class="muted">Noch keine Termine vorhanden.</p>';

  const upcoming=sorted.filter(e=>e.date>=new Date().toISOString().slice(0,10));

  document.getElementById("nextEvents").innerHTML=upcoming.length
    ?upcoming.slice(0,5).map(e=>`
      <div class="item">
        <h3>${escapeHTML(e.name)}</h3>
        <div class="muted">${escapeHTML(e.date)} · ${escapeHTML(e.location||"Kein Ort angegeben")}</div>
      </div>
    `).join("")
    :'<p class="muted">Keine bevorstehenden Termine.</p>';
}

document.getElementById("addMember").onclick=function(){
  const name=document.getElementById("memberName").value.trim();
  const amount=document.getElementById("memberAmount").value;

  if(!name){
    alert("Bitte einen Namen eingeben.");
    return;
  }

  members.push({name,amount:amount||0});
  document.getElementById("memberName").value="";
  document.getElementById("memberAmount").value="";
  save();
};

document.getElementById("addEvent").onclick=function(){
  const name=document.getElementById("eventName").value.trim();
  const date=document.getElementById("eventDate").value;
  const location=document.getElementById("eventLocation").value.trim();

  if(!name||!date){
    alert("Bitte Name und Datum eingeben.");
    return;
  }

  events.push({id:Date.now().toString(),name,date,location});
  document.getElementById("eventName").value="";
  document.getElementById("eventDate").value="";
  document.getElementById("eventLocation").value="";
  save();
};

window.deleteMember=function(i){
  if(confirm("Mitglied wirklich löschen?")){
    members.splice(i,1);
    save();
  }
};

window.deleteEvent=function(id){
  if(confirm("Termin wirklich löschen?")){
    events=events.filter(e=>e.id!==id);
    save();
  }
};

document.querySelectorAll("#nav button").forEach(button=>{
  button.onclick=function(){
    document.querySelectorAll("#nav button").forEach(b=>b.classList.remove("active"));
    button.classList.add("active");

    ["home","members","events"].forEach(tab=>{
      document.getElementById(tab).classList.toggle("hidden",tab!==button.dataset.tab);
    });
  };
});

render();
