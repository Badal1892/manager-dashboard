import { fetchDashboardData } from "./data.js";

let data = fetchDashboardData();

/* RENDER */
function renderSidebar(){
  sidebar.innerHTML=data.navItems.map(i=>`<div class='nav-item'>${i}</div>`).join("");
}

function renderCards(){
  cards.innerHTML=data.stats.map(s=>`
    <div class="card glass">
      <h3>${s.value}</h3>
      <p>${s.title}</p>
    </div>`).join("");
}

function renderTeam(){
  team.innerHTML="<h3>Team</h3>"+data.teamMembers.map((m,i)=>`
    <div class="member">
      ${m.name} - ${m.role}
      <p class="${m.status==='Present'?'present':'leave'}">
        ${m.status==='Present'?'🟢 Present':'🔴 On Leave'}
      </p>
      <button onclick="toggleStatus(${i})">Toggle</button>
    </div>`).join("");
}

function renderActivity(){
  activity.innerHTML="<h3>Activity</h3>"+data.recentActivity.map(a=>`<div>${a}</div>`).join("");
}

function renderTasks(){
  tasks.innerHTML="<h3>Tasks</h3>"+data.activeTasks.map(t=>`
    <div>${t.name} - ${t.deadline}</div>`).join("");
}

/* FUNCTIONS */
function toggleStatus(i){
  data.teamMembers[i].status =
    data.teamMembers[i].status==="Present"?"On Leave":"Present";
  renderTeam();
}

function openModal(id){
  document.getElementById(id).classList.add("show");
  overlay.classList.add("show");
}

function closeModal(id){
  document.getElementById(id).classList.remove("show");
  overlay.classList.remove("show");
}

function toggleProfile(){
  profileDropdown.classList.toggle("show");
}

window.onclick=function(e){
  if(!e.target.closest(".profile")){
    profileDropdown.classList.remove("show");
  }
};

function createMember(e){
  e.preventDefault();
  showToast("Member Added ✅");
  closeModal("memberModal");
}

function assignTask(e){
  e.preventDefault();
  showToast("Task Assigned 🚀");
  closeModal("taskModal");
}

function showToast(msg){
  toast.innerText=msg;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),3000);
}

/* GLOBAL FIX */
window.openModal=openModal;
window.closeModal=closeModal;
window.toggleStatus=toggleStatus;
window.toggleProfile=toggleProfile;
window.createMember=createMember;
window.assignTask=assignTask;

/* INIT */
renderSidebar();
renderCards();
renderTeam();
renderActivity();
renderTasks();
