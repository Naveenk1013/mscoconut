# MS Coconut Wholesale & eManager CPanel

This repository contains the source code for the MS Coconut Wholesale website and its deeply integrated, fully offline business management dashboard (eManager CPanel).

## 🚀 Project Overview

The project is divided into two main components:
1.  **Main Website (`index.html`)**: A bilingual, dark-mode optimized landing page for MS Coconut Wholesale, showcasing products, contact information, and an order form.
2.  **eManager CPanel (`cpanel.html`)**: A secure, standalone, offline-first business dashboard designed to run entirely locally in the browser, using a CSV file (`mswholesaledatadonotdelete.csv`) as its database.

---

## ✅ Completed Activities (Work Log)

### Phase 1: Website Refinements
- **Formspree Integration**: Upgraded the order form to submit data reliably via Formspree before redirecting to WhatsApp.
- **Theme & UI**: Integrated system-adaptive Dark Mode with a manual toggle. Upgraded all icons to the premium Phosphor Icons library. Added sleek floating Call-to-Action (CTA) buttons for WhatsApp and Phone calls.
- **Localization**: Implemented bilingual support (Hindi/English) with preferences saved in `localStorage` and interactive toast notifications.
- **SEO Optimization**: Added `sitemap.xml`, `robots.txt`, and comprehensive Open Graph meta tags to improve search engine visibility.

### Phase 2: eManager CPanel Development
- **Offline Architecture**: Built the entire dashboard using raw HTML, CSS, and JS. Zero external dependencies, no cloud database. All data stays on the device.
- **2-Step Authentication**:
  - Step 1: 4-digit PIN entry (default `1234`).
  - Step 2: CSV file upload (`mswholesaledatadonotdelete.csv`).
- **Data Engine**: Custom CSV parser and serializer capable of handling order histories and inventory counts.
- **Real-Time Auto-Save**: Integrated the **File System Access API**. Once the user grants permission to the CSV file, all subsequent edits (orders, inventory, settings) are automatically, silently saved directly to the file on disk.
- **Refresh Persistence**: Added IndexedDB and `localStorage` caching to ensure that accidental page refreshes do not log the user out or lose unsaved data.
- **Features**:
  - **Dashboard**: Live summary metrics and custom-built Canvas API visualizations (Revenue bar chart & Product split donut chart).
  - **Orders**: Full CRUD operations + Search + Filters.
  - **Inventory**: Stock tracker for Tender and Puja coconuts.
  - **Reports & Settings**: Daily/monthly analysis, PIN management, and manual data export mechanisms.

---

## 🔮 Next Steps & Future Enhancements (To-Do)

When work resumes, consider the following potential upgrades:

1.  **PWA Integration**: Convert the website and CPanel into a Progressive Web App (PWA) so the client can "install" the eManager directly to their smartphone home screen as a native-feeling app.
2.  **Invoice Generation**: Add functionality in the CPanel to generate and download PDF invoices or receipts for specific orders.
3.  **Expanded Product Catalog**: If MS Coconut expands its offerings beyond Tender and Puja coconuts, update the inventory trackers and chart visualizations dynamically to support N number of products.
4.  **Data Backup Reminders**: While the auto-save works locally, maybe add a prompt asking the client to physically copy their CSV file to a USB drive or Google Drive once a week as a failsafe against hardware failure.
5.  **Multi-User Roles**: If the business grows to have multiple employees, we might need a way to track "who" added an order, though this complicates the simple offline CSV structure.

---
*Last Updated: March 2026*
