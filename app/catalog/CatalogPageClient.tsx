'use client'

import CampersList from "../../components/CampersList/CampersList";
import { fetchCampers } from "../../lib/api";
import css from './Page.module.css'
import Filters from "../../components/Filters/Filters";
import { useState } from "react";
import { Camper } from "../../types/camper";
import { useCatalogStore } from "../../lib/store/catalogStore";

const vehicleTypes = [
  { key: "panelTruck", label: "Van", icon: "3s" },
  { key: "fullyIntegrated", label: "Fully Integrated", icon: "4s" },
  { key: "alcove", label: "Alcove", icon: "9s" },
]

export default function CatalogPageClient() {

const { city, setCity, selectedFeatures, toggleFeature, selectedVehicle, selectVehicle, onSearch, appliedCity, appliedFeatures, appliedVehicle } = useCatalogStore()

  return (
  <div className={css.container}>
    <section>
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
    <section >
       <CampersList 
        city={appliedCity}
        selectedFeatures={appliedFeatures}
        selectedVehicle={appliedVehicle}/> 
    </section>
  </div>
  );
}