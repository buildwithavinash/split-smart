# SplitSmart 💚

> Split expenses. Settle smarter.

A clean, offline-first expense splitting app built with React and Tailwind CSS. Add members, log shared expenses, and instantly see who owes whom — with WhatsApp sharing built in.

---

## Features

- **Group management** — Create multiple groups, each with their own members and expense history
- **Expense tracking** — Log expenses with amount, description, and who paid
- **Smart settlements** — Automatically calculates the minimum number of transfers to settle all debts
- **WhatsApp sharing** — Share the settlement summary directly to a WhatsApp chat
- **Dark mode** — Full dark/light theme toggle, persisted across sessions
- **Offline-first** — All data lives in `localStorage`, no backend needed
- **Indian formatting** — Amounts formatted with `en-IN` locale (₹1,00,000)

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Styling | Tailwind CSS v3 |
| Icons | Remix Icons |
| State | React `useState` + `useEffect` |
| Persistence | `localStorage` |
| Build Tool | Vite |

---

## How It Works

### Settlement Algorithm

The core of the app is a greedy debt-minimization algorithm in `src/utils/settlements.js`.

1. Each member's net balance is calculated — positive means they're owed money, negative means they owe money
2. Members are split into **creditors** (net positive) and **debtors** (net negative)
3. A two-pointer approach matches the largest debtor with the largest creditor, settling as much as possible in one transaction
4. This minimizes the total number of transfers needed to settle the group

```
Example: Alice paid ₹300, Bob paid ₹0, Carol paid ₹0 (split equally)
→ Net: Alice +200, Bob -100, Carol -100
→ Settlements: Bob owes Alice ₹100, Carol owes Alice ₹100
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/buildwithavinash/split-smart.git
cd split-smart

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [https://split-smart-sigma.vercel.app/] in your browser.

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # App header with dark mode toggle
│   ├── GroupCard.jsx       # Group preview card with member chips
│   ├── GroupDetail.jsx     # Full group view — expenses, add form, settlements
│   ├── GroupInputForm.jsx  # Create group modal with inline validation
│   └── CreateGroupBtn.jsx  # Floating action button
├── utils/
│   ├── settlements.js      # Debt minimization algorithm
│   └── textFormat.js       # Name capitalization helper
└── App.jsx                 # Root — state management and handler logic
```

---

## Usage

1. **Create a group** — tap the `+` button, enter a group name and at least 2 members
2. **Add expenses** — open a group, enter the amount, who paid, and a description
3. **View settlements** — the Settlement Summary section shows exactly who pays whom and how much
4. **Share** — tap "Share on WhatsApp" to send the summary to your group chat
5. **Delete freely** — remove individual expenses or entire groups at any time

---

## Screenshots



---

## Roadmap

- [ ] TypeScript migration
- [ ] Custom hook: `useGroups` for cleaner App.jsx
- [ ] Expense date display in history
- [ ] Equal vs. custom split options
- [ ] Export settlement as PDF

---

## License

MIT