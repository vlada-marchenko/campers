"use client";

import CampersList from "../../components/CampersList/CampersList";
import css from "./Page.module.css";
import Filters from "../../components/Filters/Filters";
import { useState } from "react";
import { useCatalogStore } from "../../lib/store/catalogStore";
import { useEffect } from "react";

const vehicleTypes = [
  { key: "panelTruck", label: "Van", icon: "3s" },
  { key: "fullyIntegrated", label: "Fully Integrated", icon: "4s" },
  { key: "alcove", label: "Alcove", icon: "9s" },
];

export default function CatalogPageClient() {
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
  if (openFilters) {
    document.body.style.overflow = "hidden";  
  } else {
    document.body.style.overflow = "";        
  }
  return () => { document.body.style.overflow = ""; };
}, [openFilters]);

  const {
    city,
    setCity,
    selectedFeatures,
    toggleFeature,
    selectedVehicle,
    selectVehicle,
    onSearch,
    appliedCity,
    appliedFeatures,
    appliedVehicle,
  } = useCatalogStore();

  return (
    <div className={css.container}>
      <button
        type="button"
        className={css.filtersToggle} 
        onClick={() => setOpenFilters(true)} 
      >
        Filters
      </button>
      <section className={css.filtersStatic}>
        <Filters
          value={city}
          onChange={setCity}
          selectedFeatures={selectedFeatures}
          onToggleFeature={toggleFeature}
          vehicleTypes={vehicleTypes}
          selectedVehicle={selectedVehicle}
          onSelectVehicle={selectVehicle}
          onSearch={onSearch}
        />
      </section>
      {openFilters && (
        <>
          <div className={css.backdrop} onClick={() => setOpenFilters(false)} />
          <aside className={css.filtersOverlay} role="dialog" aria-modal="true">
            <button
              type="button"
              className={css.close}
              aria-label="Close filters"
              onClick={() => setOpenFilters(false)}
            >
              ✕
            </button>
            <Filters
              value={city}
              onChange={setCity}
              selectedFeatures={selectedFeatures}
              onToggleFeature={toggleFeature}
              vehicleTypes={vehicleTypes}
              selectedVehicle={selectedVehicle}
              onSelectVehicle={selectVehicle}
              onSearch={() => {
                onSearch();
                setOpenFilters(false);
              }}
            />
          </aside>
        </>
      )}

      <section>
        <CampersList
          city={appliedCity}
          selectedFeatures={appliedFeatures}
          selectedVehicle={appliedVehicle}
        />
      </section>
    </div>
  );
}
