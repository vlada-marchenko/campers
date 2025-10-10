import { useQuery } from '@tanstack/react-query';
import { fetchCamperById } from '../../lib/api';
import css from './Features.module.css';
import Icon from '../Icon/Icon';
import { Camper } from '../../types/camper';

type Props = {
    camperId: number
}


export default function Features({ camperId }: Props) {

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
] as const; 

const details = [
  { key: 'form', label: 'Form' },
  { key: 'length', label: 'Length' },
  { key: 'width', label: 'Width' },
  { key: 'height', label: 'Height' },
  { key: 'tank', label: 'Tank' },
  { key: 'consumption', label: 'Consumption' },
  { key: 'transmission', label: 'Transmission' },
  { key: 'engine', label: 'Engine' },
] as const; 


        const {data: camper, isLoading, error} = useQuery<Camper>({
        queryKey:['camper', camperId],
        queryFn: () => fetchCamperById(camperId),
        refetchOnMount: false
        });

        if(!camper) return null
        if (isLoading) return <p>Loading, please wait...</p>
        if (error) return  <p>Something went wrong.</p>

        return (
            <div className={css.container}>
              <ul className={css.categoryList}>
                {features.map(feature =>
                  (
                    <li key={feature.key} className={css.categoryItem}>
                      <div className={css.itemContent}>
                        <Icon name={feature.icon} width={20} height={20}/>
                        <span className={css.itemText}>{feature.label}</span>
                      </div>
                    </li>
                  ) 
                )}
              </ul>
              <div className={css.box}>
                <h3 className={css.title}>Vehicle details</h3>
                <hr className={css.divider}/>
                <ul className={css.detailsList}>
                    {details.map(({key, label}) => (
                        <li key={key} className={css.item}>
                            <div className={css.row}>
                                <span>{label}</span>
                                <span>{camper[key]}</span>
                            </div>
                        </li>
                    ))}
                </ul>
              </div>
            </div>
        )
}