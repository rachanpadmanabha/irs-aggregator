# IRS Schedule K-2 Part II Aggregation Application

A **frontend-only React application** for aggregating IRS Schedule K-2 Part II (Foreign Tax Credit Limitation) data across multiple entities for a single company and tax year.

This is a **tax-sensitive financial application** where **correctness and UX are equally important**.

## Features

### Core Functionality
- ✅ Entity management (CRUD operations)
- ✅ Schedule K-2 Part II data entry for all 17 IRS lines
- ✅ Country-based data entry with automatic validation
- ✅ System-calculated totals (column g)
- ✅ Status management (DRAFT/SUBMITTED)
- ✅ Aggregation of SUBMITTED entities only
- ✅ Foreign source-only aggregation (excludes U.S. source)
- ✅ Cross-tab data synchronization
- ✅ Persistent storage (localStorage with backend-ready architecture)

### User Interface
- 📊 Dashboard with summary cards and charts
- 📝 Entity list with sorting and filtering
- 📋 IRS-style data entry tables
- 📈 Bar and pie charts for data visualization
- 🔄 Real-time aggregation invalidation
- ⚠️ Non-blocking data warnings
- 🎨 Modern, responsive UI with Tailwind CSS

## Tech Stack

- **Framework**: React 19 with TypeScript (strict mode)
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Charts**: Chart.js with react-chartjs-2
- **Precision**: decimal.js (4 decimal places)
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite 7
- **Storage**: localStorage with BroadcastChannel (cross-tab sync)

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## Application Structure

```
src/
├── app/                    # Redux store configuration
│   ├── store.ts
│   ├── hooks.ts
│   └── middleware/
│       └── persistenceMiddleware.ts
├── features/               # Redux slices
│   ├── entities/
│   │   └── entitySlice.ts
│   ├── aggregation/
│   │   └── aggregationSlice.ts
│   └── ui/
│       └── uiSlice.ts
├── pages/                  # Route pages
│   ├── Dashboard.tsx
│   ├── EntityList.tsx
│   ├── CreateEntity.tsx
│   ├── EntityDataEntry.tsx
│   └── AggregationReport.tsx
├── components/             # Reusable components
│   ├── ui/                # shadcn/ui components
│   ├── Layout.tsx
│   ├── ErrorBoundary.tsx
│   └── LineDataTable.tsx
├── services/              # Business logic
│   ├── aggregationEngine.ts
│   └── storage/
│       ├── StorageAdapter.ts
│       └── LocalStorageAdapter.ts
├── types/                 # TypeScript types
│   ├── entity.ts
│   ├── aggregation.ts
│   └── common.ts
├── config/                # Configuration
│   └── irsLines.ts       # IRS Part II line definitions
├── utils/                 # Utility functions
│   ├── calculations.ts
│   ├── validators.ts
│   ├── format.ts
│   └── warnings.ts
└── main.tsx              # Application entry point
```

## User Guide

### 1. Create an Entity

Navigate to **Entities** → **Add Entity**:
- Enter entity name (e.g., "ABC Corporation")
- Enter tax identifier/EIN
- Entity is created with DRAFT status

### 2. Enter Part II Data

Click **Edit Data** on an entity:
- Expand IRS lines by clicking on them
- Add countries for each line
- Enter values in columns (a) through (f)
- Column (g) is automatically calculated
- Data is auto-saved

### 3. Submit Entity

When data entry is complete:
- Click **Mark as Submitted**
- Only SUBMITTED entities are included in aggregation

### 4. Generate Report

From the **Dashboard**:
- Click **Generate Report**
- Report aggregates all SUBMITTED entities
- Shows foreign source totals by country and line
- Report is marked as outdated if data changes

### 5. View Aggregation

Navigate to **Report**:
- View aggregated totals by IRS line and country
- See which entities were included
- Regenerate report after data changes

## Key Concepts

### Entity Status

- **DRAFT**: Entity is being worked on, not included in aggregation
- **SUBMITTED**: Entity is finalized, included in aggregation

### Column Definitions

- **(a)** U.S. source income
- **(b)** Foreign branch category income
- **(c)** Passive category income
- **(d)** General category income
- **(e)** Other category income (with category code)
- **(f)** Sourced by partner
- **(g)** **SYSTEM-CALCULATED** total (sum of a-f)

### Aggregation Rules

1. Only SUBMITTED entities are included
2. Aggregates by IRS line → country
3. Only foreign source columns (b,c,d,e,f) are summed
4. U.S. source (column a) is excluded
5. Requires explicit user action (not automatic)
6. Invalidated when entity data changes

## Hard Invariants

The application enforces 10 hard invariants (see `INVARIANTS.md`):

1. ✅ IRS line numbers are primary keys
2. ✅ Country uniqueness enforced before write
3. ✅ Totals are always derived
4. ✅ Draft entities never leak into aggregation
5. ✅ Aggregation never mutates input data
6. ✅ Editing invalidates aggregation
7. ✅ Precision is preserved end-to-end
8. ✅ Column (g) is never user-editable
9. ✅ Aggregation uses ONLY foreign-source columns
10. ✅ Explicit user action required for aggregation

## Data Persistence

- Data is automatically saved to localStorage
- Changes sync across browser tabs via BroadcastChannel
- Architecture is backend-ready (swap `LocalStorageAdapter` for API adapter)

## Validation

The application provides non-blocking warnings for:
- Missing data (all columns zero)
- Empty lines
- Unusually large values (>$1B)
- Negative values

Warnings are informational only and don't prevent data entry or aggregation.

## Precision Handling

- All calculations use `decimal.js` library
- Values stored with 4 decimal places
- 20-digit precision during calculation
- Rounding only on display, never on stored values
- Negative values supported

## Browser Compatibility

- Modern browsers with ES2020+ support
- Chrome, Firefox, Safari, Edge (latest versions)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Type Checking

TypeScript is configured in strict mode. All code must pass type checking:
```bash
npx tsc --noEmit
```

## Future Enhancements (Not Implemented)

- Backend API integration
- User authentication
- PDF export
- Excel import/export
- Multi-year comparison
- Other IRS Schedule K-2 parts

## License

This is a demonstration application for IRS Schedule K-2 Part II data aggregation.

## Support

For issues or questions, refer to the codebase documentation and inline comments.
