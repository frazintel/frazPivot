/*!
 * frazPivot v1.0.0
 * Open-source pivot table & chart library
 * Author: ViSole Group / GMS
 * License: MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory()
    : typeof define === 'function' && define.amd
      ? define(factory)
      : (global.frazPivot = factory());
}(this, function () {
  'use strict';

  /* ─── CSS ─────────────────────────────────────────────────────────────── */
  const CSS = `
.fp-root{font-family:system-ui,-apple-system,sans-serif;font-size:13px;color:#1a1a1a;display:flex;flex-direction:column;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;background:#fff}
.fp-root *{box-sizing:border-box;margin:0;padding:0}
.fp-header{display:flex;align-items:center;justify-content:space-between;padding:9px 14px;background:#f7f8fa;border-bottom:1px solid #e0e0e0}
.fp-logo{display:flex;align-items:center;gap:8px}
.fp-logo-mark{width:26px;height:26px;background:#185FA5;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;letter-spacing:-.5px}
.fp-logo-name{font-size:15px;font-weight:600;color:#111}
.fp-logo-ver{font-size:10px;color:#888;padding:2px 6px;border:1px solid #ddd;border-radius:4px}
.fp-hbtns{display:flex;gap:6px;align-items:center}
.fp-hbtns button{font-size:11px;padding:4px 10px;height:26px;border:1px solid #ccc;border-radius:5px;background:#fff;cursor:pointer;color:#333}
.fp-hbtns button:hover{background:#f0f0f0}
.fp-hbtns button.fp-active{background:#e6f1fb;border-color:#185FA5;color:#0c447c;font-weight:500}
.fp-hbtns select{font-size:11px;height:26px;border:1px solid #ccc;border-radius:5px;background:#fff;padding:0 6px;cursor:pointer}
.fp-body{display:flex;flex:1;overflow:hidden;min-height:500px}
.fp-sidebar{width:175px;min-width:175px;border-right:1px solid #e8e8e8;display:flex;flex-direction:column;background:#fafafa}
.fp-sidebar-head{padding:7px 10px;border-bottom:1px solid #e8e8e8;display:flex;align-items:center;justify-content:space-between}
.fp-sidebar-head-label{font-size:10px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.06em}
.fp-legend{display:flex;gap:8px;font-size:10px;color:#999}
.fp-legend span{display:flex;align-items:center;gap:3px}
.fp-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.fp-dot-num{background:#185FA5}
.fp-dot-str{background:#1D9E75}
.fp-fields-list{padding:6px;overflow-y:auto;flex:1}
.fp-field-item{display:flex;align-items:center;gap:6px;padding:5px 7px;border-radius:5px;cursor:grab;font-size:12px;border:1px solid transparent;user-select:none}
.fp-field-item:hover{background:#fff;border-color:#e0e0e0}
.fp-field-item:active{cursor:grabbing;background:#e6f1fb}
.fp-zones{padding:7px 6px;border-top:1px solid #e8e8e8}
.fp-zone{margin-bottom:7px}
.fp-zone-label{font-size:9px;font-weight:600;color:#aaa;text-transform:uppercase;letter-spacing:.07em;margin-bottom:3px;padding-left:2px}
.fp-zone-drop{min-height:28px;border:1px dashed #ccc;border-radius:5px;padding:3px 4px;display:flex;flex-wrap:wrap;gap:3px;transition:background .12s,border-color .12s}
.fp-zone-drop.fp-drag-over{background:#e6f1fb;border-color:#185FA5;border-style:solid}
.fp-chip{display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 7px;border-radius:12px;background:#fff;border:1px solid #ddd;cursor:grab;white-space:nowrap;user-select:none}
.fp-chip:active{cursor:grabbing}
.fp-chip-rm{margin-left:2px;opacity:.4;cursor:pointer;font-size:9px;line-height:1;border:none;background:none;padding:0;color:inherit}
.fp-chip-rm:hover{opacity:1}
.fp-chip select{font-size:9px;border:none;background:transparent;padding:0;cursor:pointer;color:#666;outline:none;max-width:38px}
.fp-main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.fp-toolbar{display:flex;align-items:center;gap:7px;padding:6px 10px;border-bottom:1px solid #e8e8e8;flex-wrap:wrap;background:#fafafa}
.fp-toolbar input,.fp-toolbar select{font-size:11px;height:26px;border:1px solid #ccc;border-radius:5px;background:#fff;padding:0 7px}
.fp-toolbar label{font-size:11px;color:#555;display:flex;align-items:center;gap:4px;cursor:pointer}
.fp-toolbar-sep{width:1px;height:16px;background:#e0e0e0;margin:0 2px}
.fp-content{flex:1;overflow:auto}
.fp-status{padding:4px 10px;border-top:1px solid #e8e8e8;font-size:10px;color:#999;display:flex;gap:14px;background:#f7f8fa}
.fp-empty{padding:3rem 2rem;text-align:center;color:#bbb;font-size:12px}
.fp-table{width:100%;border-collapse:collapse}
.fp-table thead th{font-size:11px;font-weight:600;padding:7px 10px;text-align:left;border-bottom:1px solid #e0e0e0;background:#f7f8fa;color:#666;white-space:nowrap;position:sticky;top:0;z-index:1;cursor:pointer;user-select:none}
.fp-table thead th:hover{color:#111}
.fp-table thead th.fp-num,.fp-table tbody td.fp-num{text-align:right}
.fp-table tbody td{font-size:12px;padding:6px 10px;border-bottom:1px solid #f0f0f0;white-space:nowrap}
.fp-table tbody tr:last-child td{border-bottom:none}
.fp-table tbody tr:hover td{background:#fafafa}
.fp-table tbody tr.fp-total-row td{font-weight:600;background:#f4f4f4;border-top:1px solid #e0e0e0}
.fp-bar-cell{position:relative}
.fp-bar-bg{position:absolute;left:0;top:0;bottom:0;background:#e6f1fb;z-index:0;pointer-events:none}
.fp-bar-cell span{position:relative;z-index:1}
.fp-chart-wrap{padding:14px}
`;

  /* ─── Helpers ──────────────────────────────────────────────────────────── */
  function injectCSS(id) {
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') e.className = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    });
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(c => {
        if (c == null) return;
        e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
      });
    }
    return e;
  }

  function agg(values, type) {
    if (!values.length) return 0;
    if (type === 'count') return values.length;
    if (type === 'sum') return values.reduce((a, b) => a + b, 0);
    if (type === 'avg') return +(values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
    if (type === 'min') return Math.min(...values);
    if (type === 'max') return Math.max(...values);
    return values.length;
  }

  /* ─── frazPivot Class ──────────────────────────────────────────────────── */
  class frazPivot {
    /**
     * @param {string|HTMLElement} container  CSS selector or DOM element
     * @param {Object}             options
     * @param {string[]}           options.fields      Field names (column headers)
     * @param {string[]}           options.numericFields  Fields to treat as numeric
     * @param {Array[]}            options.data         Row arrays matching fields order
     * @param {string[]}           [options.rows]       Initial row fields
     * @param {string[]}           [options.cols]       Initial column fields
     * @param {string[]}           [options.vals]       Initial value fields
     * @param {string}             [options.height]     Container height (default '600px')
     * @param {boolean}            [options.showToolbar]   (default true)
     * @param {boolean}            [options.showChart]     (default true)
     */
    constructor(container, options = {}) {
      injectCSS('frazpivot-styles');

      this._container = typeof container === 'string'
        ? document.querySelector(container)
        : container;

      if (!this._container) throw new Error('frazPivot: container not found');

      this._opts = Object.assign({
        fields: [],
        numericFields: [],
        data: [],
        rows: [],
        cols: [],
        vals: [],
        height: '600px',
        showToolbar: true,
        showChart: true,
      }, options);

      this._numSet = new Set(this._opts.numericFields);

      this._state = {
        rows: [...(this._opts.rows.length ? this._opts.rows : [this._opts.fields[0]])],
        cols: [...this._opts.cols],
        vals: [...(this._opts.vals.length ? this._opts.vals : this._opts.numericFields.slice(0, 1))],
        aggs: {},
        sort: { col: null, dir: -1 },
        view: 'grid',
      };

      this._dragField = null;
      this._dragZone = null;
      this._chartInstance = null;

      this._build();
      this._render();
    }

    /* ── Public API ─────────────────────────────────────────────────────── */

    /** Replace the dataset entirely */
    loadData(fields, numericFields, data) {
      this._opts.fields = fields;
      this._opts.numericFields = numericFields;
      this._opts.data = data;
      this._numSet = new Set(numericFields);
      this._state.rows = [fields[0]];
      this._state.cols = [];
      this._state.vals = [numericFields[0]];
      this._state.aggs = {};
      this._state.sort = { col: null, dir: -1 };
      this._rebuildSidebar();
      this._render();
    }

    /** Get current pivot result as array of objects */
    getPivotData() {
      return this._computeTable().tableData;
    }

    /** Programmatically set rows/cols/vals */
    setFields({ rows, cols, vals } = {}) {
      if (rows) this._state.rows = rows;
      if (cols) this._state.cols = cols;
      if (vals) this._state.vals = vals;
      this._rebuildSidebar();
      this._render();
    }

    /** Export current grid as CSV string */
    exportCSV() {
      const t = this._root.querySelector('.fp-table');
      if (!t) return '';
      return [...t.querySelectorAll('tr')]
        .map(r => [...r.querySelectorAll('th,td')]
          .map(c => `"${c.textContent.replace(/"/g, '""')}"`)
          .join(','))
        .join('\n');
    }

    /** Download CSV file */
    downloadCSV(filename = 'frazPivot_export.csv') {
      const csv = this.exportCSV();
      if (!csv) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
      a.download = filename;
      a.click();
    }

    /* ── Build DOM ──────────────────────────────────────────────────────── */
    _build() {
      this._container.innerHTML = '';
      this._root = el('div', { class: 'fp-root', style: `height:${this._opts.height}` });

      this._root.appendChild(this._buildHeader());

      const body = el('div', { class: 'fp-body' });
      this._sidebarEl = this._buildSidebar();
      body.appendChild(this._sidebarEl);

      this._mainEl = this._buildMain();
      body.appendChild(this._mainEl);

      this._root.appendChild(body);
      this._container.appendChild(this._root);
    }

    _buildHeader() {
      const hdr = el('div', { class: 'fp-header' });

      const logo = el('div', { class: 'fp-logo' }, [
        el('div', { class: 'fp-logo-mark' }, 'fP'),
        el('span', { class: 'fp-logo-name' }, 'frazPivot'),
        el('span', { class: 'fp-logo-ver' }, 'v1.0'),
      ]);
      hdr.appendChild(logo);

      const btns = el('div', { class: 'fp-hbtns' });

      if (this._opts.showChart) {
        this._btnGrid = el('button', { class: 'fp-active', onclick: () => this._setView('grid') }, '⊞ Grid');
        this._btnChart = el('button', { onclick: () => this._setView('chart') }, '▦ Chart');
        btns.appendChild(this._btnGrid);
        btns.appendChild(this._btnChart);
      }

      const expBtn = el('button', { onclick: () => this.downloadCSV() }, '↓ Export CSV');
      btns.appendChild(expBtn);

      hdr.appendChild(btns);
      return hdr;
    }

    _buildSidebar() {
      const sb = el('div', { class: 'fp-sidebar' });

      const head = el('div', { class: 'fp-sidebar-head' }, [
        el('span', { class: 'fp-sidebar-head-label' }, 'Fields'),
        el('span', { class: 'fp-legend' }, [
          el('span', {}, [el('span', { class: 'fp-dot fp-dot-num' }), ' num']),
          el('span', {}, [el('span', { class: 'fp-dot fp-dot-str' }), ' text']),
        ]),
      ]);
      sb.appendChild(head);

      this._fieldListEl = el('div', { class: 'fp-fields-list' });
      sb.appendChild(this._fieldListEl);

      const zones = el('div', { class: 'fp-zones' });
      ['rows', 'cols', 'vals'].forEach(z => {
        const zoneWrap = el('div', { class: 'fp-zone' });
        zoneWrap.appendChild(el('div', { class: 'fp-zone-label' }, z.charAt(0).toUpperCase() + z.slice(1)));
        const drop = el('div', { class: 'fp-zone-drop', id: `fp-drop-${z}` });
        drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('fp-drag-over'); });
        drop.addEventListener('dragleave', () => drop.classList.remove('fp-drag-over'));
        drop.addEventListener('drop', e => { e.preventDefault(); drop.classList.remove('fp-drag-over'); this._onDrop(z); });
        this[`_zone_${z}`] = drop;
        zoneWrap.appendChild(drop);
        zones.appendChild(zoneWrap);
      });
      sb.appendChild(zones);
      return sb;
    }

    _buildMain() {
      const main = el('div', { class: 'fp-main' });

      if (this._opts.showToolbar) {
        const tb = el('div', { class: 'fp-toolbar' });

        this._searchInput = el('input', { type: 'text', placeholder: 'Filter rows…', style: 'width:110px' });
        this._searchInput.addEventListener('input', () => this._render());
        tb.appendChild(this._searchInput);

        tb.appendChild(el('div', { class: 'fp-toolbar-sep' }));

        this._cbBars = el('input', { type: 'checkbox' });
        this._cbBars.addEventListener('change', () => this._render());
        tb.appendChild(el('label', {}, [this._cbBars, ' Data bars']));

        this._cbTotals = el('input', { type: 'checkbox', checked: '' });
        this._cbTotals.checked = true;
        this._cbTotals.addEventListener('change', () => this._render());
        tb.appendChild(el('label', {}, [this._cbTotals, ' Totals']));

        this._cbPct = el('input', { type: 'checkbox' });
        this._cbPct.addEventListener('change', () => this._render());
        tb.appendChild(el('label', {}, [this._cbPct, ' % of total']));

        tb.appendChild(el('div', { class: 'fp-toolbar-sep' }));

        this._topSel = el('select', { style: 'width:80px' });
        [['0', 'Show all'], ['5', 'Top 5'], ['10', 'Top 10'], ['20', 'Top 20']].forEach(([v, l]) => {
          const o = el('option', { value: v }, l);
          this._topSel.appendChild(o);
        });
        this._topSel.addEventListener('change', () => this._render());
        tb.appendChild(this._topSel);

        main.appendChild(tb);
      }

      this._contentEl = el('div', { class: 'fp-content' });
      main.appendChild(this._contentEl);

      this._statusEl = el('div', { class: 'fp-status' });
      this._statRows = el('span', {});
      this._statRecs = el('span', {});
      this._statSum = el('span', {});
      this._statusEl.appendChild(this._statRows);
      this._statusEl.appendChild(this._statRecs);
      this._statusEl.appendChild(this._statSum);
      main.appendChild(this._statusEl);

      return main;
    }

    /* ── Sidebar rebuild ────────────────────────────────────────────────── */
    _rebuildSidebar() {
      const used = new Set([...this._state.rows, ...this._state.cols, ...this._state.vals]);
      this._fieldListEl.innerHTML = '';
      this._opts.fields.forEach(f => {
        if (used.has(f)) return;
        const item = el('div', { class: 'fp-field-item', draggable: 'true' }, [
          el('span', { class: `fp-dot ${this._isNum(f) ? 'fp-dot-num' : 'fp-dot-str'}` }),
          el('span', { style: 'flex:1' }, f),
        ]);
        item.addEventListener('dragstart', e => { this._dragField = f; this._dragZone = 'pool'; e.dataTransfer.effectAllowed = 'move'; });
        item.addEventListener('dragend', () => { this._dragField = null; this._dragZone = null; });
        this._fieldListEl.appendChild(item);
      });

      ['rows', 'cols', 'vals'].forEach(z => {
        this[`_zone_${z}`].innerHTML = '';
        this._state[z].forEach(f => this[`_zone_${z}`].appendChild(this._makeChip(f, z)));
      });
    }

    _makeChip(f, z) {
      const chip = el('div', { class: 'fp-chip', draggable: 'true' });
      chip.addEventListener('dragstart', e => { this._dragField = f; this._dragZone = z; e.dataTransfer.effectAllowed = 'move'; });
      chip.addEventListener('dragend', () => { this._dragField = null; this._dragZone = null; });

      chip.appendChild(document.createTextNode(f));

      if (z === 'vals') {
        const aggTypes = this._isNum(f) ? ['sum', 'avg', 'min', 'max', 'count'] : ['count'];
        const sel = el('select');
        aggTypes.forEach(a => {
          const o = el('option', { value: a }, a);
          if (this._getAgg(f) === a) o.selected = true;
          sel.appendChild(o);
        });
        sel.addEventListener('click', e => e.stopPropagation());
        sel.addEventListener('change', e => { this._state.aggs[f] = e.target.value; this._render(); });
        chip.appendChild(sel);
      }

      const rm = el('button', { class: 'fp-chip-rm', title: 'Remove' }, '✕');
      rm.addEventListener('click', e => { e.stopPropagation(); this._removeField(f, z); });
      chip.appendChild(rm);
      return chip;
    }

    _removeField(f, z) {
      this._state[z] = this._state[z].filter(x => x !== f);
      this._rebuildSidebar();
      this._render();
    }

    _onDrop(z) {
      if (!this._dragField) return;
      if (this._dragZone && this._dragZone !== 'pool') {
        this._state[this._dragZone] = this._state[this._dragZone].filter(x => x !== this._dragField);
      }
      if (!this._state[z].includes(this._dragField)) this._state[z].push(this._dragField);
      this._rebuildSidebar();
      this._render();
    }

    /* ── Data computation ───────────────────────────────────────────────── */
    _isNum(f) { return this._numSet.has(f); }
    _fIdx(f) { return this._opts.fields.indexOf(f); }
    _getAgg(f) { return this._state.aggs[f] || (this._isNum(f) ? 'sum' : 'count'); }

    _computeTable() {
      const searchTxt = this._searchInput ? this._searchInput.value.toLowerCase() : '';
      const topN = this._topSel ? parseInt(this._topSel.value) || 0 : 0;

      let data = this._opts.data.filter(r =>
        !searchTxt || r.some(v => String(v).toLowerCase().includes(searchTxt))
      );

      const colVals = this._state.cols.length
        ? [...new Set(data.map(r => r[this._fIdx(this._state.cols[0])]))].sort()
        : null;
      const effectiveCols = colVals || ['_'];
      const valKeys = this._state.vals;

      const grouped = {};
      data.forEach(r => {
        const rk = this._state.rows.map(f => r[this._fIdx(f)]).join('\x00');
        const ck = this._state.cols.length ? r[this._fIdx(this._state.cols[0])] : '_';
        if (!grouped[rk]) grouped[rk] = {};
        if (!grouped[rk][ck]) grouped[rk][ck] = [];
        grouped[rk][ck].push(r);
      });

      let tableData = Object.entries(grouped).map(([rk, cdata]) => ({
        keys: rk.split('\x00'),
        cells: Object.fromEntries(effectiveCols.flatMap(cv => valKeys.map(vf => {
          const rs = cdata[cv] || [];
          const nums = rs.map(r => r[this._fIdx(vf)]);
          return [`${cv}|${vf}`, agg(this._isNum(vf) ? nums : nums, this._getAgg(vf))];
        }))),
      }));

      if (this._state.sort.col) {
        tableData.sort((a, b) => {
          const av = a.cells[this._state.sort.col] ?? 0;
          const bv = b.cells[this._state.sort.col] ?? 0;
          return (av < bv ? -1 : av > bv ? 1 : 0) * this._state.sort.dir;
        });
      }

      if (topN > 0) tableData = tableData.slice(0, topN);

      const grandTotals = {};
      effectiveCols.forEach(cv => valKeys.forEach(vf => {
        const k = `${cv}|${vf}`;
        grandTotals[k] = agg(tableData.map(r => r.cells[k]).filter(v => typeof v === 'number'), 'sum');
      }));

      const colMaxes = {};
      effectiveCols.forEach(cv => valKeys.forEach(vf => {
        const k = `${cv}|${vf}`;
        colMaxes[k] = Math.max(...tableData.map(r => r.cells[k] ?? 0), 0.001);
      }));

      return { tableData, effectiveCols, colVals, valKeys, grandTotals, colMaxes, recordCount: data.length };
    }

    _fmt(v, f) {
      if (typeof v !== 'number') return String(v);
      if (f === 'Margin%') return v.toFixed(1) + '%';
      if (f === 'Tenure') return v.toFixed(1);
      return Number.isInteger(v) ? v.toLocaleString() : v.toFixed(2);
    }

    /* ── Render ─────────────────────────────────────────────────────────── */
    _setView(v) {
      this._state.view = v;
      if (this._btnGrid) this._btnGrid.classList.toggle('fp-active', v === 'grid');
      if (this._btnChart) this._btnChart.classList.toggle('fp-active', v === 'chart');
      this._render();
    }

    _render() {
      if (!this._state.rows.length || !this._state.vals.length) {
        this._contentEl.innerHTML = '<div class="fp-empty">Drag fields from the left panel into Rows and Values to build your pivot.</div>';
        this._statRows.textContent = '';
        this._statRecs.textContent = '';
        this._statSum.textContent = '';
        return;
      }

      this._rebuildSidebar();
      const computed = this._computeTable();

      if (this._state.view === 'chart') {
        this._renderChart(computed);
      } else {
        this._renderGrid(computed);
      }

      const { tableData, effectiveCols, valKeys, grandTotals, recordCount } = computed;
      const firstKey = `${effectiveCols[0]}|${valKeys[0]}`;
      this._statRows.textContent = `${tableData.length} row${tableData.length !== 1 ? 's' : ''}`;
      this._statRecs.textContent = `${recordCount} records`;
      this._statSum.textContent = valKeys[0] ? `${valKeys[0]}: ${this._fmt(grandTotals[firstKey], valKeys[0])}` : '';
    }

    _renderGrid({ tableData, effectiveCols, colVals, valKeys, grandTotals, colMaxes }) {
      if (this._chartInstance) { this._chartInstance.destroy(); this._chartInstance = null; }

      const showBars = this._cbBars ? this._cbBars.checked : false;
      const showTotals = this._cbTotals ? this._cbTotals.checked : true;
      const showPct = this._cbPct ? this._cbPct.checked : false;

      const table = el('table', { class: 'fp-table' });
      const thead = el('thead');
      const hrow = el('tr');

      this._state.rows.forEach(f => {
        hrow.appendChild(el('th', {}, f));
      });

      effectiveCols.forEach(cv => valKeys.forEach(vf => {
        const k = `${cv}|${vf}`;
        const label = (colVals ? `${cv} · ` : '') + vf;
        const sortIndicator = this._state.sort.col === k
          ? (this._state.sort.dir === 1 ? ' ↑' : ' ↓')
          : ' ⇅';
        const th = el('th', { class: 'fp-num' }, label + sortIndicator);
        th.addEventListener('click', () => {
          if (this._state.sort.col === k) this._state.sort.dir *= -1;
          else Object.assign(this._state.sort, { col: k, dir: -1 });
          this._render();
        });
        hrow.appendChild(th);
      }));

      if (showPct && !colVals) hrow.appendChild(el('th', { class: 'fp-num' }, '% of total'));
      thead.appendChild(hrow);
      table.appendChild(thead);

      const tbody = el('tbody');
      tableData.forEach(row => {
        const tr = el('tr');
        row.keys.forEach(k => tr.appendChild(el('td', {}, k)));
        effectiveCols.forEach(cv => valKeys.forEach(vf => {
          const k = `${cv}|${vf}`;
          const v = row.cells[k];
          const td = el('td', { class: 'fp-num' });
          if (showBars && typeof v === 'number') {
            td.className = 'fp-num fp-bar-cell';
            const pct = Math.round((v / colMaxes[k]) * 100);
            const bar = el('div', { class: 'fp-bar-bg', style: `width:${pct}%` });
            td.appendChild(bar);
            td.appendChild(el('span', {}, this._fmt(v, vf)));
          } else {
            td.textContent = this._fmt(v, vf);
          }
          tr.appendChild(td);
        }));
        if (showPct && !colVals && valKeys.length) {
          const k = `_|${valKeys[0]}`;
          const v = row.cells[k];
          const tot = grandTotals[k];
          tr.appendChild(el('td', { class: 'fp-num' }, tot > 0 ? (v / tot * 100).toFixed(1) + '%' : '—'));
        }
        tbody.appendChild(tr);
      });

      if (showTotals && tableData.length > 1) {
        const tr = el('tr', { class: 'fp-total-row' });
        this._state.rows.forEach((f, i) => tr.appendChild(el('td', {}, i === 0 ? 'Grand Total' : '')));
        effectiveCols.forEach(cv => valKeys.forEach(vf => {
          const k = `${cv}|${vf}`;
          tr.appendChild(el('td', { class: 'fp-num' }, this._fmt(grandTotals[k], vf)));
        }));
        if (showPct && !colVals) tr.appendChild(el('td', { class: 'fp-num' }, '100%'));
        tbody.appendChild(tr);
      }

      table.appendChild(tbody);
      this._contentEl.innerHTML = '';
      this._contentEl.appendChild(table);
    }

    _renderChart({ tableData, effectiveCols, colVals, valKeys }) {
      if (this._chartInstance) { this._chartInstance.destroy(); this._chartInstance = null; }
      if (typeof Chart === 'undefined') {
        this._contentEl.innerHTML = '<div class="fp-empty">Chart.js not loaded. Add &lt;script src="https://cdn.jsdelivr.net/npm/chart.js"&gt;&lt;/script&gt; to your page.</div>';
        return;
      }
      const wrap = el('div', { class: 'fp-chart-wrap', style: 'height:100%' });
      const canvas = el('canvas', { id: 'fp-chart-canvas' });
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', 'Pivot chart');
      wrap.appendChild(canvas);
      this._contentEl.innerHTML = '';
      this._contentEl.appendChild(wrap);

      const labels = tableData.map(r => r.keys.join(' · '));
      const COLORS = ['#185FA5', '#1D9E75', '#D85A30', '#BA7517', '#534AB7', '#D4537E'];
      const datasets = [];
      if (colVals) {
        colVals.forEach((cv, ci) => valKeys.forEach(vf => {
          datasets.push({
            label: `${cv} · ${vf}`,
            data: tableData.map(r => r.cells[`${cv}|${vf}`] ?? 0),
            backgroundColor: COLORS[ci % COLORS.length] + '33',
            borderColor: COLORS[ci % COLORS.length],
            borderWidth: 1.5,
          });
        }));
      } else {
        valKeys.forEach((vf, vi) => {
          datasets.push({
            label: vf,
            data: tableData.map(r => r.cells[`_|${vf}`] ?? 0),
            backgroundColor: COLORS[vi % COLORS.length] + '33',
            borderColor: COLORS[vi % COLORS.length],
            borderWidth: 1.5,
          });
        });
      }

      this._chartInstance = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: { labels, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: datasets.length > 1, labels: { font: { size: 11 }, boxWidth: 10 } } },
          scales: { x: { ticks: { font: { size: 11 } } }, y: { ticks: { font: { size: 11 } } } },
        },
      });
    }
  }

  return frazPivot;
}));
