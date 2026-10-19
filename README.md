# Chelsea Paint & Carpentry — Mobile Project Management App

A modern, responsive **React mobile project management prototype** built for **Chelsea Paint & Carpentry**, inspired by the company's official brand identity at [chelseapc.com](https://chelseapc.com/).

Designed specifically for residential painting, finish carpentry, and remodeling operations across Ann Arbor, Chelsea, Dexter, and Washtenaw County, Michigan.

---

## 🎨 Branding & Identity

- **Brand Burgundy Accent**: `#A8354E` (active pills, buttons, badges) with deep crimson hover states (`#93263E`)
- **Charcoal & Slate Core**: `#1E242B` / `#0F172A`
- **Carpentry Amber**: `#D97706` for wood and millwork accents
- **Typography**: Google Fonts **Jost** (body & labels) paired with **DM Serif Display** (craftsman editorial headers)
- **Natural Mobile-First Responsive Layout**: Optimized for touch usability on smartphones, scaling naturally to tablets and desktops.

---

## 🚀 Key Modules & Features

### 1. Home Dashboard
- **Operational Metrics**: Active Jobs, Upcoming Pipeline, Completed Work, and Overdue Tasks.
- **Today's Schedule**: Quick access to today's job sites, scheduled time windows, and assigned workers.
- **Pending Approvals**: High-priority cards for client/PM change orders requiring authorization.
- **Project Progress**: Real-time completion percentages and target dates.
- **Field Activity Feed**: Live chronological log of photo uploads, hours reported, and task updates.
- **Quick Action Bar**: Shortcuts for *New Job*, *Assign Task*, *Daily Log*, and *Add Photo*.

### 2. Projects & Job Tracking
- **Search & Filters**: Multi-faceted filter by status (*All*, *Active*, *Upcoming*, *Completed*) and trade (*Painting*, *Carpentry*, *Remodeling*).
- **8 Dedicated Project Sub-Sections**:
  1. **Overview**: Client contacts (with click-to-call/email & Google Maps), full scope of work, timeline, and crew leads.
  2. **Tasks**: Work items for the project, status pills, and assignment.
  3. **Photos & Logs**: Sub-tab toggle between *Site Photos* (*Before*, *During*, *After*) and *Daily Logs*.
  4. **Schedule**: Upcoming site visits, consultation dates, and prep shifts.
  5. **Change Orders**: Itemized labor & materials breakdown with interactive approval/rejection workflows and confirmation modals that automatically sync with the project's budget.
  6. **Documents**: 6 categories (*Estimates & Proposals*, *Contracts*, *Invoices & Receipts*, *Plans & Specs*, *Paint Colors & Material Selections*, *Permits & Warranty*) with role-restriction tags, upload form, and preview modal.
  7. **Costs & Budget**: Real-time spending progress bar, labor vs. material expenses, and an **Add Expense** modal.
  8. **Updates**: Chronological project audit trail.
- **Create Project Modal**: Form with customer contact info, trade type, budget, target dates, crew assignment, and scope details.

### 3. Tasks & Field Work
- **3 Clear Status Columns**: *To Do*, *In Progress*, and *Completed*.
- **Task Detail Modal**: Full instructions, deadline, checklist, comment thread with live reply input, and attached site photos.
- **Report Problem Modal**: Allows field painters and carpenters to flag on-site obstacles (e.g. water damage, lead paint discovery, missing materials) with automated alerts to the PM and Owner.
- **Overdue Task Alerts**: Overdue items are flagged with high-visibility badges.

### 4. Schedule & Calendar
- **3 Interactive Views**:
  - **Day View**: Timeline of scheduled shifts, site addresses, and crew rosters.
  - **Week View**: 7-day strip with event indicator dots.
  - **Month View**: 31-day October 2026 calendar grid.
- **Worker Availability Bar**: Live indicator of which painters and carpenters are on-site or available.
- **Schedule Job Modal**: Form to schedule new visits, consultations, or prep shifts.

### 5. Team Communication & Messages
- **Project Channels**: `# Washtenaw Historic Crew`, `# Barton Hills Remodel Crew`, etc.
- **Direct 1-on-1 Messages**: Direct channels between Owner, PMs, and Field Leads.
- **Instant Dispatch**: Working message input with Enter-to-send support.
- **Photo Attachments**: Quick attachment popover with realistic site progress photos.

### 6. Role-Based Permissions
Switch roles via the user avatar in the header or the top utility bar:
- **Owner (Jonah Brown)**: Full access to all finances, profit margins, confidential invoices/contracts, and business-wide approvals.
- **Project Manager (Marcus Vance)**: Manages schedules, creates projects, assigns tasks, logs expenses, and reviews field reports.
- **Worker (Dave Miller — Lead Painter / Carlos Ortiz — Lead Carpenter)**: Focused field crew view highlighting assigned jobs, daily tasks, daily log submission, problem reporting, and site photo uploads while keeping sensitive contract pricing confidential.

---

## 🛠️ Tech Stack

- **React 18** (Functional components, Hooks, Context API)
- **Tailwind CSS 3** (Custom Chelsea brand colors, safe area insets, modern typography)
- **Lucide React** (Clean, consistent icon system)
- **Vite 6** (Blazing fast local development & optimized build)
- **LocalStorage State Sync**: User actions, created jobs, tasks, photos, change orders, daily reports, and expenses persist across browser refreshes.

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/suhaib36/ChelseaPaint-Carpentry.git
cd ChelseaPaint-Carpentry

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` to interact with the mobile app prototype.

### Production Build
```bash
npm run build
npm run preview
```

---

© Chelsea Paint & Carpentry — Proudly serving Ann Arbor & Washtenaw County, MI.
