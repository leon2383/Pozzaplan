
const app = document.getElementById("app");

const today = new Date();
const weekday = today.toLocaleDateString("de-DE", { weekday: "long" });
const date = today.toLocaleDateString("de-DE", {
  day: "2-digit",
  month: "long",
  year: "numeric"
});

app.innerHTML = `
<style>
*{box-sizing:border-box}
body{
  margin:0;background:#0b1119;color:#f2f5f9;
  font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif
}
button{font:inherit;cursor:pointer}
#app{min-height:100vh}
.dashboard{max-width:900px;margin:auto;padding:20px 16px 40px}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:26px}
.brand{font-size:25px;font-weight:850;color:#f97316;letter-spacing:-1px}
.brand-sub{font-size:12px;color:#94a3b8}
.avatar{width:42px;height:42px;border-radius:14px;background:#243447;display:flex;align-items:center;justify-content:center;font-weight:bold}
.welcome{background:linear-gradient(135deg,#1b2938,#17212d);padding:22px;border-radius:20px;margin-bottom:18px;border:1px solid #263546}
.welcome h1{font-size:25px;margin:8px 0}
.welcome p{margin:0;color:#a5b4c5;font-size:14px}
.date{color:#f97316;font-size:13px;font-weight:700}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px}
.stat{background:#17212d;border:1px solid #263546;border-radius:17px;padding:17px}
.stat-label{font-size:13px;color:#a5b4c5}
.stat-number{font-size:29px;font-weight:800;margin:8px 0}
.stat-note{font-size:12px;color:#94a3b8}
.orange{color:#fb923c}
.green{color:#86efac}
.section{background:#17212d;border:1px solid #263546;border-radius:18px;padding:18px;margin-bottom:18px}
.section-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:10px}
.section-head h2{margin:0;font-size:18px}
.small-btn{background:#263546;color:#fff;border:0;padding:9px 12px;border-radius:10px;font-size:13px}
.shift{background:#0e1823;border:1px solid #263546;border-radius:14px;padding:15px;margin-bottom:11px}
.shift:last-child{margin-bottom:0}
.shift-head{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
.shift-name{font-weight:700}
.shift-time{font-size:13px;color:#94a3b8;margin-top:4px}
.status{font-size:12px;font-weight:700;padding:7px 10px;border-radius:9px}
.status-ok{background:#143426;color:#86efac}
.status-open{background:#422719;color:#fdba74}
.staff{font-size:13px;color:#a5b4c5;margin-top:12px}
.week{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}
.day{background:#0e1823;border-radius:12px;padding:9px 4px;text-align:center;min-height:73px}
.day-name{font-size:11px;color:#94a3b8}
.day-num{font-weight:700;margin-top:6px}
.day-dot{width:6px;height:6px;background:#f97316;border-radius:50%;margin:6px auto 0}
.day.active{background:#f97316;color:white}
.day.active .day-name{color:white}
.day.active .day-dot{background:white}
.quick{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.quick-btn{background:#0e1823;border:1px solid #263546;color:white;border-radius:14px;padding:15px 8px;text-align:center;width:100%}
.quick-icon{font-size:22px;margin-bottom:7px}
.quick-label{font-size:12px;font-weight:700}
.bottom{display:flex;justify-content:space-around;gap:5px;padding:15px 8px;background:#17212d;border:1px solid #263546;border-radius:17px}
.bottom-item{text-align:center;font-size:12px;color:#94a3b8;text-decoration:none;flex:1}
.bottom-item span{display:block;font-size:20px;margin-bottom:5px}
.bottom-item.active{color:#fb923c}
@media(min-width:650px){
.stats{grid-template-columns:repeat(4,1fr)}
.dashboard{padding:30px}
}
</style>

<div class="dashboard">

<header class="header">
<div>
<div class="brand">🍕 PozzaPlan</div>
<div class="brand-sub">Pizzeria · Teamplanung</div>
</div>
<div class="avatar">PP</div>
</header>

<div class="welcome">
<div class="date">${weekday}, ${date}</div>
<h1>Willkommen bei PozzaPlan</h1>
<p>Hier findest du die aktuelle Übersicht deiner Pizzeria.</p>
</div>

<div class="stats">
<div class="stat">
<div class="stat-label">Heute geplant</div>
<div class="stat-number">4</div>
<div class="stat-note">Mitarbeiter</div>
</div>

<div class="stat">
<div class="stat-label">Offene Plätze</div>
<div class="stat-number orange">2</div>
<div class="stat-note">Noch zu besetzen</div>
</div>

<div class="stat">
<div class="stat-label">Diese Woche</div>
<div class="stat-number">18</div>
<div class="stat-note">Schichteinsätze</div>
</div>

<div class="stat">
<div class="stat-label">Team</div>
<div class="stat-number green" id="teamCount">0</div>
<div class="stat-note">Mitarbeiter</div>
</div>
</div>

<section class="section">
<div class="section-head">
<h2>Heutige Schichten</h2>
<button class="small-btn" onclick="location.href='./plan.html'">Tagesplan</button>
</div>

<div class="shift">
<div class="shift-head">
<div>
<div class="shift-name">☀️ Mittagsschicht</div>
<div class="shift-time">11:00 – 16:00 Uhr</div>
</div>
<div class="status status-ok">2 / 2</div>
</div>
<div class="staff">Mittagsschicht</div>
</div>

<div class="shift">
<div class="shift-head">
<div>
<div class="shift-name">🌙 Abendschicht</div>
<div class="shift-time">17:00 – 23:00 Uhr</div>
</div>
<div class="status status-open">2 / 4</div>
</div>
<div class="staff">Abendschicht</div>
</div>
</section>

<section class="section">
<div class="section-head">
<h2>Wochenübersicht</h2>
<button class="small-btn" id="weekBack">‹</button>
<button class="small-btn" id="weekForward">›</button>
</div>
<div class="week" id="weekView"></div>
</section>

<section class="section">
<div class="section-head">
<h2>Schnellzugriff</h2>
</div>

<div class="quick">
<button class="quick-btn" onclick="location.href='./plan.html'">
<div class="quick-icon">📅</div>
<div class="quick-label">Dienstplan</div>
</button>

<button class="quick-btn" onclick="location.href='./team.html'">
<div class="quick-icon">👥</div>
<div class="quick-label">Team</div>
</button>

<button class="quick-btn" onclick="location.href='./team.html'">
<div class="quick-icon">🕒</div>
<div class="quick-label">Team verwalten</div>
</button>
</div>
</section>

<nav class="bottom">
<a class="bottom-item active" href="./index.html">
<span>⌂</span>Übersicht
</a>
<a class="bottom-item" href="./plan.html">
<span>▦</span>Plan
</a>
<a class="bottom-item" href="./team.html">
<span>♙</span>Team
</a>
<a class="bottom-item" href="./team.html">
<span>⚙</span>Einstellungen
</a>
</nav>

</div>
`;

function renderWeek(offset = 0) {
  const weekView = document.getElementById("weekView");
  const base = new Date();
  base.setHours(0,0,0,0);

  const monday = new Date(base);
  const day = (base.getDay() + 6) % 7;
  monday.setDate(base.getDate() - day + offset * 7);

  const names = ["Mo","Di","Mi","Do","Fr","Sa","So"];

  weekView.innerHTML = names.map((name,i)=>{
    const d = new Date(monday);
    d.setDate(monday.getDate()+i);

    const active = d.toDateString() === base.toDateString();
    const hasShift = i !== 2 && i !== 6;

    return `
      <div class="day ${active ? "active" : ""}">
        <div class="day-name">${name}</div>
        <div class="day-num">${d.getDate()}</div>
        ${hasShift ? '<div class="day-dot"></div>' : ""}
      </div>
    `;
  }).join("");
}

let weekOffset = 0;

renderWeek();

document.getElementById("weekBack").onclick=()=>{
  weekOffset--;
  renderWeek(weekOffset);
};

document.getElementById("weekForward").onclick=()=>{
  weekOffset++;
  renderWeek(weekOffset);
};

try {
  const team = JSON.parse(localStorage.getItem("pozzaplan_team") || "[]");
  document.getElementById("teamCount").textContent = team.length;
} catch(e) {
  document.getElementById("teamCount").textContent = "0";
}
