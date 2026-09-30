function getRole()     { return localStorage.getItem("role") || "teacher"; }
function getLoggedId() { return parseInt(localStorage.getItem("loggedId") || "0"); }

const students = [
  { id:1, name:"Harshitha R", roll:"CST001", group:"CST-A", present:22, absent:3,  leave:1, total:26, parent:"Mrs. Radha",    email:"radha@gmail.com",    phone:"9876543210" },
  { id:2, name:"Arjun K",     roll:"CST002", group:"CST-A", present:18, absent:7,  leave:1, total:26, parent:"Mr. Kumar",     email:"kumar@gmail.com",    phone:"9876543211" },
  { id:3, name:"Priya S",     roll:"CST003", group:"CST-B", present:25, absent:1,  leave:0, total:26, parent:"Mrs. Sunita",   email:"sunita@gmail.com",   phone:"9876543212" },
  { id:4, name:"Rahul M",     roll:"CST004", group:"CST-B", present:15, absent:10, leave:1, total:26, parent:"Mr. Mohan",     email:"mohan@gmail.com",    phone:"9876543213" },
  { id:5, name:"Divya T",     roll:"CST005", group:"CST-A", present:24, absent:2,  leave:0, total:26, parent:"Mrs. Thara",    email:"thara@gmail.com",    phone:"9876543214" },
  { id:6, name:"Karthik B",   roll:"CST006", group:"CST-C", present:20, absent:5,  leave:1, total:26, parent:"Mr. Balu",      email:"balu@gmail.com",     phone:"9876543215" },
  { id:7, name:"Sneha P",     roll:"CST007", group:"CST-C", present:19, absent:6,  leave:1, total:26, parent:"Mrs. Parvathi", email:"parvathi@gmail.com", phone:"9876543216" },
  { id:8, name:"Vikram N",    roll:"CST008", group:"CST-A", present:26, absent:0,  leave:0, total:26, parent:"Mr. Nair",      email:"nair@gmail.com",     phone:"9876543217" },
];

// ── LEAVE REQUESTS — localStorage so ALL pages share the same data ────
const LK = "att_leaves";

function getLeaveRequests() {
  const raw = localStorage.getItem(LK);
  if (raw) return JSON.parse(raw);
  const seed = [
    { id:1, studentId:2, roll:"CST002", name:"Arjun K",  group:"CST-A", type:"Medical Leave",  reason:"Fever and cold",                       date:"2025-06-10", status:"pending"  },
    { id:2, studentId:4, roll:"CST004", name:"Rahul M",  group:"CST-B", type:"College Event",  reason:"Inter-college tech fest participation", date:"2025-06-12", status:"pending"  },
    { id:3, studentId:7, roll:"CST007", name:"Sneha P",  group:"CST-C", type:"Personal Leave", reason:"Family function",                       date:"2025-06-08", status:"approved" },
  ];
  localStorage.setItem(LK, JSON.stringify(seed));
  return seed;
}

function saveLeaveRequests(list) {
  localStorage.setItem(LK, JSON.stringify(list));
}

function addLeaveRequest(req) {
  const list = getLeaveRequests();
  req.id = list.length ? Math.max(...list.map(r => r.id)) + 1 : 1;
  list.push(req);
  saveLeaveRequests(list);
}

function updateLeaveStatus(id, status) {
  const list = getLeaveRequests();
  const req  = list.find(r => r.id === id);
  if (req) { req.status = status; saveLeaveRequests(list); }
  return req;
}

function getPct(s)        { return s.total === 0 ? 0 : Math.round((s.present / s.total) * 100); }
function getBarClass(pct) { return pct >= 85 ? "high" : pct >= 75 ? "mid" : "low"; }

function showToast(msg) {
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

function sidebarActive() {
  const page = window.location.pathname.split("/").pop();
  document.querySelectorAll(".sidebar nav a").forEach(a => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", sidebarActive);
