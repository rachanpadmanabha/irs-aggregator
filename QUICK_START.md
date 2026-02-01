# Quick Start Guide

Get the IRS Schedule K-2 Part II application running in 5 minutes.

## Prerequisites

- Node.js 18+ and npm
- Modern web browser

## Installation

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Start the development server
npm run dev

# 3. Open your browser to http://localhost:5173
```

## First-Time Usage

### Step 1: Create Your First Entity

1. Click **"Add Entity"** on the Dashboard
2. Enter entity name (e.g., "ABC Corporation")
3. Enter tax identifier (e.g., "12-3456789")
4. Click **"Create Entity"**

### Step 2: Add Part II Data

1. From the Entity List, click **"Edit Data"** on your entity
2. Click on any IRS line (e.g., Line 1 - Sales) to expand it
3. Enter a country name (e.g., "United States") and click **"Add Country"**
4. Enter values in columns (a) through (f)
5. Column (g) calculates automatically
6. Add more countries and lines as needed

### Step 3: Submit Entity

1. Click **"Mark as Submitted"** when data entry is complete
2. Only SUBMITTED entities are included in aggregation

### Step 4: Generate Report

1. Return to the Dashboard
2. Click **"Generate Report"**
3. View aggregated totals by line and country

## Example Data Entry

For testing, try this example:

**Entity**: Example Corp  
**Tax ID**: 12-3456789

**Line 1 (Sales)**:
- **United States**: Column (a) = 1000.0000, Column (b) = 500.0000
- **China**: Column (c) = 300.0000, Column (d) = 200.0000

**Line 6 (Ordinary dividends)**:
- **United Kingdom**: Column (b) = 150.0000, Column (c) = 100.0000

Then mark as SUBMITTED and generate a report to see the aggregation.

## Key Concepts

### Column Meanings
- **(a)** U.S. source - EXCLUDED from aggregation
- **(b-f)** Foreign sources - INCLUDED in aggregation
- **(g)** Total - Auto-calculated (sum of a-f)

### Entity Status
- **DRAFT**: Work in progress, not included in reports
- **SUBMITTED**: Finalized, included in aggregation

### Aggregation Rules
- Only SUBMITTED entities are aggregated
- Only foreign columns (b,c,d,e,f) are summed
- Must click "Generate Report" explicitly

## Tips

- Data auto-saves as you type
- Use negative values for losses (supported)
- Country names must be unique per line per entity
- Column (g) is read-only (system-calculated)
- Expand/collapse lines with one click
- Data syncs across browser tabs automatically

## Troubleshooting

**Q: Data not saving?**  
A: Check browser console for errors. localStorage must be enabled.

**Q: Column (g) showing wrong value?**  
A: It's auto-calculated. Refresh the page if it seems stuck.

**Q: Can't add duplicate country?**  
A: Correct! Each country can only appear once per line per entity.

**Q: Report is outdated?**  
A: Click "Regenerate" if you've edited entity data after generating.

## Next Steps

- Read the full `README.md` for detailed documentation
- See `INVARIANTS.md` for business rules
- Check `IMPLEMENTATION_SUMMARY.md` for technical details

## Need Help?

Refer to the inline help text in the application or check the documentation files in the project root.
