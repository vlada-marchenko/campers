import css from './Filters.module.css'
import Icon from '../Icon/Icon'

type VehicleItem = { key: string; label: string; icon: string };

type FilterProps = {
value?: string,
onChange: (val: string) => void,
placeholder?: string,
selectedFeatures: Set<string>,
onToggleFeature: (key: string) => void,
vehicleTypes: VehicleItem[],
selectedVehicle: string | null,
onSelectVehicle: (key: string | null) => void,
onSearch: () => void 
}

export default function Filters({value = '', onChange, placeholder = 'City', selectedFeatures,
  onToggleFeature, vehicleTypes, selectedVehicle, onSelectVehicle, onSearch}: FilterProps) {
const features = [
  { key: 'transmission', label: 'Automatic', icon: 'diagram' },
  { key: 'AC', label: 'AC', icon: 'ac' },
  { key: 'engine', label: 'Petrol', icon: 'petrol' },
  { key: 'kitchen', label: 'Kitchen', icon: 'cup' },
  { key: 'radio', label: 'Radio', icon: 'radio' },
  { key: 'bathroom', label: 'Bathroom', icon: 'shower' },
  { key: 'refrigerator', label: 'Refrigerator', icon: 'fridge' },
  { key: 'microwave', label: 'Microwave', icon: 'microwave' },
  { key: 'gas', label: 'Gas', icon: 'gas' },
  { key: 'water', label: 'Water', icon: 'water' },
];

    return (
        <div className={css.container}>
            <div className={css.location}>
                <label htmlFor='location' className={css.locationText}>Location</label>
                <div className={css.field}>
                <input id='location' type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={css.input}/>
                <Icon name='wall' width={20} height={20} className={css.icon}/>
                </div>
            </div>
            <h4 className={css.filterText}>Filters</h4>
            <div>
                <h3 className={css.vehicleTitle}>Vehicle equipment</h3>
                <hr className={css.divider}/>
        <ul className={css.categoryList}>
          {features.map(feature => {
            const checked = selectedFeatures.has(feature.key);
            return (
              <li key={feature.key} className={`${css.categoryItem} ${checked ? css.active : ''}`}>
                <label className={css.itemContent}>
                  <input
                    type="checkbox"
                    className={css.checkbox}
                    name={`feature-${feature.key}`}
                    value={feature.key}
                    checked={checked}
                    onChange={() => onToggleFeature(feature.key)}
                  />
                  <Icon name={feature.icon} width={32} height={32}/>
                  <span className={css.itemText}>{feature.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
            </div>
            <div className={css.radioGroup} aria-labelledby="vt-label">
  <h3 id="vt-label" className={css.vehicleTitle}>Vehicle type</h3>
  <hr className={css.divider}/>
  <ul className={css.vehicleList}>
    {vehicleTypes.map(v => (
      <li key={v.key} className={`${css.vehicleItem} ${selectedVehicle === v.key ? css.active : ''}`}>
        <label className={css.radioRow}>
          <input
            type="radio"
            name="vehicleType"
            value={v.key}
            checked={selectedVehicle === v.key}
            onChange={() => onSelectVehicle(v.key)}
            className={css.radio}
          />
          <Icon name={v.icon} width={32} height={32} />
          <span className={css.vehicleLabel}>{v.label}</span>
        </label>
      </li>
    ))}
  </ul>
</div>
      <button type="button" className={css.searchBtn} onClick={onSearch}>
        Search
      </button>
        </div>
    )
}