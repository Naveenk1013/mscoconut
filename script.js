const PHONE_NUMBER = "916202432875";

const RATES = {
  tender: 45,
  puja: 35,
};

// Supabase Configuration
const SUPABASE_URL = "https://qlxtdsoawcidauruyvzy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFseHRkc29hd2NpZGF1cnV5dnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMTg2NzksImV4cCI6MjA4ODU5NDY3OX0.xGv2itUtFZ7klaDhVgNcjg0kWg3gl1OtX0w_QTQWDZc";

const supabaseClient = (typeof window !== 'undefined' && window.supabase) 
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

const translations = {
  hi: {
    "nav.home": "होम",
    "nav.products": "प्रोडक्ट्स",
    "nav.order": "ऑर्डर",
    "nav.contact": "संपर्क",
    "nav.menu": "मेन्यू",

    "hero.kicker": "ताज़ा सप्लाई | थोक और रिटेल",
    "hero.title":
      "MS Coconut Wholesale<br />ताज़ा नारियल और पूजा के नारियल का भरोसेमंद सप्लायर",
    "hero.subtitle":
      "हम यहाँ कच्चा नारियल पानी और छठ पूजा के लिए विशेष नारियल उपलब्ध कराते हैं।<br />थोक और रिटेल दोनों में सप्लाई उपलब्ध।",
    "hero.whatsappBtn": "WhatsApp Order",
    "hero.appBtn": "Order via App",

    "products.heading": "हमारे प्रोडक्ट्स",
    "products.subheading":
      "ताज़गी, गुणवत्ता और समय पर डिलीवरी हमारी प्राथमिकता है।",
    "products.priceLabel": "रेट:",
    "products.tender.name": "कच्चा नारियल (Tender Coconut)",
    "products.tender.desc":
      "हम ताज़ा और प्राकृतिक कच्चा नारियल पानी के लिए नारियल उपलब्ध कराते हैं। ये नारियल पीने के लिए बेहतरीन होते हैं और शरीर को प्राकृतिक हाइड्रेशन देते हैं।",
    "products.tender.f1": "100% ताज़ा नारियल",
    "products.tender.f2": "प्राकृतिक नारियल पानी",
    "products.tender.f3": "थोक में उपलब्ध",
    "products.tender.f4": "रोज़ाना ताज़ा सप्लाई",
    "products.puja.name": "छठ पूजा नारियल",
    "products.puja.desc":
      "छठ पूजा के लिए विशेष रूप से चुने गए साफ और अच्छे गुणवत्ता वाले नारियल उपलब्ध हैं। ये नारियल धार्मिक पूजा और प्रसाद के लिए उपयुक्त होते हैं।",
    "products.puja.f1": "पूजा के लिए चयनित नारियल",
    "products.puja.f2": "साफ और अच्छी गुणवत्ता",
    "products.puja.f3": "बड़ी मात्रा में उपलब्ध",
    "products.puja.f4": "छठ पूजा के लिए विशेष सप्लाई",

    "gallery.water": "ताज़ा नारियल पानी",
    "gallery.wholesale": "थोक नारियल स्टैक",
    "showcase.heading": "नारियल गैलरी",
    "showcase.subheading": "हमारे खेत, स्टॉक और सप्लाई की झलकियां।",
    "showcase.farm": "कृषि क्षेत्र में नारियल कटाई",
    "showcase.water": "ताज़ा कच्चा नारियल पानी",
    "showcase.transport": "थोक सप्लाई के लिए तैयार स्टॉक",
    "showcase.chhath": "छठ घाट पूजा नारियल",
    "showcase.pani": "पानी वाला कच्चा नारियल",

    "order.heading": "ऑर्डर करें",
    "order.subheading": "WhatsApp या App के माध्यम से तुरंत ऑर्डर बुक करें।",
    "order.form.product": "उत्पाद",
    "order.form.tender": "कच्चा नारियल (Tender Coconut)",
    "order.form.puja": "छठ पूजा नारियल",
    "order.form.name": "नाम",
    "order.form.mobile": "मोबाइल नंबर",
    "order.form.quantity": "मात्रा",
    "order.form.rate": "रेट",
    "order.form.total": "कुल राशि",
    "order.form.address": "डिलीवरी पता",
    "order.form.whatsappCreate": "Create Order on WhatsApp",
    "order.form.appBtn": "Order via App",

    "about.heading": "हमारे बारे में",
    "about.text":
      "MS Coconut Wholesale एक भरोसेमंद नारियल सप्लायर है जो ताज़ा कच्चा नारियल और पूजा के लिए नारियल उपलब्ध कराता है। हम थोक और रिटेल दोनों में उच्च गुणवत्ता वाले नारियल सप्लाई करते हैं।",
    "about.caption": "फार्म से सीधे ताज़ा नारियल सप्लाई",

    "contact.heading": "संपर्क करें",
    "contact.subheading": "फोन, WhatsApp और लोकेशन के माध्यम से हमसे जुड़ें।",
    "contact.info": "संपर्क जानकारी",
    "contact.phoneLabel": "फोन:",
    "contact.addressLabel": "पता:",
    "contact.directionBtn": "दिशा देखें",
    "contact.whatsappBtn": "WhatsApp संपर्क",

    "footer.quickLinks": "त्वरित लिंक",
    "footer.home": "होम",
    "footer.products": "प्रोडक्ट्स",
    "footer.order": "ऑर्डर",
    "footer.contact": "संपर्क",
  },

  en: {
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.order": "Order",
    "nav.contact": "Contact",
    "nav.menu": "Menu",

    "hero.kicker": "Fresh Supply | Wholesale & Retail",
    "hero.title":
      "MS Coconut Wholesale<br />Trusted Supplier of Fresh and Puja Coconuts",
    "hero.subtitle":
      "We provide raw tender coconuts for coconut water and special coconuts for Chhath puja.<br />Wholesale and retail supply available.",
    "hero.whatsappBtn": "WhatsApp Order",
    "hero.appBtn": "Order via App",

    "products.heading": "Our Products",
    "products.subheading":
      "Freshness, quality, and on-time delivery are our priorities.",
    "products.priceLabel": "Rate:",
    "products.tender.name": "Tender Coconut",
    "products.tender.desc":
      "We supply fresh and natural coconuts for tender coconut water. These coconuts are ideal for drinking and provide natural hydration.",
    "products.tender.f1": "100% fresh coconuts",
    "products.tender.f2": "Natural coconut water",
    "products.tender.f3": "Available in bulk",
    "products.tender.f4": "Daily fresh supply",
    "products.puja.name": "Chhath Puja Coconut",
    "products.puja.desc":
      "Clean and carefully selected coconuts are available especially for Chhath puja. These are suitable for religious rituals and prasad.",
    "products.puja.f1": "Selected for puja",
    "products.puja.f2": "Clean and premium quality",
    "products.puja.f3": "Available in large quantity",
    "products.puja.f4": "Special Chhath puja supply",

    "gallery.water": "Fresh Coconut Water",
    "gallery.wholesale": "Coconut Wholesale Stacks",
    "showcase.heading": "Coconut Gallery",
    "showcase.subheading": "Snapshots of our farms, stock, and supply.",
    "showcase.farm": "Coconut harvesting at farm",
    "showcase.water": "Fresh tender coconut water",
    "showcase.transport": "Stock ready for wholesale supply",
    "showcase.chhath": "Chhath ghat puja coconuts",
    "showcase.pani": "Tender water coconuts",

    "order.heading": "Place Your Order",
    "order.subheading": "Book instantly via WhatsApp or mobile app.",
    "order.form.product": "Product",
    "order.form.tender": "Tender Coconut",
    "order.form.puja": "Chhath Puja Coconut",
    "order.form.name": "Name",
    "order.form.mobile": "Mobile No",
    "order.form.quantity": "Quantity",
    "order.form.rate": "Rate",
    "order.form.total": "Total Amount",
    "order.form.address": "Delivery Address",
    "order.form.whatsappCreate": "Create Order on WhatsApp",
    "order.form.appBtn": "Order via App",

    "about.heading": "About Us",
    "about.text":
      "MS Coconut Wholesale is a trusted coconut supplier providing fresh tender coconuts and coconuts for puja. We supply high-quality coconuts in both wholesale and retail.",
    "about.caption": "Fresh coconuts supplied directly from farm",

    "contact.heading": "Contact Us",
    "contact.subheading": "Reach us via phone, WhatsApp, or location map.",
    "contact.info": "Contact Info",
    "contact.phoneLabel": "Phone:",
    "contact.addressLabel": "Address:",
    "contact.directionBtn": "Get Direction",
    "contact.whatsappBtn": "WhatsApp Contact",

    "footer.quickLinks": "Quick Links",
    "footer.home": "Home",
    "footer.products": "Products",
    "footer.order": "Order",
    "footer.contact": "Contact",
  },
};

let currentLang = localStorage.getItem("lang") || "hi";

const langToggle = document.getElementById("langToggle");
const themeToggle = document.getElementById("themeToggle");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
const toastContainer = document.getElementById("toastContainer");

const productSelect = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const rateInput = document.getElementById("rate");
const totalAmountInput = document.getElementById("totalAmount");
const orderForm = document.getElementById("orderForm");

const priceTender = document.getElementById("priceTender");
const pricePuja = document.getElementById("pricePuja");

function getLabel(key) {
  return translations[currentLang][key] || translations.hi[key] || key;
}

function getValueForLang(lang, key) {
  return translations[lang][key] || translations.hi[key] || "";
}

function formatRate(value) {
  return `Rs ${Number(value)} / pc`;
}

function formatAmount(value) {
  return `Rs ${Number(value)}`;
}

function getSelectedRate() {
  return RATES[productSelect.value] || RATES.tender;
}

function getQuantity() {
  const qty = Number(quantityInput.value);
  return qty > 0 ? qty : 1;
}

function updateOrderPricing() {
  const selectedRate = getSelectedRate();
  const quantity = getQuantity();
  const total = selectedRate * quantity;

  rateInput.value = formatRate(selectedRate);
  totalAmountInput.value = formatAmount(total);
}

function refreshRateUI() {
  priceTender.textContent = formatRate(RATES.tender);
  pricePuja.textContent = formatRate(RATES.puja);
  updateOrderPricing();
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 400); // Wait for animation
  }, 3000);
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
  } else {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.innerHTML = '<i class="ph ph-moon"></i>';
  }
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.hasAttribute("data-theme");
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeToggle.innerHTML = '<i class="ph ph-moon"></i>';
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
  }
});

function applyLanguage(lang, showToastMsg = false) {
  currentLang = lang;
  document.documentElement.lang = lang === "hi" ? "hi" : "en";

  if (showToastMsg) {
    localStorage.setItem("lang", lang);
    showToast(
      lang === "hi"
        ? "भाषा सेटिंग्स सेव की गईं (Hindi selected)"
        : "Language preferences saved!",
    );
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const value = getValueForLang(lang, key);
    if (value) {
      element.innerHTML = value;
    }
  });

  const tenderOption = productSelect.querySelector('option[value="tender"]');
  const pujaOption = productSelect.querySelector('option[value="puja"]');
  tenderOption.textContent = getLabel("order.form.tender");
  pujaOption.textContent = getLabel("order.form.puja");

  langToggle.textContent =
    lang === "hi" ? "Hindi / English" : "English / Hindi";
  refreshRateUI();
}

function getSelectedProductName() {
  return productSelect.options[productSelect.selectedIndex].text;
}

function createWhatsAppMessage(formData) {
  return [
    "Hello MS Coconut Wholesale,",
    "",
    `Product: ${formData.productName}`,
    `Name: ${formData.name}`,
    `Mobile No: ${formData.mobile}`,
    `Quantity: ${formData.quantity}`,
    `Rate: ${formData.rate}`,
    `Total Amount: ${formData.totalAmount}`,
    "",
    `Delivery Address: ${formData.address}`,
  ].join("\n");
}

function openWhatsApp(message) {
  const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

langToggle.addEventListener("click", () => {
  applyLanguage(currentLang === "hi" ? "en" : "hi", true);
});

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

productSelect.addEventListener("change", updateOrderPricing);
quantityInput.addEventListener("input", updateOrderPricing);

orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");
  submitBtn.disabled = true;
  submitBtn.textContent = "Processing...";

  const formData = {
    productName: getSelectedProductName(),
    name: document.getElementById("name").value.trim(),
    mobile: document.getElementById("mobile").value.trim(),
    quantity: String(getQuantity()),
    rate: rateInput.value,
    totalAmount: totalAmountInput.value,
    address: document.getElementById("address").value.trim(),
  };

  try {
    if (!supabaseClient) throw new Error("Supabase client not loaded");

    const { error: sbError } = await supabaseClient.from('orders').insert([{
      customer_name: formData.name,
      customer_mobile: formData.mobile,
      product: productSelect.value, // 'tender' or 'puja'
      quantity: Number(formData.quantity),
      rate: Number(getSelectedRate()),
      total: Number(formData.quantity) * Number(getSelectedRate()),
      address: formData.address,
      status: 'pending'
    }]);

    if (sbError) throw sbError;

    showToast(currentLang === 'hi' ? "ऑर्डर सेव हो गया! व्हाट्सएप पर भेज रहे हैं..." : "Order saved to cloud! Redirecting to WhatsApp...");
    formStatus.textContent = "";
    formStatus.className = "form-status";
    orderForm.reset();
    refreshRateUI();

    setTimeout(() => {
      const message = createWhatsAppMessage(formData);
      openWhatsApp(message);
    }, 1500);
  } catch (error) {
    console.error("Supabase Error:", error);
    formStatus.textContent = currentLang === 'hi' ? "टूट गया! व्हाट्सएप पर सीधे भेजें।" : "Error syncing to cloud. Redirecting to WhatsApp...";
    formStatus.className = "form-status error";
    
    // Fallback to WhatsApp even if DB fails
    setTimeout(() => {
      const message = createWhatsAppMessage(formData);
      openWhatsApp(message);
    }, 1500);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = getLabel("order.form.whatsappCreate");
  }
});

initTheme();
applyLanguage(currentLang);
