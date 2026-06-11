# frazPivot

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)]()
[![GitHub Pages](https://img.shields.io/badge/demo-live-185FA5.svg)](https://frazintel.github.io/frazPivot/)

**Open-source pivot table & chart library for the web.**  
Drag-and-drop fields · multi-level grouping · aggregations · data bars · chart view · CSV export.  
Zero core dependencies. Chart.js optional for chart view.

 

---

## Live demo

👉 **[frazintel.github.io/frazPivot](https://frazintel.github.io/frazPivot/)**

---

## Features

| Feature | Details |
|---|---|
| Drag-and-drop field builder | Fields panel → Rows / Columns / Values zones |
| Multi-level row grouping | Stack multiple fields in Rows |
| Column pivoting | Drop a field into Columns to cross-tabulate |
| Aggregations | Sum, avg, min, max, count — per value field |
| Sort | Click any column header |
| Data bars | Inline bar overlay on numeric cells |
| % of total | Optional column showing share of grand total |
| Top N filter | Show top 5 / 10 / 20 rows |
| Live text filter | Narrows rows as you type |
| Grand Total row | Auto-calculated |
| Chart view | Bar chart built from current pivot state |
| CSV export | One-click download |
| UMD bundle | Script tag · CommonJS · AMD |

---

## Quick start

```html
<!-- 1. Optional: Chart.js for chart view -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- 2. frazPivot -->
<script src="https://frazintel.github.io/frazPivot/dist/frazPivot.js"></script>

<!-- 3. Mount point -->
<div id="my-pivot"></div>

<script>
const pivot = new frazPivot('#my-pivot', {
  fields:        ['Region', 'Category', 'Revenue', 'Units'],
  numericFields: ['Revenue', 'Units'],
  data: [
    ['North', 'Electronics', 182000, 45],
    ['South', 'Healthcare',  310000,  8],
    // ...
  ],
  rows:   ['Region'],
  vals:   ['Revenue'],
  height: '600px',
});
</script>
```

---

## Constructor options

| Option | Type | Default | Description |
|---|---|---|---|
| `fields` | `string[]` | — | All column names, in order |
| `numericFields` | `string[]` | — | Fields treated as numeric |
| `data` | `Array[]` | — | Row arrays matching `fields` order |
| `rows` | `string[]` | `[fields[0]]` | Initial row grouping fields |
| `cols` | `string[]` | `[]` | Initial column pivot field |
| `vals` | `string[]` | `[numericFields[0]]` | Initial value fields |
| `height` | `string` | `'600px'` | Container height CSS value |
| `showToolbar` | `boolean` | `true` | Show filter/options toolbar |
| `showChart` | `boolean` | `true` | Show Grid/Chart toggle |

---

## Instance methods

| Method | Returns | Description |
|---|---|---|
| `loadData(fields, numericFields, data)` | `void` | Replace entire dataset |
| `setFields({ rows, cols, vals })` | `void` | Programmatically set field layout |
| `getPivotData()` | `Object` | Current computed pivot result |
| `exportCSV()` | `string` | Current grid as CSV string |
| `downloadCSV(filename?)` | `void` | Trigger CSV file download |

---

## SAP B1 / REST API integration

```javascript
fetch('/api/dome/sales-data')
  .then(res => res.json())
  .then(json => {
    pivot.loadData(json.fields, json.numericFields, json.rows);
  });
```

Expected JSON shape from your API:

```json
{
  "fields": ["Region", "Category", "Revenue"],
  "numericFields": ["Revenue"],
  "rows": [
    ["North", "Electronics", 182000],
    ["South", "Healthcare", 310000]
  ]
}
```

---

## Module formats

```js
// CommonJS
const frazPivot = require('./dist/frazPivot');

// AMD
define(['frazPivot'], function(frazPivot) { ... });

// ES Module (via CDN)
import frazPivot from 'https://esm.sh/frazintel/frazPivot';

// Browser global
const pivot = new window.frazPivot('#container', options);
```

---

## File structure

```
frazPivot/
├── dist/
│   ├── frazPivot.js          ← Readable UMD source (~25KB)
│   └── frazPivot.min.js      ← Minified production build (~12KB)
├── demo/
│   └── index.html            ← Full-featured demo
├── index.html                ← GitHub Pages landing page
├── LICENSE
└── README.md
```

---

## GitHub Pages setup

After pushing to GitHub:

1. Go to **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` · Folder: `/ (root)`
4. Save — live at `https://frazintel.github.io/frazPivot/`

---

## License

MIT — free for commercial and personal use.

---

## Contributing

Pull requests welcome. To suggest features or report bugs, open an issue.
