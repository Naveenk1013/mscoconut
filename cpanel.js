/* ============================================================
   MS Coconut Wholesale — CPanel eManager
   All data stays on device: stored in & loaded from CSV only.
   ============================================================ */

"use strict";

const DEFAULT_PIN    = "1234";
const RATES = { tender: 45, puja: 35 };

// Supabase Configuration
const SUPABASE_URL = "https://qlxtdsoawcidauruyvzy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFseHRkc29hd2NpZGF1cnV5dnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMTg2NzksImV4cCI6MjA4ODU5NDY3OX0.xGv2itUtFZ7klaDhVgNcjg0kWg3gl1OtX0w_QTQWDZc";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── i18n DICTIONARY ──────────────────────────────────────────
const cpI18n = {
  hi: {
    "auth.step1label":   "चरण 1 / 2",
    "auth.step1title":   "अपना PIN दर्ज करें",
    "auth.step1hint":    "जारी रखने के लिए अपना 4-अंकीय PIN दर्ज करें।",
    "auth.continue":     "आगे बढ़ें",
    "auth.wrongPin":     "गलत PIN। कृपया पुनः प्रयास करें।",
    "auth.firstUseNote": "पहली बार? डिफ़ॉल्ट PIN <strong>1234</strong> है। Settings में बदलें।",
    "auth.step2label":   "चरण 2 / 2",
    "auth.step2title":   "डेटा फ़ाइल अपलोड करें",
    "auth.step2hint":    "अपनी <strong>mswholesaledatadonotdelete.csv</strong> फ़ाइल अपलोड करें।",
    "auth.fileDrop":     "<strong>क्लिक करें या खींचें</strong> अपनी डेटा फ़ाइल यहाँ",
    "auth.fileFormat":   "केवल mswholesaledatadonotdelete.csv स्वीकार",
    "auth.unlock":       "पैनल खोलें",
    "auth.firstUse":     "पहली बार — मेरी डेटा फ़ाइल बनाएँ",
    "brand.name":        "MS Coconut",
    "brand.sub":         "eManager Panel",
    "nav.section.main":  "मुख्य",
    "nav.section.analysis": "विश्लेषण",
    "nav.section.account": "खाता",
    "nav.dashboard":     "डैशबोर्ड",
    "nav.orders":        "ऑर्डर",
    "nav.inventory":     "स्टॉक",
    "nav.reports":       "रिपोर्ट",
    "nav.settings":      "सेटिंग्स",
    "stat.totalOrders":  "कुल ऑर्डर",
    "stat.allTime":      "अब तक",
    "stat.todayRevenue": "आज की आय",
    "stat.orders":       "ऑर्डर",
    "stat.monthRevenue": "इस महीने",
    "stat.pending":      "लंबित ऑर्डर",
    "stat.awaitDelivery":"डिलीवरी बाकी",
    "chart.last7Days":   "आय — पिछले 7 दिन",
    "chart.productSplit":"उत्पाद विभाजन",
    "table.recentOrders":"हाल के ऑर्डर",
    "col.date":          "तारीख",
    "col.customer":      "ग्राहक",
    "col.mobile":        "मोबाइल",
    "col.product":       "उत्पाद",
    "col.qty":           "मात्रा",
    "col.rate":          "दर",
    "col.total":         "कुल",
    "col.status":        "स्थिति",
    "col.actions":       "क्रियाएँ",
    "col.orders":        "ऑर्डर",
    "col.revenue":       "आय",
    "col.month":         "माह",
    "report.daily":      "दैनिक सारांश",
    "report.monthly":    "मासिक सारांश",
    "report.productSales": "उत्पाद बिक्री सारांश",
    "settings.security": "सुरक्षा",
    "settings.changePin":"PIN बदलें",
    "settings.changePinDesc": "अपना 4-अंकीय PIN अपडेट करें",
    "settings.data":     "डेटा प्रबंधन",
    "settings.exportBackup": "बैकअप निर्यात करें",
    "settings.exportBackupDesc": "वर्तमान डेटा CSV के रूप में डाउनलोड करें",
    "settings.resetData":"सारा डेटा रीसेट करें",
    "settings.resetDataDesc": "सभी ऑर्डर और स्टॉक डेटा स्थायी रूप से हटाएँ",
    "settings.business": "व्यवसाय जानकारी",
    "modal.addOrder":    "नया ऑर्डर जोड़ें",
    "modal.editOrder":   "ऑर्डर संपादित करें",
    "modal.changePin":   "PIN बदलें",
    "modal.confirmReset":"रीसेट की पुष्टि करें",
    "modal.resetWarning":"क्या आप सुनिश्चित हैं? यह सारे ऑर्डर और स्टॉक डेटा हटा देगा। यह पूर्ववत नहीं होगा।",
    "field.customerName":"ग्राहक का नाम",
    "field.mobile":      "मोबाइल",
    "field.product":     "उत्पाद",
    "field.quantity":    "मात्रा (पीस)",
    "field.rate":        "दर (रु/पीस)",
    "field.total":       "कुल (स्वचालित)",
    "field.date":        "तारीख",
    "field.status":      "स्थिति",
    "field.address":     "डिलीवरी पता",
    "field.notes":       "नोट्स (वैकल्पिक)",
    "field.bizName":     "व्यवसाय का नाम",
    "field.phone":       "फ़ोन",
    "field.email":       "ईमेल",
    "field.oldPin":      "वर्तमान PIN",
    "field.newPin":      "नया PIN",
    "btn.addOrder":      "नया ऑर्डर",
    "btn.viewAll":       "सभी देखें",
    "btn.save":          "सहेजें",
    "btn.saveExport":    "सहेजें & निर्यात",
    "btn.cancel":        "रद्द करें",
    "btn.confirm":       "पुष्टि करें",
    "btn.change":        "बदलें",
    "btn.export":        "निर्यात",
    "btn.reset":         "रीसेट",
    "btn.confirmReset":  "हाँ, सब हटाएँ",
    "btn.logout":        "लॉगआउट",
    "unsaved.msg":       "आपके पास सहेजे न गए बदलाव हैं।",
    "search.placeholder":"नाम, मोबाइल या उत्पाद खोजें...",
    "inv.tender":        "कच्चा नारियल (Tender)",
    "inv.puja":          "पूजा नारियल (Puja)",
    "inv.stock":         "स्टॉक में",
    "inv.add":           "जोड़ें",
    "inv.sub":           "घटाएँ",
    "inv.low":           "कम स्टॉक",
    "status.pending":    "लंबित",
    "status.delivered":  "डिलीवर",
    "status.cancelled":  "रद्द",
    "toast.saved":       "डेटा सफलतापूर्वक सहेजा गया!",
    "toast.orderAdded":  "ऑर्डर जोड़ा गया!",
    "toast.orderUpdated":"ऑर्डर अपडेट किया गया!",
    "toast.orderDeleted":"ऑर्डर हटाया गया!",
    "toast.pinChanged":  "PIN सफलतापूर्वक बदला गया!",
    "toast.reset":       "सारा डेटा रीसेट कर दिया गया।",
    "toast.wrongOldPin": "गलत वर्तमान PIN।",
  },
  en: {
    "auth.step1label":   "Step 1 of 2",
    "auth.step1title":   "Enter Your PIN",
    "auth.step1hint":    "Enter your 4-digit security PIN to continue.",
    "auth.continue":     "Continue",
    "auth.wrongPin":     "Incorrect PIN. Please try again.",
    "auth.firstUseNote": "First time? Default PIN is <strong>1234</strong>. Change it in Settings.",
    "auth.step2label":   "Step 2 of 2",
    "auth.step2title":   "Upload Your Data File",
    "auth.step2hint":    "Upload your <strong>mswholesaledatadonotdelete.csv</strong> file to load your business data.",
    "auth.fileDrop":     "<strong>Click or drag</strong> your data file here",
    "auth.fileFormat":   "Accepted: mswholesaledatadonotdelete.csv only",
    "auth.unlock":       "Unlock Panel",
    "auth.firstUse":     "First time — Generate My Data File",
    "brand.name":        "MS Coconut",
    "brand.sub":         "eManager Panel",
    "nav.section.main":  "Main",
    "nav.section.analysis": "Analysis",
    "nav.section.account": "Account",
    "nav.dashboard":     "Dashboard",
    "nav.orders":        "Orders",
    "nav.inventory":     "Inventory",
    "nav.reports":       "Reports",
    "nav.settings":      "Settings",
    "stat.totalOrders":  "Total Orders",
    "stat.allTime":      "All time",
    "stat.todayRevenue": "Today's Revenue",
    "stat.orders":       "orders",
    "stat.monthRevenue": "This Month",
    "stat.pending":      "Pending Orders",
    "stat.awaitDelivery":"Awaiting delivery",
    "chart.last7Days":   "Revenue — Last 7 Days",
    "chart.productSplit":"Product Split",
    "table.recentOrders":"Recent Orders",
    "col.date":          "Date",
    "col.customer":      "Customer",
    "col.mobile":        "Mobile",
    "col.product":       "Product",
    "col.qty":           "Qty",
    "col.rate":          "Rate",
    "col.total":         "Total",
    "col.status":        "Status",
    "col.actions":       "Actions",
    "col.orders":        "Orders",
    "col.revenue":       "Revenue",
    "col.month":         "Month",
    "report.daily":      "Daily Breakdown",
    "report.monthly":    "Monthly Breakdown",
    "report.productSales": "Product Sales Summary",
    "settings.security": "Security",
    "settings.changePin":"Change PIN",
    "settings.changePinDesc": "Update your 4-digit security PIN",
    "settings.data":     "Data Management",
    "settings.exportBackup": "Export Backup",
    "settings.exportBackupDesc": "Download current data as CSV file",
    "settings.resetData":"Reset All Data",
    "settings.resetDataDesc": "Permanently delete all orders and inventory records",
    "settings.business": "Business Info",
    "modal.addOrder":    "Add New Order",
    "modal.editOrder":   "Edit Order",
    "modal.changePin":   "Change PIN",
    "modal.confirmReset":"Confirm Reset",
    "modal.resetWarning":"Are you sure? This will permanently delete ALL orders and inventory data. This action cannot be undone.",
    "field.customerName":"Customer Name",
    "field.mobile":      "Mobile",
    "field.product":     "Product",
    "field.quantity":    "Quantity (pcs)",
    "field.rate":        "Rate (Rs/pc)",
    "field.total":       "Total (Auto)",
    "field.date":        "Date",
    "field.status":      "Status",
    "field.address":     "Delivery Address",
    "field.notes":       "Notes (optional)",
    "field.bizName":     "Business Name",
    "field.phone":       "Phone",
    "field.email":       "Email",
    "field.oldPin":      "Current PIN",
    "field.newPin":      "New PIN",
    "btn.addOrder":      "New Order",
    "btn.viewAll":       "View All",
    "btn.save":          "Save",
    "btn.saveExport":    "Save & Export",
    "btn.cancel":        "Cancel",
    "btn.confirm":       "Confirm",
    "btn.change":        "Change",
    "btn.export":        "Export",
    "btn.reset":         "Reset",
    "btn.confirmReset":  "Yes, Reset Everything",
    "btn.logout":        "Logout",
    "unsaved.msg":       "You have unsaved changes.",
    "search.placeholder":"Search by name, mobile or product...",
    "inv.tender":        "Tender Coconut (कच्चा)",
    "inv.puja":          "Puja Coconut (पूजा)",
    "inv.stock":         "In Stock",
    "inv.add":           "Add",
    "inv.sub":           "Subtract",
    "inv.low":           "Low Stock",
    "status.pending":    "Pending",
    "status.delivered":  "Delivered",
    "status.cancelled":  "Cancelled",
    "toast.saved":       "Data saved to cloud!",
    "toast.orderAdded":  "Order added to cloud!",
    "toast.orderUpdated":"Order updated!",
    "toast.orderDeleted":"Order deleted!",
    "toast.pinChanged":  "PIN changed successfully!",
    "toast.reset":       "All data has been wiped from cloud.",
    "toast.wrongOldPin": "Incorrect current PIN.",
  }
};

// ─── STATE ────────────────────────────────────────────────────
let state = {
  lang: localStorage.getItem("cpanel_lang") || "hi",
  theme: localStorage.getItem("cpanel_theme") || "dark",
  orders: [],
  inventory: { tender: 0, puja: 0 },
  settings: {
    bizName: "MS Coconut Wholesale",
    phone: "+91 62024 32875",
    email: "mscoconutwholesale@gmail.com"
  },
  editingOrderId: null,
  unsaved: false,
  charts: {}
};

// ─── DB OPERATIONS ───────────────────────────────────────────
async function fetchAllData() {
  try {
    // Fetch Orders
    const { data: ords, error: e1 } = await supabaseClient.from('orders').select('*').order('created_at', { ascending: false });
    if (e1) throw e1;
    state.orders = (ords || []).map(o => ({
      ...o,
      date: o.date || (o.created_at ? o.created_at.split('T')[0] : todayISO())
    }));

    // Fetch Inventory (graceful fallback)
    const { data: inv, error: e2 } = await supabaseClient.from('inventory').select('*').eq('id', 1).single();
    if (!e2 && inv) {
      state.inventory = { tender: inv.tender || 0, puja: inv.puja || 0 };
    }

    // Fetch Settings (graceful fallback)
    const { data: sett, error: e3 } = await supabaseClient.from('settings').select('*').eq('id', 1).single();
    if (!e3 && sett) {
      state.settings = { bizName: sett.biz_name, phone: sett.phone, email: sett.email };
    }
    
    return true;
  } catch (e) {
    console.error("Fetch Data Error:", e);
    showToast("Error connecting to database.", "danger");
    return false;
  }
}

async function syncInventory() {
  await supabaseClient.from('inventory').update({ 
    tender: state.inventory.tender, 
    puja: state.inventory.puja 
  }).eq('id', 1);
}

async function syncSettings() {
  await supabaseClient.from('settings').update({
    biz_name: state.settings.bizName,
    phone: state.settings.phone,
    email: state.settings.email
  }).eq('id', 1);
}

// ─── HELPERS ──────────────────────────────────────────────────
function t(key) {
  return cpI18n[state.lang][key] || cpI18n.en[key] || key;
}

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function formatDate(isoStr) {
  if (!isoStr) return "—";
  const d = new Date(isoStr);
  return d.toLocaleDateString(state.lang === "hi" ? "hi-IN" : "en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function thisMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
}

function formatRs(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

function productLabel(val) {
  return val === "tender" ? "Tender Coconut" : "Puja Coconut";
}

// ─── i18n APPLY ───────────────────────────────────────────────
function applyI18n() {
  document.querySelectorAll("[data-cp-i18n]").forEach(el => {
    const key = el.getAttribute("data-cp-i18n");
    const val = t(key);
    if (val) el.innerHTML = val;
  });
  document.querySelectorAll("[data-cp-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-cp-i18n-placeholder");
    el.placeholder = t(key);
  });
}

// ─── THEME ─────────────────────────────────────────────────────
function applyTheme(th) {
  state.theme = th;
  document.documentElement.setAttribute("data-theme", th);
  localStorage.setItem("cpanel_theme", th);
  const icon = document.getElementById("themeTogglePanel");
  if (icon) icon.innerHTML = th === "dark" ? '<i class="ph ph-moon"></i>' : '<i class="ph ph-sun"></i>';
}

document.addEventListener("DOMContentLoaded", async () => {
  // Init defaults
  const savedTheme = localStorage.getItem("cpanel_theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(savedTheme);
  applyI18n();
  
  // Check for Supabase Auth session
  const { data: { session } } = await supabaseClient.auth.getSession();
  
  if (session) {
    const ok = await fetchAllData();
    if (ok) {
      launchApp();
      return;
    }
  }

  initAuth();
});

// ─── TOAST ───────────────────────────────────────────────────
function showToast(message, type = "success") {
  const area = document.getElementById("toastArea");
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  const icons = { success: "check-circle", info: "info", danger: "warning-circle" };
  el.innerHTML = `<i class="ph ph-${icons[type] || "check-circle"}"></i> ${message}`;
  area.appendChild(el);
  setTimeout(() => {
    el.classList.add("hiding");
    setTimeout(() => el.remove(), 350);
  }, 3000);
}

// ─── AUTH MODULE ─────────────────────────────────────────────
function initAuth() {
  const loginEmail = document.getElementById("loginEmail");
  const loginPass = document.getElementById("loginPassword");
  const btnLogin = document.getElementById("btnLoginSubmit");
  const errEl = document.getElementById("loginError");
  const errMsg = document.getElementById("loginErrorMsg");

  btnLogin.addEventListener("click", async () => {
    const email = loginEmail.value.trim();
    const password = loginPass.value;

    if (!email || !password) {
      errEl.classList.add("show");
      errMsg.textContent = "Please enter both email and password.";
      return;
    }

    btnLogin.disabled = true;
    btnLogin.innerHTML = '<i class="ph ph-circle-notch ph-spin"></i> Signing in...';

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
      errEl.classList.add("show");
      errMsg.textContent = error.message;
      btnLogin.disabled = false;
      btnLogin.innerHTML = '<i class="ph ph-sign-in"></i> Sign In';
    } else {
      errEl.classList.remove("show");
      const ok = await fetchAllData();
      if (ok) {
        launchApp();
      } else {
        btnLogin.disabled = false;
        btnLogin.innerHTML = '<i class="ph ph-sign-in"></i> Sign In';
      }
    }
  });
}

// Support functions for downloading CSV (legacy export only)
async function generateAndDownloadCSV() {
  const { data: orders } = await supabaseClient.from('orders').select('*');
  const csvRows = ["id,customer_name,customer_mobile,product,quantity,rate,total,address,status,created_at"];
  orders.forEach(o => {
    csvRows.push([o.id, o.customer_name, o.customer_mobile, o.product, o.quantity, o.rate, o.total, `"${o.address}"`, o.status, o.created_at].join(","));
  });
  const csvText = csvRows.join("\n");
  const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `orders_backup_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Backup downloaded!");
}

// ─── LAUNCH APP ───────────────────────────────────────────────
function launchApp() {
  document.getElementById("authScreen").style.display = "none";
  const shell = document.getElementById("appShell");
  shell.classList.add("visible");

  // Wire sidebar + topbar after DOM visible
  initSidebar();
  initTopbar();
  initOrderForm();
  initResetModal();
  initInventoryPanel();
  initSettings();

  renderAll();
  applyI18n();
}

// ─── SIDEBAR ──────────────────────────────────────────────────
function initSidebar() {
  document.querySelectorAll(".sidebar-link[data-panel]").forEach(link => {
    link.addEventListener("click", () => {
      const panel = link.getAttribute("data-panel");
      switchPanel(panel);
      closeSidebar();
    });
  });

  document.getElementById("mobileSidebarToggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("sidebarOverlay").classList.toggle("open");
  });

  document.getElementById("sidebarOverlay").addEventListener("click", closeSidebar);

  document.getElementById("btnLogout").addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    location.reload();
  });
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebarOverlay").classList.remove("open");
}

window.switchPanel = function(name) {
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".sidebar-link").forEach(l => l.classList.remove("active"));
  document.getElementById(`panel${name.charAt(0).toUpperCase()+name.slice(1)}`).classList.add("active");
  document.querySelector(`.sidebar-link[data-panel="${name}"]`).classList.add("active");
  const titleKey = `nav.${name}`;
  document.getElementById("topbarTitle").innerHTML = t(titleKey);

  if (name === "dashboard") renderDashboard();
  if (name === "orders") renderOrdersTable();
  if (name === "inventory") renderInventory();
  if (name === "reports") renderReports();
};

// ─── TOPBAR ───────────────────────────────────────────────────
function initTopbar() {
  document.getElementById("themeTogglePanel").addEventListener("click", () => {
    applyTheme(state.theme === "dark" ? "light" : "dark");
  });

  document.getElementById("langTogglePanel").addEventListener("click", () => {
    state.lang = state.lang === "hi" ? "en" : "hi";
    localStorage.setItem("cpanel_lang", state.lang);
    applyI18n();
    renderAll();
  });

  document.getElementById("btnAddOrderTop").addEventListener("click", openAddOrderModal);
  document.getElementById("btnAddOrderPanel").addEventListener("click", openAddOrderModal);
}

// ─── UNSAVED STATE ────────────────────────────────────────────
function setUnsaved(val) {
  state.unsaved = val;
  const bar = document.getElementById("unsavedBar");
  bar ? (val ? bar.classList.add("visible") : bar.classList.remove("visible")) : null;
}

window.addEventListener("beforeunload", e => {
  // Persistence handled by DB
});

// ─── RENDER ALL ───────────────────────────────────────────────
function renderAll() {
  renderDashboard();
  renderOrdersTable();
  renderInventory();
  renderReports();
}

// ─── DASHBOARD ────────────────────────────────────────────────
function renderDashboard() {
  const today = todayISO();
  const monthKey = thisMonthKey();

  const delivered = state.orders.filter(o => o.status !== "cancelled");
  const todayOrders = delivered.filter(o => o.date === today);
  const monthOrders = delivered.filter(o => o.date && o.date.startsWith(monthKey));
  const pending = state.orders.filter(o => o.status === "pending");

  document.getElementById("statTotalOrders").textContent = state.orders.length;
  document.getElementById("statToday").textContent = formatRs(todayOrders.reduce((s, o) => s + o.total, 0));
  document.getElementById("statTodayCount").innerHTML = `${todayOrders.length} <span data-cp-i18n="stat.orders">${t("stat.orders")}</span>`;
  document.getElementById("statMonth").textContent = formatRs(monthOrders.reduce((s, o) => s + o.total, 0));
  document.getElementById("statMonthCount").innerHTML = `${monthOrders.length} <span data-cp-i18n="stat.orders">${t("stat.orders")}</span>`;
  document.getElementById("statPending").textContent = pending.length;

  // Recent orders table (last 5)
  const recent = [...state.orders].sort((a,b) => b.date.localeCompare(a.date)).slice(0, 5);
  const tbody = document.getElementById("recentOrdersBody");
  tbody.innerHTML = recent.length === 0
    ? `<tr><td colspan="6" class="no-data"><i class="ph ph-receipt"></i>No orders yet</td></tr>`
    : recent.map(o => `
      <tr>
        <td>${formatDate(o.date)}</td>
        <td>${escHtml(o.customer_name)}</td>
        <td>${productLabel(o.product)}</td>
        <td>${o.quantity}</td>
        <td>${formatRs(o.total)}</td>
        <td><span class="badge ${o.status}">${t("status."+o.status)}</span></td>
      </tr>`).join("");

  drawRevenueChart();
  drawProductChart();
}

// ─── CHARTS (pure Canvas) ─────────────────────────────────────
function drawRevenueChart() {
  const canvas = document.getElementById("revenueChart");
  const ctx = canvas.getContext("2d");
  const W = canvas.offsetWidth; const H = canvas.offsetHeight || 180;
  canvas.width = W; canvas.height = H;

  // Build last 7 days buckets
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  const buckets = days.map(day => ({
    label: new Date(day).toLocaleDateString("en-IN", {day:"2-digit", month:"short"}),
    total: state.orders.filter(o => o.date === day && o.status !== "cancelled").reduce((s,o)=>s+o.total,0)
  }));

  const max = Math.max(...buckets.map(b => b.total), 1);
  const pad = { top: 20, right: 10, bottom: 40, left: 52 };
  const bW = (W - pad.left - pad.right) / buckets.length;

  ctx.clearRect(0, 0, W, H);

  const isDark = state.theme === "dark";
  const textCol = isDark ? "#8a9bb0" : "#64748b";
  const gridCol = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const barCol  = "#22c55e";

  // Grid lines
  ctx.strokeStyle = gridCol;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (H - pad.top - pad.bottom) * i / 4;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    ctx.fillStyle = textCol;
    ctx.font = "10px Manrope, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("₹" + ((max - (max * i/4)) | 0).toLocaleString("en-IN"), pad.left - 4, y + 3);
  }

  // Bars
  buckets.forEach((b, i) => {
    const x = pad.left + i * bW + bW * 0.15;
    const bh = (b.total / max) * (H - pad.top - pad.bottom);
    const y = H - pad.bottom - bh;
    const rw = bW * 0.7;

    ctx.fillStyle = barCol + (b.total ? "dd" : "22");
    roundRect(ctx, x, y, rw, bh, 4);
    ctx.fill();

    ctx.fillStyle = textCol;
    ctx.font = "9px Manrope, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(b.label, x + rw/2, H - pad.bottom + 14);
  });
}

function drawProductChart() {
  const canvas = document.getElementById("productChart");
  const ctx = canvas.getContext("2d");
  const W = canvas.offsetWidth; const H = canvas.offsetHeight || 180;
  canvas.width = W; canvas.height = H;
  ctx.clearRect(0, 0, W, H);

  const delivered = state.orders.filter(o => o.status !== "cancelled");
  const tender = delivered.filter(o => o.product === "tender").reduce((s,o)=>s+o.total,0);
  const puja   = delivered.filter(o => o.product === "puja").reduce((s,o)=>s+o.total,0);
  const total  = tender + puja || 1;

  const cx = W/2, cy = H/2 - 15, r = Math.min(W, H) * 0.35;
  const isDark = state.theme === "dark";
  const textCol = isDark ? "#e8eef4" : "#0f172a";

  function arc(start, end, col) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = col;
    ctx.fill();
  }

  if (tender === 0 && puja === 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.fillStyle = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
    ctx.fill();
    ctx.fillStyle = isDark ? "#8a9bb0" : "#64748b";
    ctx.font = "11px Manrope, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("No data", cx, cy + 4);
    return;
  }

  const tAngle = (tender / total) * Math.PI * 2;
  arc(-Math.PI/2, -Math.PI/2 + tAngle, "#22c55e");
  arc(-Math.PI/2 + tAngle, -Math.PI/2 + Math.PI*2, "#3b82f6");

  // Donut hole
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? "#1e2630" : "#ffffff";
  ctx.fill();

  // Legend
  const lgY = H - 22;
  ctx.fillStyle = "#22c55e"; ctx.fillRect(cx - 60, lgY, 10, 10);
  ctx.fillStyle = textCol; ctx.font = "10px Manrope"; ctx.textAlign = "left";
  ctx.fillText("Tender", cx - 46, lgY + 9);
  ctx.fillStyle = "#3b82f6"; ctx.fillRect(cx + 10, lgY, 10, 10);
  ctx.fillStyle = textCol;
  ctx.fillText("Puja", cx + 24, lgY + 9);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ─── ORDERS TABLE ─────────────────────────────────────────────
function renderOrdersTable(filter = {}) {
  let orders = [...state.orders].sort((a,b) => b.date.localeCompare(a.date));

  const search = (document.getElementById("orderSearch")?.value || "").toLowerCase();
  const statusF = document.getElementById("orderStatusFilter")?.value || "";
  const productF = document.getElementById("orderProductFilter")?.value || "";

  if (search) orders = orders.filter(o =>
    o.customer_name.toLowerCase().includes(search) ||
    o.customer_mobile.includes(search) ||
    o.product.includes(search)
  );
  if (statusF) orders = orders.filter(o => o.status === statusF);
  if (productF) orders = orders.filter(o => o.product === productF);

  const tbody = document.getElementById("ordersTableBody");
  if (!tbody) return;
  tbody.innerHTML = orders.length === 0
    ? `<tr><td colspan="9" class="no-data"><i class="ph ph-receipt"></i>No orders found</td></tr>`
    : orders.map(o => `
      <tr>
        <td>${formatDate(o.date)}</td>
        <td>${escHtml(o.customer_name)}</td>
        <td><a href="tel:${o.customer_mobile}">${o.customer_mobile}</a></td>
        <td>${productLabel(o.product)}</td>
        <td>${o.quantity}</td>
        <td>${formatRs(o.rate)}</td>
        <td>${formatRs(o.total)}</td>
        <td><span class="badge ${o.status}">${t("status."+o.status)}</span></td>
        <td><div class="actions-cell">
          <button class="btn-sm sec" onclick="openEditOrderModal('${o.id}')"><i class="ph ph-pencil"></i></button>
          <button class="btn-sm danger" onclick="deleteOrder('${o.id}')"><i class="ph ph-trash"></i></button>
        </div></td>
      </tr>`).join("");
}

// search & filter listeners
document.addEventListener("DOMContentLoaded", () => {
  ["orderSearch", "orderStatusFilter", "orderProductFilter"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", () => renderOrdersTable());
    document.getElementById(id)?.addEventListener("change", () => renderOrdersTable());
  });
});

// ─── ORDER MODAL ──────────────────────────────────────────────
function openAddOrderModal() {
  state.editingOrderId = null;
  document.getElementById("orderModalTitle").innerHTML = t("modal.addOrder");
  document.getElementById("fDate").value = todayISO();
  document.getElementById("fProduct").value = "tender";
  document.getElementById("fRate").value = RATES.tender;
  document.getElementById("fQty").value = 1;
  document.getElementById("fTotal").value = RATES.tender;
  document.getElementById("fName").value = "";
  document.getElementById("fMobile").value = "";
  document.getElementById("fAddress").value = "";
  document.getElementById("fNotes").value = "";
  document.getElementById("fStatus").value = "pending";
  document.getElementById("orderModal").classList.add("open");
  document.getElementById("fName").focus();
}

window.openEditOrderModal = function(id) {
  const o = state.orders.find(x => x.id === id);
  if (!o) return;
  state.editingOrderId = id;
  document.getElementById("orderModalTitle").innerHTML = t("modal.editOrder");
  document.getElementById("fDate").value = o.date;
  document.getElementById("fProduct").value = o.product;
  document.getElementById("fRate").value = o.rate;
  document.getElementById("fQty").value = o.quantity;
  document.getElementById("fTotal").value = o.total;
  document.getElementById("fName").value = o.customer_name;
  document.getElementById("fMobile").value = o.customer_mobile;
  document.getElementById("fAddress").value = o.address;
  document.getElementById("fNotes").value = o.notes;
  document.getElementById("fStatus").value = o.status;
  document.getElementById("orderModal").classList.add("open");
};

function closeOrderModal() {
  document.getElementById("orderModal").classList.remove("open");
  state.editingOrderId = null;
}

function initOrderForm() {
  document.getElementById("closeOrderModal").addEventListener("click", closeOrderModal);
  document.getElementById("cancelOrderModal").addEventListener("click", closeOrderModal);

  // Auto calc total
  ["fQty", "fRate", "fProduct"].forEach(id => {
    document.getElementById(id).addEventListener("input", calcTotal);
    document.getElementById(id).addEventListener("change", calcTotal);
  });

  function calcTotal() {
    const product = document.getElementById("fProduct").value;
    const rate = Number(document.getElementById("fRate").value) || RATES[product];
    if (!document.getElementById("fRate").value) document.getElementById("fRate").value = rate;
    const qty = Number(document.getElementById("fQty").value) || 1;
    document.getElementById("fTotal").value = (rate * qty).toFixed(0);
  }

  document.getElementById("fProduct").addEventListener("change", () => {
    const product = document.getElementById("fProduct").value;
    document.getElementById("fRate").value = RATES[product];
    calcTotal();
  });

  document.getElementById("saveOrderBtn").addEventListener("click", saveOrder);
}

async function saveOrder() {
  const name = document.getElementById("fName").value.trim();
  if (!name) { document.getElementById("fName").focus(); return; }

  const order = {
    date: document.getElementById("fDate").value || todayISO(),
    customer_name: name,
    customer_mobile: document.getElementById("fMobile").value.trim(),
    product: document.getElementById("fProduct").value,
    quantity: Number(document.getElementById("fQty").value) || 1,
    rate: Number(document.getElementById("fRate").value) || RATES[document.getElementById("fProduct").value],
    total: Number(document.getElementById("fTotal").value) || 0,
    address: document.getElementById("fAddress").value.trim(),
    status: document.getElementById("fStatus").value,
    notes: document.getElementById("fNotes").value.trim()
  };

  try {
    if (state.editingOrderId) {
      const { error } = await supabaseClient.from('orders').update(order).eq('id', state.editingOrderId);
      if (error) throw error;
      showToast(t("toast.orderUpdated"), "info");
    } else {
      const { error } = await supabaseClient.from('orders').insert([order]);
      if (error) throw error;
      showToast(t("toast.orderAdded"), "success");
    }
    await fetchAllData();
    closeOrderModal();
    renderAll();
  } catch (e) {
    console.error("Save Order Error:", e);
    showToast("Failed to save order.", "danger");
  }
}

window.deleteOrder = async function(id) {
  if (!confirm("Delete this order?")) return;
  try {
    const { error } = await supabaseClient.from('orders').delete().eq('id', id);
    if (error) throw error;
    await fetchAllData();
    showToast(t("toast.orderDeleted"), "danger");
    renderAll();
  } catch (e) {
    showToast("Delete failed", "danger");
  }
};

// ─── INVENTORY ────────────────────────────────────────────────
function initInventoryPanel() {}

function renderInventory() {
  const grid = document.getElementById("inventoryGrid");
  if (!grid) return;
  const items = [
    { key: "tender", label: t("inv.tender"), icon: "ph-leaf", color: "green" },
    { key: "puja",   label: t("inv.puja"),   icon: "ph-storefront", color: "blue" }
  ];
  grid.innerHTML = items.map(item => {
    const count = state.inventory[item.key] || 0;
    const isLow = count < 10;
    return `
    <div class="inv-card">
      <div class="inv-header">
        <div class="inv-title">${item.label}</div>
        <div class="stat-icon ${item.color}" style="width:36px;height:36px;font-size:1.1rem;"><i class="ph ${item.icon}"></i></div>
      </div>
      ${isLow ? `<div style="font-size:0.72rem;font-weight:700;color:var(--danger);margin-bottom:0.4rem;"><i class="ph ph-warning"></i> ${t("inv.low")}</div>` : ""}
      <div class="inv-count" style="color:var(--${isLow?"danger":"pri"})">${count}</div>
      <div style="font-size:0.78rem;color:var(--muted);margin-bottom:0.8rem;">${t("inv.stock")}</div>
      <div class="inv-controls">
        <input type="number" id="invQty_${item.key}" min="1" value="10" style="width:70px;" />
        <button class="btn-sm pri" onclick="adjustStock('${item.key}', 1)"><i class="ph ph-plus"></i> ${t("inv.add")}</button>
        <button class="btn-sm sec" onclick="adjustStock('${item.key}', -1)"><i class="ph ph-minus"></i> ${t("inv.sub")}</button>
      </div>
    </div>`;
  }).join("");
}

window.adjustStock = async function(key, dir) {
  const qty = parseInt(document.getElementById(`invQty_${key}`)?.value) || 10;
  state.inventory[key] = Math.max(0, (state.inventory[key] || 0) + (dir * qty));
  
  await syncInventory();
  renderInventory();
  showToast(t("toast.saved"), "info");
};

// ─── REPORTS ──────────────────────────────────────────────────
function renderReports() {
  const delivered = state.orders.filter(o => o.status !== "cancelled");

  // Daily
  const daily = {};
  delivered.forEach(o => {
    daily[o.date] = daily[o.date] || { count: 0, total: 0 };
    daily[o.date].count++; daily[o.date].total += o.total;
  });
  const dailyRows = Object.entries(daily).sort((a,b) => b[0].localeCompare(a[0])).slice(0, 30);
  const dailyBody = document.getElementById("dailyReportBody");
  if (dailyBody) {
    dailyBody.innerHTML = dailyRows.length === 0
      ? `<tr><td colspan="3" class="no-data">No data</td></tr>`
      : dailyRows.map(([date, d]) =>
          `<tr><td>${formatDate(date)}</td><td>${d.count}</td><td>${formatRs(d.total)}</td></tr>`
        ).join("");
  }

  // Monthly
  const monthly = {};
  delivered.forEach(o => {
    const mKey = o.date ? o.date.slice(0,7) : "";
    if (!mKey) return;
    monthly[mKey] = monthly[mKey] || { count: 0, total: 0 };
    monthly[mKey].count++; monthly[mKey].total += o.total;
  });
  const monthlyRows = Object.entries(monthly).sort((a,b) => b[0].localeCompare(a[0]));
  const monthlyBody = document.getElementById("monthlyReportBody");
  if (monthlyBody) {
    monthlyBody.innerHTML = monthlyRows.length === 0
      ? `<tr><td colspan="3" class="no-data">No data</td></tr>`
      : monthlyRows.map(([mk, d]) => {
          const [y, m] = mk.split("-");
          const label = new Date(y, m-1).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
          return `<tr><td>${label}</td><td>${d.count}</td><td>${formatRs(d.total)}</td></tr>`;
        }).join("");
  }

  // Product summary
  const prodSummary = document.getElementById("productSummary");
  if (prodSummary) {
    ["tender", "puja"].forEach(p => {
      const pOrders = delivered.filter(o => o.product === p);
      const pTotal = pOrders.reduce((s,o)=>s+o.total,0);
      const el = document.getElementById(`prodSum_${p}`);
      const html = `
        <div class="stat-card">
          <div class="stat-icon ${p==="tender"?"green":"blue"}">
            <i class="ph ${p==="tender"?"ph-leaf":"ph-storefront"}"></i>
          </div>
          <div class="stat-body">
            <div class="label">${productLabel(p)}</div>
            <div class="value">${formatRs(pTotal)}</div>
            <div class="sub">${pOrders.length} ${t("stat.orders")}</div>
          </div>
        </div>`;
      if (el) el.innerHTML = html;
      else {
        const div = document.createElement("div");
        div.id = `prodSum_${p}`;
        div.innerHTML = html;
        prodSummary.appendChild(div);
      }
    });
  }
}

// ─── SETTINGS ─────────────────────────────────────────────────
function initSettings() {
  document.getElementById("btnSaveSettings")?.addEventListener("click", async () => {
    state.settings.bizName = document.getElementById("settingBizName").value;
    state.settings.phone   = document.getElementById("settingPhone").value;
    state.settings.email   = document.getElementById("settingEmail").value;
    
    await syncSettings();
    showToast(t("btn.save") + " ✓", "success");
  });
  document.getElementById("btnResetData")?.addEventListener("click", () => {
    document.getElementById("resetModal").classList.add("open");
  });
}



// ─── RESET MODAL ──────────────────────────────────────────────
function initResetModal() {
  document.getElementById("closeResetModal")?.addEventListener("click", () => {
    document.getElementById("resetModal").classList.remove("open");
  });
  document.getElementById("cancelReset")?.addEventListener("click", () => {
    document.getElementById("resetModal").classList.remove("open");
  });
  document.getElementById("confirmReset")?.addEventListener("click", async () => {
    // Reset DB
    await supabaseClient.from('orders').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    await supabaseClient.from('inventory').update({ tender: 0, puja: 0 }).eq('id', 1);
    
    await fetchAllData();
    document.getElementById("resetModal").classList.remove("open");
    showToast(t("toast.reset"), "danger");
    renderAll();
  });
}

// ─── UTILS ───────────────────────────────────────────────────
function escHtml(str) {
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
