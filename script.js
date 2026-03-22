
/* ================= DATA ================= */
const data = {
  navItems: ["Dashboard", "Tasks", "Team", "Reports"],

  stats: [
    { title: "Members", value: 15 },
    { title: "Tasks", value: 5 },
    { title: "Completed", value: 20 },
    { title: "Pending", value: 3 }
  ],

  team: [
    { name: "Rahul", role: "Dev", status: "Present" },
    { name: "Anjali", role: "Designer", status: "On Leave" },
    { name: "Aman", role: "Tester", status: "Present" },
    { name: "Priya", role: "HR", status: "On Leave" }
  ],

  activity: [
    "Task assigned",
    "Meeting done"
  ],

  tasks: [
    { name: "UI", deadline: "Today" },
    { name: "Backend", deadline: "Tomorrow" }
  ]
};


/* ================= RENDER FUNCTIONS ================= */

// Sidebar
function renderSidebar() {
  sidebar.innerHTML = data.navItems.map(i =>
    `<div class="nav-item">${i}</div>`
  ).join("");

  document.querySelectorAll(".nav-item").forEach(el => {
    el.onclick = () => {
      document.querySelectorAll(".nav-item")
        .forEach(i => i.classList.remove("active"));
      el.classList.add("active");
    };
  });
}

// Cards
function renderCards() {
  cards.innerHTML = data.stats.map(s => `
    <div class="card">
      <h3>${s.value}</h3>
      <p>${s.title}</p>
    </div>
  `).join("");
}

// Team (with attendance)
function renderTeam() {
  team.innerHTML = "<h3>Team</h3>" + data.team.map((m, i) => `
    <div class="member">
      <p>${m.name} - ${m.role}</p>

      <p class="${m.status === "Present" ? "present" : "leave"}">
        ${m.status === "Present" ? "🟢 Present" : "🔴 On Leave"}
      </p>

      <button onclick="toggleStatus(${i})">Toggle</button>
    </div>
  `).join("");
}

// Activity
function renderActivity() {
  activity.innerHTML = "<h3>Activity</h3>" +
    data.activity.map(a => `<div>${a}</div>`).join("");
}

// Tasks
function renderTasks() {
  tasks.innerHTML = "<h3>Tasks</h3>" + data.tasks.map(t => `
    <div class="${t.deadline === "Today" ? "today" : ""}">
      ${t.name} - ${t.deadline}
    </div>
  `).join("");
}


/* ================= ATTENDANCE TOGGLE ================= */

function toggleStatus(index) {
  const member = data.team[index];

  member.status = member.status === "Present"
    ? "On Leave"
    : "Present";

  renderTeam();
  showToast("Status Updated 🔄");
}


/* ================= SIDEBAR ================= */

menuBtn.onclick = () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("show");
};


/* ================= PROFILE ================= */

function toggleProfile() {
  profileDropdown.classList.toggle("show");
}

window.onclick = function (e) {
  if (!e.target.closest(".profile")) {
    profileDropdown.classList.remove("show");
  }
};


/* ================= MODAL ================= */

function openModal(id) {
  document.getElementById(id).classList.add("show");
  overlay.classList.add("show");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("show");
  overlay.classList.remove("show");
}


/* ================= TOAST ================= */

function showToast(msg) {
  toast.innerText = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


/* ================= DARK MODE ================= */

function toggleTheme() {
  document.body.classList.toggle("dark");
}


/* ================= VALIDATION ================= */

const nameInput = document.getElementById("name");
const idInput = document.getElementById("empId");
const roleInput = document.getElementById("role");
const emailInput = document.getElementById("email");

/* NAME */
nameInput.oninput = () => {
  if (!/^[a-zA-Z ]+$/.test(nameInput.value)) {
    nameError.innerText = "Only letters allowed";
    nameInput.classList.add("invalid");
  } else {
    nameError.innerText = "";
    nameInput.classList.remove("invalid");
    nameInput.classList.add("valid");
  }
};

/* ID */
idInput.oninput = () => {
  if (!/^[0-9]+$/.test(idInput.value)) {
    idError.innerText = "Only numbers allowed";
    idInput.classList.add("invalid");
  } else {
    idError.innerText = "";
    idInput.classList.remove("invalid");
    idInput.classList.add("valid");
  }
};

/* ROLE */
roleInput.oninput = () => {
  if (roleInput.value.trim() === "") {
    roleError.innerText = "Required";
    roleInput.classList.add("invalid");
  } else {
    roleError.innerText = "";
    roleInput.classList.remove("invalid");
    roleInput.classList.add("valid");
  }
};

/* EMAIL */
emailInput.oninput = () => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!pattern.test(emailInput.value)) {
    emailError.innerText = "Invalid email";
    emailInput.classList.add("invalid");
  } else {
    emailError.innerText = "";
    emailInput.classList.remove("invalid");
    emailInput.classList.add("valid");
  }
};


/* ================= FORM ================= */

function createMember(e) {
  e.preventDefault();

  if (
    document.querySelectorAll(".invalid").length > 0 ||
    !nameInput.value ||
    !idInput.value ||
    !roleInput.value ||
    !emailInput.value
  ) {
    showToast("Fix errors ❌");
    return;
  }

  data.team.push({
    name: nameInput.value,
    role: roleInput.value,
    status: "Present"
  });

  renderTeam();
  showToast("Member Added ✅");
  closeModal("memberModal");
}

function assignTask(e) {
  e.preventDefault();
  showToast("Task Assigned 🚀");
  closeModal("taskModal");
}


/* ================= INIT ================= */

renderSidebar();
renderCards();
renderTeam();
renderActivity();
renderTasks();