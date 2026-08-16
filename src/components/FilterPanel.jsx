import React, { useState } from 'react';
import pageStyles from '../styles/pageStyles';

function FilterPanel({ search, setSearch, area, setArea, category, setCategory, date, setDate, areas }) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <>
      <div className="dedicated-filter-panel desktop-filter-panel" style={{ backgroundColor: '#090d14', border: `1px solid ${pageStyles.border}`, padding: '24px', marginBottom: '36px', boxSizing: 'border-box', width: '100%' }}>
        <div className="dedicated-filter-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '12px', minWidth: 0 }}>
          <div className="dedicated-filter-field">
            <label className="dedicated-filter-label">Buscar</label>
            <input className="dedicated-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Palabras clave, título..." style={{ backgroundColor: '#0d131f', border: '1px solid rgba(148,163,184,0.25)', color: '#f8fafc', padding: '14px 15px', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.9rem' }} />
          </div>
          <div className="dedicated-filter-field dedicated-select-wrap">
            <label className="dedicated-filter-label">Área</label>
            <select className="dedicated-input dedicated-select" value={area} onChange={(e) => setArea(e.target.value)} style={{ backgroundColor: '#0d131f', border: '1px solid rgba(148,163,184,0.25)', color: '#f8fafc', padding: '14px 15px', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.9rem' }}>
              <option value="Todas">Todas las áreas</option>
              {areas.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div className="dedicated-filter-field dedicated-select-wrap">
            <label className="dedicated-filter-label">Categoría</label>
            <select className="dedicated-input dedicated-select" value={category} onChange={(e) => setCategory(e.target.value)} style={{ backgroundColor: '#0d131f', border: '1px solid rgba(148,163,184,0.25)', color: '#f8fafc', padding: '14px 15px', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.9rem' }}>
              <option value="Todas">Todas las categorías</option>
              <option value="Comercial">Derecho Comercial</option>
              <option value="Otra área">Otras áreas</option>
            </select>
          </div>
          <div className="dedicated-filter-field">
            <label className="dedicated-filter-label">Fecha</label>
            <input className="dedicated-input dedicated-date-filter" type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ backgroundColor: '#0d131f', border: '1px solid rgba(148,163,184,0.25)', color: '#f8fafc', padding: '14px 15px', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.9rem' }} />
          </div>
        </div>
      </div>

      <div className="lc-mobile-filter-strip" aria-label="Filtros de contenido">
        <div className="lc-mobile-filter-track">
          <div className={`lc-mobile-filter-search ${mobileSearchOpen ? 'is-open' : ''}`}>
            {!mobileSearchOpen ? (
              <button type="button" className="lc-mobile-filter-search-button" onClick={() => setMobileSearchOpen(true)} aria-label="Abrir búsqueda">
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M16 16l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </button>
            ) : (
              <>
                <svg className="lc-mobile-filter-search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M16 16l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                <input autoFocus type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." aria-label="Buscar palabras clave o título" />
                <button type="button" className="lc-mobile-filter-close" onClick={() => { setSearch(''); setMobileSearchOpen(false); }} aria-label="Cerrar búsqueda">×</button>
              </>
            )}
          </div>

          <label className="lc-mobile-filter-pill lc-mobile-select-pill">
            <span>Área</span>
            <select value={area} onChange={(e) => setArea(e.target.value)} aria-label="Filtrar por área">
              <option value="Todas">Todas las áreas</option>
              {areas.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </label>

          <label className="lc-mobile-filter-pill lc-mobile-select-pill">
            <span>Categoría</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filtrar por categoría">
              <option value="Todas">Todas</option>
              <option value="Comercial">Comercial</option>
              <option value="Otra área">Otras áreas</option>
            </select>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </label>

          <label className="lc-mobile-filter-pill lc-mobile-date-pill">
            <span>Fecha</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Filtrar por fecha" />
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 3.5v4M16 3.5v4M4 9h16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </label>
        </div>
        <div className="lc-mobile-filter-fade" aria-hidden="true" />
      </div>

      <style>{`
        .lc-mobile-filter-strip { display: none; }
        @media (max-width: 768px) {
          .desktop-filter-panel { display: none !important; }
          .lc-mobile-filter-strip {
            display: block !important;
            position: relative !important;
            width: 100% !important;
            height: 58px !important;
            margin: 0 0 22px !important;
            padding: 6px 0 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            background: transparent !important;
            border: 0 !important;
          }
          .lc-mobile-filter-track {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            width: 100% !important;
            min-width: 0 !important;
            height: 46px !important;
            padding: 0 34px 0 8px !important;
            box-sizing: border-box !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            -webkit-overflow-scrolling: touch !important;
            overscroll-behavior-x: contain !important;
            touch-action: pan-x !important;
            scrollbar-width: none !important;
          }
          .lc-mobile-filter-track::-webkit-scrollbar { display: none !important; }
          .lc-mobile-filter-search,
          .lc-mobile-filter-pill {
            flex: 0 0 auto !important;
            height: 44px !important;
            box-sizing: border-box !important;
            border: 1px solid rgba(148,163,184,.24) !important;
            background: #0d131f !important;
            color: #dbe6f4 !important;
          }
          .lc-mobile-filter-search {
            width: 44px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            border-radius: 50% !important;
            overflow: hidden !important;
            transition: width 260ms cubic-bezier(.22,1,.36,1) !important;
          }
          .lc-mobile-filter-search.is-open { width: 190px !important; justify-content: flex-start !important; border-radius: 22px !important; }
          .lc-mobile-filter-search-button { width: 42px !important; height: 42px !important; flex: 0 0 42px !important; display: flex !important; align-items: center !important; justify-content: center !important; background: transparent !important; border: 0 !important; color: #a7b8ce !important; padding: 0 !important; }
          .lc-mobile-filter-search-button svg { width: 19px !important; height: 19px !important; }
          .lc-mobile-filter-search-icon { width: 17px !important; height: 17px !important; flex: 0 0 17px !important; margin-left: 13px !important; color: #9eb1c9 !important; }
          .lc-mobile-filter-search input { width: 100% !important; min-width: 0 !important; height: 42px !important; background: transparent !important; border: 0 !important; outline: 0 !important; color: #f8fafc !important; padding: 0 6px !important; font: 400 .8rem/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif !important; }
          .lc-mobile-filter-search input::placeholder { color: #78899f !important; }
          .lc-mobile-filter-close { width: 31px !important; height: 42px !important; flex: 0 0 31px !important; border: 0 !important; background: transparent !important; color: #8fa4be !important; font-size: 21px !important; line-height: 1 !important; }
          .lc-mobile-filter-pill { position: relative !important; display: flex !important; align-items: center !important; border-radius: 22px !important; padding: 0 30px 0 13px !important; width: 132px !important; }
          .lc-mobile-filter-pill span { position: absolute !important; left: 13px !important; top: 5px !important; font: 600 .45rem/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif !important; letter-spacing: .16em !important; text-transform: uppercase !important; color: #7892b2 !important; pointer-events: none !important; }
          .lc-mobile-filter-pill select,
          .lc-mobile-filter-pill input { width: 100% !important; min-width: 0 !important; height: 42px !important; padding: 11px 0 0 !important; margin: 0 !important; border: 0 !important; outline: 0 !important; background: transparent !important; color: #dbe6f4 !important; font: 400 .76rem/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif !important; appearance: none !important; -webkit-appearance: none !important; }
          .lc-mobile-filter-pill select { color-scheme: dark !important; }
          .lc-mobile-filter-pill input[type="date"] { color-scheme: dark !important; padding-right: 0 !important; }
          .lc-mobile-filter-pill input[type="date"]::-webkit-calendar-picker-indicator { opacity: .58; filter: invert(72%) sepia(10%) saturate(450%) hue-rotate(175deg); }
          .lc-mobile-filter-pill svg { position: absolute !important; right: 10px !important; top: 50% !important; width: 13px !important; height: 13px !important; transform: translateY(-25%) !important; color: #8fa4be !important; pointer-events: none !important; }
          .lc-mobile-date-pill { width: 126px !important; }
          .lc-mobile-filter-fade { position: absolute !important; top: 0 !important; right: 0 !important; width: 26px !important; height: 100% !important; pointer-events: none !important; background: linear-gradient(90deg, rgba(9,13,20,0), rgba(9,13,20,.92) 82%) !important; }
        }
      `}</style>
    </>
  );
}


export default FilterPanel;
