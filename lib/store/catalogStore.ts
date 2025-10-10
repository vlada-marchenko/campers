import { create } from 'zustand';

type CatalogStore = {
    city: string
    selectedFeatures: Set<string>
    selectedVehicle: string | null
    page: number
    appliedCity: string
    appliedFeatures: Set<string>
    appliedVehicle: string | null

    setCity: (value: string) => void
    toggleFeature: (key: string) => void
    selectVehicle: (key: string | null) => void
    resetPage: () => void
    nextPage: () => void
    onSearch: () => void
}

export const useCatalogStore = create<CatalogStore>((set) => ({
    city: '',
    selectedFeatures: new Set<string>(),
    selectedVehicle: null,
    page:1,
    appliedCity: '',
    appliedFeatures: new Set<string>(),
    appliedVehicle: null,
    setCity: (value) => set({city: value}),
    toggleFeature: (key) => 
        set((s) => {
            const next = new Set(s.selectedFeatures)
            next.has(key) ? next.delete(key) : next.add(key)
            return { selectedFeatures: next}
        }),
    selectVehicle: (key) => set({ selectedVehicle: key }),
    resetPage: () => set({ page: 1}),
    nextPage: () => set((s) => ({ page: s.page + 1})),
    onSearch: () =>
    set((s) => ({
      page: 1,
      appliedCity: s.city,
      appliedFeatures: new Set(s.selectedFeatures),
      appliedVehicle: s.selectedVehicle,
    })),
}))
