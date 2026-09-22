// Keep page components separate from the entry point so hot updates reuse the root.
import React, { useEffect, useMemo, useRef, useState } from "react";
import { priceLabel } from "./prices";

import {
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  Aperture,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Database,
  ExternalLink,
  Feather,
  Filter,
  Focus,
  Grid2X2,
  Layers,
  Maximize,
  Plus,
  RotateCcw,
  Scale,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Table2,
  Telescope,
  Users,
  X,
} from "lucide-react";
import {
  aperture,
  brandFor,
  brands,
  fields,
  findLens,
  focal,
  latestCheck,
  lenses,
  priceText,
  statusText,
  value,
} from "./catalog";
import {
  defaults,
  PAGE_SIZE,
  parseQuery,
  presets,
  queryLenses,
  readSelection,
  serializeQuery,
  type Query,
} from "./query";
import type { Lens } from "./schema";
import coverageData from "./data/coverage.json";
import brandReviews from "./data/brand-review.json";
import "./styles.css";

type CoverageRecord = {
  brand: string;
  model: string;
  status: string;
  reason: string;
  url: string;
};
const coverage = coverageData as CoverageRecord[];
const validIds = new Set(lenses.map((l) => l.id));
const icons = [
  Layers,
  Aperture,
  Aperture,
  Users,
  Feather,
  Maximize,
  Telescope,
  Focus,
  Sparkles,
];

export default function App() {
  const [selected, setSelected] = useState<string[]>(() => {
    try {
      return readSelection(localStorage.getItem("lens-compare"), validIds);
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState("");
  const location = useLocation();
  useEffect(() => {
    try {
      localStorage.setItem("lens-compare", JSON.stringify(selected));
    } catch {
      /* local preferences are optional */
    }
  }, [selected]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timer);
  }, [toast]);
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
      return;
    }
    if (selected.length === 4) {
      setToast("最多对比 4 款镜头，请先移除一款。");
      return;
    }
    setSelected([...selected, id]);
  };
  return (
    <>
      <header className="site-header">
        <Link className="identity" to="/" aria-label="返回镜头库">
          <span className="logo">
            <Camera size={24} />
          </span>
          <span>
            <span className="site-name">
              <b>SONY FE</b> Lens DB <em>E-Mount FF</em>
            </span>
            <span className="tagline">
              全画幅镜头数据库 <span> / </span> 找到适合你的下一支镜头
            </span>
          </span>
        </Link>
        <nav className="header-actions" aria-label="网站导航">
          <span className="count-pill">
            <Database size={14} />
            已收录 <b>{lenses.length}</b> 款
          </span>
          <Link to="/coverage" aria-label="数据与来源">
            <ShieldCheck size={15} />
            <span>数据与来源</span>
          </Link>
          <span className="local-label">更新 {latestCheck}</span>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={<Catalog selected={selected} toggle={toggle} />}
        />
        <Route
          path="/lenses/:id"
          element={<Detail selected={selected} toggle={toggle} />}
        />
        <Route
          path="/compare"
          element={
            <Compare
              selected={selected}
              remove={(id) => setSelected((s) => s.filter((x) => x !== id))}
            />
          }
        />
        <Route path="/coverage" element={<Coverage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {selected.length > 0 && location.pathname !== "/compare" && (
        <div className="compare-dock">
          <div className="dock-label">
            <Scale size={19} />
            <strong>镜头对比</strong>
            <span>{selected.length} / 4</span>
          </div>
          <div className="dock-items">
            {selected.map((id) => (
              <button key={id} onClick={() => toggle(id)} title="移出对比">
                {findLens(id)?.name}
                <X size={13} />
              </button>
            ))}
          </div>
          <button
            className="text-button dock-clear"
            onClick={() => setSelected([])}
          >
            清空
          </button>
          <Link
            className="primary-button"
            to={`/compare?ids=${selected.join(",")}`}
          >
            开始对比
            <ArrowRight size={15} />
          </Link>
        </div>
      )}
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </>
  );
}

function Catalog({
  selected,
  toggle,
}: {
  selected: string[];
  toggle: (id: string) => void;
}) {
  const [params, setParams] = useSearchParams();
  const state = useMemo(() => parseQuery(params), [params]);
  const [search, setSearch] = useState(state.q);
  const [drawer, setDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const results = useMemo(() => queryLenses(lenses, state), [state]);
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(state.page, totalPages);
  const update = (patch: Partial<Query>, resetPage = true) =>
    setParams(
      serializeQuery({
        ...state,
        ...patch,
        page: resetPage ? 1 : (patch.page ?? state.page),
      }),
    );
  useEffect(() => setSearch(state.q), [state.q]);
  useEffect(() => {
    if (state.page !== page)
      setParams(serializeQuery({ ...state, page }), { replace: true });
  }, [page, state, setParams]);
  useEffect(() => {
    const ctx = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options: unknown,
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!ctx) return;
    const lifecycle = new AbortController();
    try {
      const registration = ctx.registerTool(
        {
          name: "search_lenses",
          description:
            "查询当前镜头库，返回已收录镜头的型号与核心规格，不改变页面状态。",
          inputSchema: {
            type: "object",
            properties: { query: { type: "string" } },
            required: ["query"],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: true },
          execute: (input: unknown) => {
            if (
              !input ||
              typeof input !== "object" ||
              !("query" in input) ||
              typeof input.query !== "string"
            )
              throw new Error("query 必须为字符串");
            return queryLenses(lenses, { ...defaults, q: input.query })
              .slice(0, 24)
              .map((l) => ({
                id: l.id,
                name: l.name,
                focal: focal(l),
                aperture: aperture(l),
                weight: l.weight,
              }));
          },
        },
        { signal: lifecycle.signal },
      );
      // Some browser implementations keep registration pending until abort.
      // A route change/StrictMode cleanup must not become an unhandled rejection.
      Promise.resolve(registration).catch(() => {});
    } catch {
      /* browser capability is optional */
    }
    return () => lifecycle.abort();
  }, []);
  const reset = () => {
    setSearch("");
    update({ ...defaults, view: state.view });
  };
  const applied: { label: string; clear: () => void }[] = [];
  if (state.q)
    applied.push({ label: `搜索：${state.q}`, clear: () => update({ q: "" }) });
  state.brands.forEach((id) =>
    applied.push({
      label: brandFor(id).name,
      clear: () => update({ brands: state.brands.filter((b) => b !== id) }),
    }),
  );
  if (state.preset !== "all")
    applied.push({
      label: presets.find((p) => p.id === state.preset)!.label,
      clear: () => update({ preset: "all" }),
    });
  const filterLabels: Partial<Record<keyof Query, string>> = {
    type: "镜头类型",
    focus: "对焦",
    oss: "防抖",
    focalMin: "焦距下限",
    focalMax: "焦距上限",
    apertureWide: "广角端光圈",
    apertureTele: "长焦端光圈",
    weight: "重量上限",
    filter: "滤镜口径",
    priceMin: "价格下限",
    priceMax: "价格上限",
    status: "销售状态",
  };
  const readable: Record<string, string> = {
    prime: "定焦",
    zoom: "变焦",
    yes: "支持",
    no: "无",
    current: "现售",
    discontinued: "停产",
    unknown: "待核验",
  };
  for (const [key, label] of Object.entries(filterLabels)) {
    const k = key as keyof Query;
    if (state[k] !== defaults[k])
      applied.push({
        label: `${label}：${readable[String(state[k])] ?? state[k]}`,
        clear: () => update({ [k]: defaults[k] }),
      });
  }
  const weights = results.filter((l) => l.weight != null);
  const avg = weights.length
    ? Math.round(weights.reduce((s, l) => s + l.weight!, 0) / weights.length)
    : null;
  return (
    <main className="catalog-page">
      <section className="search-section">
        <div className="presets">
          <span className="preset-heading">
            <Sparkles size={14} />
            快捷探索
          </span>
          {presets.map((p, i) => {
            const Icon = icons[i];
            return (
              <button
                className={`preset ${state.preset === p.id ? "active" : ""}`}
                key={p.id}
                title={p.rule}
                onClick={() =>
                  update({
                    ...defaults,
                    q: state.q,
                    view: state.view,
                    preset: p.id,
                  })
                }
              >
                <Icon size={14} />
                {p.label}
              </button>
            );
          })}
        </div>
        <form
          className="searchbox"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            update({ q: search });
          }}
        >
          <Search size={19} />
          <input
            aria-label="搜索镜头"
            placeholder="搜索型号、焦段、光圈、品牌，例如 35mm F1.4、适马、GM、24-70…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              aria-label="清空搜索"
              onClick={() => {
                setSearch("");
                update({ q: "" });
              }}
            >
              <X size={16} />
            </button>
          )}
          <button className="search-submit" type="submit">
            搜索<kbd>↵</kbd>
          </button>
        </form>
        <div className="result-summary">
          <p aria-live="polite">
            匹配 <strong>{results.length}</strong> 款镜头{" "}
            <span>/ 全库 {lenses.length} 款</span>
          </p>
          <span className="summary-right">
            {avg != null && (
              <>
                已知重量均值 <b>{avg}g</b>
                <i />{" "}
              </>
            )}
            数据核验 {latestCheck}
          </span>
        </div>
      </section>
      <div className={`workspace ${collapsed ? "sidebar-collapsed" : ""}`}>
        <aside className="desktop-sidebar">
          <Filters state={state} update={update} reset={reset} />
        </aside>
        <section className="results">
          <div className="results-toolbar">
            <div className="toolbar-left">
              <button
                className="filter-toggle"
                aria-label="筛选条件"
                onClick={() => {
                  if (matchMedia("(max-width: 850px)").matches) setDrawer(true);
                  else setCollapsed(!collapsed);
                }}
              >
                <SlidersHorizontal size={15} />
                <span>{collapsed ? "展开筛选" : "筛选条件"}</span>
                {applied.length > 0 && <b>{applied.length}</b>}
              </button>
              <span className="toolbar-divider" />
              <label className="sort-label">
                排序
                <select
                  aria-label="排序方式"
                  value={state.sort}
                  onChange={(e) =>
                    update({
                      sort: e.target.value,
                      dir: e.target.value === "release" ? "desc" : "asc",
                    })
                  }
                >
                  <option value="release">发布时间</option>
                  <option value="focal">最短焦距</option>
                  <option value="aperture">最大光圈（广角端）</option>
                  <option value="weight">镜头重量</option>
                  <option value="price">参考价格</option>
                </select>
              </label>
              <button
                className="icon-button sort-direction"
                title={
                  state.dir === "asc"
                    ? "当前升序，点击降序"
                    : "当前降序，点击升序"
                }
                aria-label="切换排序方向"
                onClick={() =>
                  update({ dir: state.dir === "asc" ? "desc" : "asc" })
                }
              >
                {state.dir === "asc" ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                )}
              </button>
            </div>
            <div className="view-toggle">
              <button
                aria-label="卡片视图"
                aria-pressed={state.view === "cards"}
                className={state.view === "cards" ? "active" : ""}
                onClick={() => update({ view: "cards" }, false)}
              >
                <Grid2X2 size={14} />
                <span>卡片视图</span>
              </button>
              <button
                aria-label="专业表格"
                aria-pressed={state.view === "table"}
                className={state.view === "table" ? "active" : ""}
                onClick={() => update({ view: "table" }, false)}
              >
                <Table2 size={14} />
                <span>专业表格</span>
              </button>
            </div>
          </div>
          {applied.length > 0 && (
            <div className="applied-filters">
              {applied.map((f) => (
                <button key={f.label} onClick={f.clear}>
                  {f.label}
                  <X size={12} />
                </button>
              ))}
              <button className="clear-applied" onClick={reset}>
                清空全部
              </button>
            </div>
          )}
          {state.preset !== "all" && (
            <p className="preset-description">
              <CircleHelp size={13} />
              {presets.find((p) => p.id === state.preset)?.rule}
            </p>
          )}
          {results.length === 0 ? (
            <div className="empty-state">
              <Search size={36} />
              <h2>暂时没有符合条件的镜头</h2>
              <p>试试减少筛选条件，或换一个品牌、型号关键词。</p>
              <button className="primary-button" onClick={reset}>
                清空筛选
              </button>
            </div>
          ) : state.view === "cards" ? (
            <div className="lens-grid">
              {results
                .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
                .map((l) => (
                  <LensCard
                    key={l.id}
                    lens={l}
                    selected={selected.includes(l.id)}
                    toggle={() => toggle(l.id)}
                  />
                ))}
            </div>
          ) : (
            <LensTable
              data={results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)}
              selected={selected}
              toggle={toggle}
            />
          )}
          {results.length > 0 && (
            <div className="pagination">
              <span>
                显示 {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, results.length)} / {results.length}{" "}
                款
              </span>
              <div>
                <button
                  aria-label="上一页"
                  disabled={page === 1}
                  onClick={() => update({ page: page - 1 }, false)}
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (n) =>
                      n === 1 || n === totalPages || Math.abs(n - page) <= 1,
                  )
                  .map((n, i, a) => (
                    <React.Fragment key={n}>
                      {i > 0 && n - a[i - 1] > 1 && <span>…</span>}
                      <button
                        className={n === page ? "active" : ""}
                        aria-label={`第 ${n} 页`}
                        aria-current={n === page ? "page" : undefined}
                        onClick={() => update({ page: n }, false)}
                      >
                        {n}
                      </button>
                    </React.Fragment>
                  ))}
                <button
                  aria-label="下一页"
                  disabled={page === totalPages}
                  onClick={() => update({ page: page + 1 }, false)}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
          <footer className="catalog-footer">
            <span>
              <ShieldCheck size={14} />
              参数来自厂商公开资料 · 缺失项不作推测
            </span>
            <Link to="/coverage">
              收录范围与数据说明
              <ArrowRight size={13} />
            </Link>
          </footer>
        </section>
      </div>
      {drawer && (
        <FilterDialog close={() => setDrawer(false)}>
          <Filters state={state} update={update} reset={reset} />
          <button
            className="primary-button drawer-apply"
            onClick={() => setDrawer(false)}
          >
            查看 {results.length} 款镜头
            <ArrowRight size={16} />
          </button>
        </FilterDialog>
      )}
    </main>
  );
}

function FilterDialog({
  close,
  children,
}: {
  close: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const active = document.activeElement as HTMLElement;
    const dialog = ref.current;
    dialog?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = old;
      active?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="filter-dialog"
      aria-label="多维条件筛选"
      onCancel={close}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
    >
      <button
        className="dialog-close icon-button"
        aria-label="关闭筛选"
        onClick={close}
      >
        <X size={20} />
      </button>
      {children}
    </dialog>
  );
}
function FilterGroup({
  title,
  children,
  hint,
}: {
  title: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <fieldset className="filter-group">
      <legend>{title}</legend>
      {children}
      {hint && <p className="filter-hint">{hint}</p>}
    </fieldset>
  );
}
function Segments({
  options,
  value,
  onChange,
}: {
  options: [string, string][];
  value: string;
  onChange: (s: string) => void;
}) {
  return (
    <div className="segments">
      {options.map(([id, label]) => (
        <button
          type="button"
          key={id}
          className={id === value ? "active" : ""}
          aria-pressed={id === value}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
function NumberFilter({
  value,
  label,
  placeholder,
  commit,
}: {
  value: string;
  label: string;
  placeholder: string;
  commit: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  return (
    <input
      type="number"
      min="0.01"
      step="any"
      aria-label={label}
      placeholder={placeholder}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        const clean =
          Number.isFinite(+draft) && +draft > 0 && +draft <= 1000000
            ? String(+draft)
            : "";
        setDraft(clean);
        if (clean !== value) commit(clean);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
      }}
    />
  );
}
function Filters({
  state: s,
  update,
  reset,
}: {
  state: Query;
  update: (p: Partial<Query>) => void;
  reset: () => void;
}) {
  const num = (key: keyof Query, label: string, placeholder: string) => (
    <NumberFilter
      key={key}
      value={String(s[key])}
      label={label}
      placeholder={placeholder}
      commit={(v) => update({ [key]: v })}
    />
  );
  return (
    <div className="filter-panel">
      <div className="filter-title">
        <h2>
          <Filter size={16} />
          多维条件筛选
        </h2>
        <button onClick={reset} title="重置所有筛选">
          <RotateCcw size={12} />
          重置
        </button>
      </div>
      <FilterGroup title="品牌 / 厂商">
        <div className="brand-options">
          <button
            className={!s.brands.length ? "active" : ""}
            onClick={() => update({ brands: [] })}
          >
            全部品牌 <span>{lenses.length}</span>
          </button>
          {brands.map((b) => (
            <button
              className={s.brands.includes(b.id) ? "active" : ""}
              aria-pressed={s.brands.includes(b.id)}
              key={b.id}
              title={`${b.name} ${b.en}`}
              onClick={() =>
                update({
                  brands: s.brands.includes(b.id)
                    ? s.brands.filter((id) => id !== b.id)
                    : [...s.brands, b.id],
                })
              }
            >
              {b.name}
              <small>{b.en}</small>
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="镜头类型">
        <Segments
          value={s.type}
          options={[
            ["all", "全部"],
            ["prime", "定焦"],
            ["zoom", "变焦"],
          ]}
          onChange={(type) => update({ type })}
        />
      </FilterGroup>
      <div className="filter-twins">
        <FilterGroup title="对焦方式">
          <Segments
            value={s.focus}
            options={[
              ["all", "全部"],
              ["AF", "自动 AF"],
              ["MF", "手动 MF"],
            ]}
            onChange={(focus) => update({ focus })}
          />
        </FilterGroup>
        <FilterGroup title="光学防抖">
          <Segments
            value={s.oss}
            options={[
              ["all", "全部"],
              ["yes", "支持防抖"],
              ["no", "无防抖"],
            ]}
            onChange={(oss) => update({ oss })}
          />
        </FilterGroup>
      </div>
      <FilterGroup title="焦距范围" hint="与所选焦段有交集即匹配 · 单位 mm">
        <div className="focal-presets">
          {[
            ["", "全部"],
            ["24", "≤24mm"],
            ["35", "35mm"],
            ["50", "50mm"],
            ["85", "85mm"],
            ["135", "135mm"],
            ["200", "≥200mm"],
          ].map(([v, t]) => (
            <button
              key={t}
              onClick={() =>
                update(
                  v === "24"
                    ? { focalMin: "", focalMax: "24" }
                    : v === "200"
                      ? { focalMin: "200", focalMax: "" }
                      : { focalMin: v, focalMax: v },
                )
              }
            >
              {t}
            </button>
          ))}
        </div>
        <div className="range-inputs">
          {num("focalMin", "最短焦距", "最短")}
          <span>—</span>
          {num("focalMax", "最长焦距", "最长")}
          <span>mm</span>
        </div>
      </FilterGroup>
      <FilterGroup title="最大光圈" hint="F 值不高于所选数值">
        <div className="labeled-select">
          <label>
            广角端
            <select
              aria-label="广角端最大光圈"
              value={s.apertureWide}
              onChange={(e) => update({ apertureWide: e.target.value })}
            >
              <option value="">不限</option>
              {[1.2, 1.4, 1.8, 2, 2.8, 4, 5.6, 8].map((v) => (
                <option key={v} value={v}>
                  ≤ F{v}
                </option>
              ))}
            </select>
          </label>
          <label>
            长焦端
            <select
              aria-label="长焦端最大光圈"
              value={s.apertureTele}
              onChange={(e) => update({ apertureTele: e.target.value })}
            >
              <option value="">不限</option>
              {[1.2, 1.4, 1.8, 2, 2.8, 4, 5.6, 8].map((v) => (
                <option key={v} value={v}>
                  ≤ F{v}
                </option>
              ))}
            </select>
          </label>
        </div>
      </FilterGroup>
      <FilterGroup title="镜头重量">
        <select
          aria-label="镜头重量上限"
          value={s.weight}
          onChange={(e) => update({ weight: e.target.value })}
        >
          <option value="">不限重量</option>
          {[250, 350, 500, 750, 1000, 1500, 3000].map((v) => (
            <option key={v} value={v}>
              ≤ {v}g
            </option>
          ))}
        </select>
      </FilterGroup>
      <FilterGroup title="滤镜口径">
        <select
          aria-label="滤镜口径"
          value={s.filter}
          onChange={(e) => update({ filter: e.target.value })}
        >
          <option value="">全部口径</option>
          {[
            ...new Set(
              lenses
                .map((l) => l.filterSize)
                .filter((x): x is number => x != null),
            ),
          ]
            .sort((a, b) => a - b)
            .map((v) => (
              <option key={v} value={v}>
                Φ {v}mm
              </option>
            ))}
        </select>
      </FilterGroup>
      <FilterGroup title="参考价格" hint="仅筛选已有人民币报价的型号">
        <div className="range-inputs">
          {num("priceMin", "最低价格", "最低")}
          <span>—</span>
          {num("priceMax", "最高价格", "最高")}
          <span>元</span>
        </div>
      </FilterGroup>
      <FilterGroup title="销售状态">
        <select
          aria-label="销售状态"
          value={s.status}
          onChange={(e) => update({ status: e.target.value })}
        >
          <option value="all">全部状态</option>
          <option value="current">现售</option>
          <option value="discontinued">已停产</option>
          <option value="unknown">待核验</option>
        </select>
      </FilterGroup>
      <div className="sidebar-note">
        <Database size={18} />
        <p>
          每一项参数，都有出处。
          <Link to="/coverage">
            查看数据覆盖情况
            <ArrowRight size={12} />
          </Link>
        </p>
      </div>
    </div>
  );
}
function BrandBadge({ lens }: { lens: Lens }) {
  const b = brandFor(lens.brand);
  return (
    <span className="brand-badge" style={{ background: b.color }}>
      {b.en.toUpperCase()}
    </span>
  );
}
function Tags({ lens: l }: { lens: Lens }) {
  return (
    <div className="tags">
      {l.focus !== "unknown" && (
        <span className={l.focus === "AF" ? "af" : "mf"}>
          {l.focus === "AF" ? "AF 自动" : "MF 手动"}
        </span>
      )}
      {l.stabilization && <span className="oss">光学防抖</span>}
      {l.filterSize && <span>Φ{l.filterSize}</span>}
      {l.series === "GM" && <span className="gm">G Master</span>}
      {l.macro && <span className="macro">微距</span>}
    </div>
  );
}
function LensCard({
  lens: l,
  selected,
  toggle,
}: {
  lens: Lens;
  selected: boolean;
  toggle: () => void;
}) {
  return (
    <article className={`lens-card ${selected ? "is-selected" : ""}`}>
      <div className="card-top">
        <div>
          <BrandBadge lens={l} />
          <span className="release-date">
            {l.releaseDate?.replace(/-/g, ".") ?? "日期待核验"}
          </span>
        </div>
        <button
          className="add-compare"
          aria-label={`${selected ? "移出" : "加入"}对比 ${l.name}`}
          aria-pressed={selected}
          onClick={toggle}
        >
          {selected ? <Check size={12} /> : <Plus size={12} />}
          <span>{selected ? "已选择" : "对比"}</span>
        </button>
      </div>
      <Link className="lens-title" to={`/lenses/${l.id}`}>
        {l.name}
      </Link>
      <div className="key-specs">
        <div>
          <span>焦距</span>
          <strong>{focal(l)}</strong>
        </div>
        <div>
          <span>最大光圈</span>
          <strong className="aperture-value">{aperture(l)}</strong>
        </div>
        <div>
          <span>重量</span>
          <strong>
            {l.weight == null ? (
              "—"
            ) : (
              <>
                {l.weight}
                <small> g</small>
              </>
            )}
          </strong>
        </div>
      </div>
      <Tags lens={l} />
      <div className="card-measurements">
        <div className="measurement-heading">
          <Focus size={14} />
          <span>近摄能力</span>
          <small>官方规格</small>
        </div>
        <div className="measure-row">
          <span>最近对焦距离</span>
          <strong>
            {l.minFocus == null ? (
              "—"
            ) : (
              <>
                {l.minFocus}
                <small> m</small>
              </>
            )}
          </strong>
        </div>
        <div className="measure-row">
          <span>最大放大倍率</span>
          <strong>
            {l.maxMagnification == null ? (
              "—"
            ) : (
              <>
                {l.maxMagnification}
                <small> ×</small>
              </>
            )}
          </strong>
        </div>
        <div className="dimension-row">
          <span>镜身尺寸</span>
          <span>
            {l.diameter && l.length
              ? `Φ${l.diameter} × ${l.length} mm`
              : "暂无数据"}
          </span>
        </div>
      </div>
      <div className="card-bottom">
        <div>
          <span>{priceLabel(l.price)}</span>
          <strong className={!l.price ? "no-price" : ""}>{priceText(l)}</strong>
        </div>
        <Link to={`/lenses/${l.id}`}>
          查看详情
          <ChevronRight size={14} />
        </Link>
      </div>
    </article>
  );
}
function LensTable({
  data,
  selected,
  toggle,
}: {
  data: Lens[];
  selected: string[];
  toggle: (id: string) => void;
}) {
  return (
    <div className="table-scroll">
      <table className="lens-table">
        <thead>
          <tr>
            <th>镜头型号</th>
            <th>焦距</th>
            <th>最大光圈</th>
            <th>重量</th>
            <th>对焦</th>
            <th>防抖</th>
            <th>参考价格</th>
            <th>对比</th>
          </tr>
        </thead>
        <tbody>
          {data.map((l) => (
            <tr key={l.id}>
              <td>
                <BrandBadge lens={l} />
                <Link to={`/lenses/${l.id}`}>{l.name}</Link>
              </td>
              <td>{focal(l)}</td>
              <td>{aperture(l)}</td>
              <td>{value(l.weight, "g")}</td>
              <td>{l.focus === "unknown" ? "—" : l.focus}</td>
              <td>
                {l.stabilization == null
                  ? "—"
                  : l.stabilization
                    ? "支持"
                    : "无"}
              </td>
              <td>{priceText(l)}</td>
              <td>
                <button
                  className={`table-compare ${selected.includes(l.id) ? "active" : ""}`}
                  aria-label={`对比 ${l.name}`}
                  aria-pressed={selected.includes(l.id)}
                  onClick={() => toggle(l.id)}
                >
                  {selected.includes(l.id) ? (
                    <Check size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BackLink() {
  return (
    <Link className="back-link" to="/">
      <ArrowLeft size={16} />
      返回镜头库
    </Link>
  );
}
function Detail({
  selected,
  toggle,
}: {
  selected: string[];
  toggle: (id: string) => void;
}) {
  const { id } = useParams();
  const l = findLens(id ?? "");
  useEffect(() => {
    if (l) document.title = `${l.name} · SONY FE Lens DB`;
    return () => {
      document.title = "SONY FE Lens DB · 全画幅镜头数据库";
    };
  }, [l]);
  if (!l) return <NotFound />;
  return (
    <main className="subpage">
      <BackLink />
      <section className="detail-hero">
        <div>
          <div className="eyebrow">
            <BrandBadge lens={l} />
            <span>{l.model}</span>
          </div>
          <h1>{l.name}</h1>
          <p>{brandFor(l.brand).name} · 原生 Sony E 卡口 · 全画幅</p>
          <Tags lens={l} />
        </div>
        <div className="detail-actions">
          <span>{priceLabel(l.price)}</span>
          <strong>{priceText(l)}</strong>
          <button className="primary-button" onClick={() => toggle(l.id)}>
            {selected.includes(l.id) ? <Check size={16} /> : <Plus size={16} />}{" "}
            {selected.includes(l.id) ? "已加入对比" : "加入镜头对比"}
          </button>
        </div>
      </section>
      <div className="detail-layout">
        <section className="surface">
          <h2>
            <SlidersHorizontal size={18} />
            完整规格
          </h2>
          <dl className="spec-list">
            {fields.map((f) => (
              <div key={f.key}>
                <dt>{f.label}</dt>
                <dd>{f.get(l)}</dd>
              </div>
            ))}
          </dl>
        </section>
        <aside className="detail-side">
          <section className="surface">
            <h2>
              <ShieldCheck size={18} />
              资料与核验
            </h2>
            <p className="source-status">
              {l.verification === "verified"
                ? "主要规格已核验"
                : "型号已确认，部分参数待补齐"}
            </p>
            {l.sources.map((s) => (
              <a
                className="source-link"
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noreferrer"
              >
                {s.title}
                <ExternalLink size={14} />
                <small>核验于 {s.checkedAt}</small>
              </a>
            ))}
            {[...(l.price ? [l.price] : []), ...(l.priceHistory ?? [])].map(
              (p, i) => (
                <a
                  key={`${p.source.url}-${i}`}
                  className="source-link"
                  href={p.source.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {i > 0 ? "历史参考 · " : ""}
                  {priceLabel(p)} · ¥{p.amount.toLocaleString("zh-CN")}
                  <ExternalLink size={14} />
                  <small>
                    {p.type === "submitted" ? "录入于" : "采集于"}{" "}
                    {p.collectedAt} · 不代表实时成交价
                    {p.conditions ? ` · ${p.conditions}` : ""}
                  </small>
                </a>
              ),
            )}
          </section>
          <section className="surface">
            <h2>
              <CircleHelp size={18} />
              参数说明
            </h2>
            <ul className="notes">
              <li>
                重量、尺寸以 Sony E
                卡口版本为准。光学防抖指镜头防抖，不包含机身防抖。
              </li>
              {l.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
              <li>
                暂无数据表示尚未核实，不等于不支持。销售状态：{statusText(l)}。
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
function Compare({
  selected,
  remove,
}: {
  selected: string[];
  remove: (id: string) => void;
}) {
  const [params, setParams] = useSearchParams();
  const [differences, setDifferences] = useState(false);
  const raw = params.get("ids");
  const ids =
    raw === null
      ? selected
      : [...new Set(raw.split(",").filter((id) => validIds.has(id)))].slice(
          0,
          4,
        );
  const data = ids.map((id) => findLens(id)!);
  const removeItem = (id: string) => {
    remove(id);
    setParams({ ids: ids.filter((x) => x !== id).join(",") });
  };
  return (
    <main className="subpage">
      <BackLink />
      <div className="page-heading">
        <div>
          <span className="eyebrow">SIDE BY SIDE</span>
          <h1>把选择，看得更清楚。</h1>
          <p>统一规格，横向对比。最多选择 4 款镜头。</p>
        </div>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={differences}
            onChange={(e) => setDifferences(e.target.checked)}
          />
          只看差异
        </label>
      </div>
      {!data.length ? (
        <div className="empty-state">
          <Scale size={38} />
          <h2>还没有选择镜头</h2>
          <p>回到镜头库，点击卡片上的「＋ 对比」。</p>
          <Link className="primary-button" to="/">
            浏览镜头
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <>
          <div className="compare-scroll">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>
                    <Scale size={23} />
                    <span>镜头参数</span>
                    <small>{data.length} 款镜头</small>
                  </th>
                  {data.map((l) => (
                    <th key={l.id}>
                      <button
                        className="remove-lens"
                        aria-label={`移除 ${l.name}`}
                        onClick={() => removeItem(l.id)}
                      >
                        <X size={15} />
                      </button>
                      <BrandBadge lens={l} />
                      <Link to={`/lenses/${l.id}`}>{l.name}</Link>
                      <span className="compare-price">{priceText(l)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fields
                  .filter(
                    (f) =>
                      !differences ||
                      new Set(data.map((l) => f.get(l))).size > 1,
                  )
                  .map((f) => {
                    const diff = new Set(data.map((l) => f.get(l))).size > 1;
                    return (
                      <tr className={diff ? "different" : ""} key={f.key}>
                        <th>
                          {f.label}
                          {diff && <span className="difference-dot" />}
                        </th>
                        {data.map((l) => (
                          <td key={l.id}>{f.get(l)}</td>
                        ))}
                      </tr>
                    );
                  })}
                <tr>
                  <th>资料来源</th>
                  {data.map((l) => (
                    <td key={l.id}>
                      <a
                        className="inline-link"
                        href={l.sources[0].url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        厂家规格
                        <ExternalLink size={12} />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="comparison-note">
            橙色标记表示参数存在差异，不代表性能优劣。未知值不参与优劣判断。
          </p>
        </>
      )}
    </main>
  );
}
function Coverage() {
  const counts = brands.map((b) => ({
    ...b,
    items: lenses.filter((l) => l.brand === b.id),
    pending: coverage.filter((c) => c.brand === b.id && c.status === "pending"),
    excluded: coverage.filter(
      (c) => c.brand === b.id && c.status === "excluded",
    ),
  }));
  return (
    <main className="subpage">
      <BackLink />
      <div className="page-heading">
        <div>
          <span className="eyebrow">DATA & SOURCES</span>
          <h1>有据可查，才能放心比较。</h1>
          <p>记录每个型号的出处，也如实记录尚未补齐的部分。</p>
        </div>
        <span className="count-pill">
          <Database size={16} />
          {lenses.length} 款已收录
        </span>
      </div>
      <div className="coverage-intro surface">
        <ShieldCheck size={25} />
        <div>
          <h2>原生 E 卡口 · 全画幅摄影镜头</h2>
          <p>
            包括自动与手动对焦、现售与停产型号；排除 APS-C、A
            卡口、转接方案、增距镜和专用电影镜头。当前镜头库仍在补齐，不代表市场全量。核验日期：
            {latestCheck}。
          </p>
        </div>
      </div>
      <div className="table-scroll coverage-table">
        <table>
          <thead>
            <tr>
              <th>品牌</th>
              <th>已收录</th>
              <th>主要规格已核验</th>
              <th>信息不全</th>
              <th>待核验</th>
              <th>已排除</th>
            </tr>
          </thead>
          <tbody>
            {counts.map((b) => (
              <tr key={b.id}>
                <td>
                  <strong>{b.name}</strong>
                  <span>{b.en}</span>
                </td>
                <td>{b.items.length}</td>
                <td>
                  {b.items.filter((l) => l.verification === "verified").length}
                </td>
                <td>
                  {b.items.filter((l) => l.verification === "partial").length}
                </td>
                <td>{b.pending.length}</td>
                <td>{b.excluded.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="coverage-notes">
        <section className="surface">
          <h2>怎样阅读这些数据</h2>
          <ul className="notes">
            <li>
              “主要规格已核验”指重量、尺寸、近摄和光学结构等主要规格齐全，不代表价格、发布日期及销售状态全部已知。
            </li>
            <li>
              “信息不全”指已确认卡口、画幅和型号身份，但部分参数仍然缺失。
            </li>
            <li>
              价格区分商家页面价、官方公开价、上市指导价与用户提供参考价。用户提供参考价未经独立网页核验，显示日期为录入日；其他报价也仅供参考，优惠、配送地区、库存及结算价以商家页面为准。历史指导价在详情中保留。
            </li>
            <li>无法确认的数值显示“暂无数据”，不会根据相似型号补造。</li>
          </ul>
        </section>
        <section className="surface">
          <h2>更新与覆盖边界</h2>
          <p>
            资料保存在本地，浏览和筛选无需连接厂家网站。厂商的新品、停产和规格修订需要重新核验后更新。
          </p>
          <p>
            多个卡口的镜头只采用 E
            卡口版本。不同代际保留为独立记录；品牌来源中的别名不重复计数。
          </p>
          <p>
            目前已核查的品牌与待核验项目列在下方，长尾品牌和历史型号仍可能存在遗漏。
          </p>
        </section>
      </div>
      <section className="surface brand-review-list">
        <h2>逐品牌清点范围</h2>
        {brandReviews.map((review) => (
          <details key={review.brand}>
            <summary>
              {brandFor(review.brand).name} · {brandFor(review.brand).en}
            </summary>
            <p>{review.scope}</p>
            <p>{review.limits}</p>
            <a
              className="inline-link"
              href={review.url}
              target="_blank"
              rel="noreferrer"
            >
              厂家目录或系列资料 <ExternalLink size={13} />
            </a>
          </details>
        ))}
      </section>
      <section className="surface coverage-audit">
        <h2>待核验与排除记录</h2>
        {coverage.length ? (
          <div className="audit-list">
            {coverage.map((c, i) => (
              <div key={i}>
                <span className={`audit-status ${c.status}`}>
                  {c.status === "excluded" ? "已排除" : "待核验"}
                </span>
                <div>
                  <strong>
                    {brandFor(c.brand).name} · {c.model}
                  </strong>
                  <p>{c.reason}</p>
                </div>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${c.model} 来源`}
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>暂无独立待核验记录。</p>
        )}
      </section>
    </main>
  );
}
function NotFound() {
  return (
    <main className="subpage">
      <BackLink />
      <div className="empty-state">
        <Search size={38} />
        <h1>没有找到这款镜头</h1>
        <p>链接可能已变更，请返回镜头库重新查找。</p>
        <Link className="primary-button" to="/">
          返回镜头库
        </Link>
      </div>
    </main>
  );
}
