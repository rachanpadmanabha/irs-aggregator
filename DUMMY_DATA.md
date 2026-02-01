# Dummy Test Data

The application automatically loads test data on first run. You can clear it by using your browser's developer tools.

## Test Entities Included

### 1. Tech Solutions Inc. (SUBMITTED)
- **Tax ID**: 12-3456789
- **Status**: SUBMITTED ✅
- **Lines**: 5 lines with data
- **Countries**: 11 countries total
- **Data**: 
  - Line 1 (Sales): US, China, UK, Germany
  - Line 2 (Services): India, Brazil
  - Line 5 (Interest): Canada, Switzerland
  - Line 6 (Dividends): Japan, South Korea
  - Line 8 (Royalties): Australia

### 2. Global Enterprises LLC (SUBMITTED)
- **Tax ID**: 98-7654321
- **Status**: SUBMITTED ✅
- **Lines**: 4 lines with data
- **Countries**: 8 countries total
- **Data**:
  - Line 1 (Sales): US, France, Mexico
  - Line 2 (Services): India, Philippines
  - Line 3 (Real Estate): Spain
  - Line 6 (Dividends): Singapore, Hong Kong

### 3. Innovation Partners Corp (SUBMITTED)
- **Tax ID**: 45-6789012
- **Status**: SUBMITTED ✅
- **Lines**: 3 lines with data
- **Countries**: 4 countries total
- **Data**:
  - Line 1 (Sales): US, Netherlands
  - Line 5 (Interest): Luxembourg
  - Line 7 (Qualified Dividends): Ireland

### 4. Pacific Trade Holdings (SUBMITTED)
- **Tax ID**: 23-8901234
- **Status**: SUBMITTED ✅
- **Lines**: 4 lines with data
- **Countries**: 6 countries total
- **Data**:
  - Line 1 (Sales): US, Vietnam, Thailand
  - Line 2 (Services): Malaysia
  - Line 6 (Dividends): Taiwan
  - Line 9 (Short-term Capital Gains): South Korea

### 5. Atlantic Financial Group (SUBMITTED)
- **Tax ID**: 67-4321098
- **Status**: SUBMITTED ✅
- **Lines**: 6 lines with data
- **Countries**: 8 countries total
- **Data**:
  - Line 1 (Sales): US, Italy, Sweden
  - Line 4 (Other Rental): Portugal
  - Line 5 (Interest): Belgium
  - Line 6 (Dividends): Denmark
  - Line 10 (Long-term Capital Gains): Norway

### 6. Beta Industries Ltd (DRAFT)
- **Tax ID**: 89-1122334
- **Status**: DRAFT ❌
- **Lines**: 2 lines with data
- **Countries**: 2 countries total
- **Data**:
  - Line 1 (Sales): US
  - Line 2 (Services): Poland

## Test Scenarios

### Generate Report
Click "Generate Report" on the Dashboard to aggregate data from:
- ✅ Tech Solutions Inc. (SUBMITTED)
- ✅ Global Enterprises LLC (SUBMITTED)
- ✅ Innovation Partners Corp (SUBMITTED)
- ✅ Pacific Trade Holdings (SUBMITTED)
- ✅ Atlantic Financial Group (SUBMITTED)
- ❌ Beta Industries Ltd (DRAFT - excluded)

### Expected Aggregation Results

**Line 1 - Sales:**
- United States: Combined from 5 entities
- China, UK, Germany: From Tech Solutions Inc.
- France, Mexico: From Global Enterprises LLC
- Netherlands: From Innovation Partners
- Vietnam, Thailand: From Pacific Trade Holdings
- Italy, Sweden: From Atlantic Financial Group

**Line 2 - Services:**
- India: Combined from Tech Solutions & Global Enterprises
- Brazil: From Tech Solutions Inc.
- Philippines: From Global Enterprises LLC
- Malaysia: From Pacific Trade Holdings

**Plus 8 more IRS lines with aggregated data across multiple countries!**

## How to Clear Test Data

1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Click "Local Storage"
4. Delete the `k2_part2_app_state` key
5. Refresh the page

Or run this in the console:
```javascript
localStorage.removeItem('k2_part2_app_state')
location.reload()
```

## Sample Values

All dummy data uses realistic values with 4 decimal places:
- Sales range: $180,000 - $1,000,000
- Foreign source values: $7,000 - $500,000
- Dividends: $1,500 - $75,000
- Interest: $2,000 - $50,000
- Services: $3,000 - $220,000
- Capital gains: $2,500 - $62,000

The data demonstrates:
- ✅ **6 entities** (5 SUBMITTED, 1 DRAFT)
- ✅ **35+ countries** across all entities
- ✅ **10 different IRS lines** (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
- ✅ **All columns filled** including eCategory
- ✅ **3-4 countries per line** for rich data
- ✅ Column (g) auto-calculation
- ✅ Foreign-only aggregation (columns b,c,d,e,f)
- ✅ Country diversity (US, Europe, Asia, Latin America)
