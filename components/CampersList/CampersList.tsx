'use client'

import type { Camper } from "../../types/camper"
import Link from "next/link"
import css from './CampersList.module.css'
import Image from "next/image"
import Icon from "../Icon/Icon"
import axios from "axios"
import { useEffect, useState } from "react"

type CampersListProps = {
  city: string
  selectedFeatures: Set<string>
  selectedVehicle: string | null
}

const PAGE_SIZE = 4;

export default function CampersList({ city, selectedFeatures, selectedVehicle }: CampersListProps) {
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

const [items, setItems] = useState<Camper[]>([]);
const [total, setTotal] = useState(0)
const [page, setPage] = useState(1)
const [loading, setLoading] = useState(false)

const [favs, setFavs] = useState<string[]>(() => {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('favorite_campers') : null
    return raw ? JSON.parse(raw) as string[] : [] 
  } catch {
    return []
  }
})

useEffect(() => {
  try {
    localStorage.setItem('favorite_campers', JSON.stringify(favs))
  } catch {}
}, [favs])

const toggleFav = (id: string) => setFavs(prev => prev.includes(id) ? prev.filter(x => x !== id): [...prev, id])

useEffect(() => {
  setPage(1)
  setItems([])
  setTotal(0)
}, [city, selectedFeatures, selectedVehicle])

useEffect(() => {
  const load = async () => {
    try {
      setLoading(true); 
      const featuresParam = Array.from(selectedFeatures).join(',');
      const res = await axios.get('/api/campers', {
          params: {
            city,
            vehicle: selectedVehicle ?? '',
            features: featuresParam,
            page,
            pageSize: PAGE_SIZE,
          },
        });
        const { items: slice, total } = res.data 
      setItems(prev => page === 1 ? slice : [...prev, ...slice]);
      setTotal(total)
    } catch (err) {
      console.error('Failed to fetch campers', err);
    } finally {
      setLoading(false)
    }
  };
  load();
}, [city, selectedFeatures, selectedVehicle, page]);

  if (loading && items.length === 0) return <p>Loading...</p>;
  if(!items || items.length === 0) return <p>No campers match your filters.</p>

  const hasMore = items.length < total;

  return ( 
    <div className={css.container}>
    <ul className={css.list}>
      {items.map(camper => {
        const count = camper.reviews?.length ?? 0;
        const total = (camper.reviews ?? []).reduce((sum, r) => sum + r.reviewer_rating, 0);
        const avg = count ? (total / count).toFixed(1) : '0.0';
        const liked = favs.includes(camper.id)
        return (
          <li key={camper.id} className={css.listItem}>
            <Image src={camper.gallery[0].original} alt={camper.name} width={292} height={320} className={css.img}/>
            <div>
              <div className={css.mainInfo}>
                <h2 className={css.name}>{camper.name}</h2>
                <div className={css.price}>
                  <p className={css.textPrice}>&euro;{camper.price}</p>
                  <span
  className={`${css.like} ${liked ? css.likeActive : css.likeInactive}`}
  onClick={() => toggleFav(camper.id)}
  role="button"
  aria-pressed={liked}
  aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
  tabIndex={0}
>
  <Icon name="like" width={26} height={24} />
                  </span>
                </div>
              </div>
              <div className={css.info}>
                <div className={css.infoCont}>
                  <Icon name={'yelstar'} width={16} height={16} className={css.star}/>
                  <p className={css.infoText}>{avg} ({count} Reviews)</p>
                </div>
                <div className={css.infoCont}>
                  <Icon name={'wall'} width={16} height={16}/>
                  <p className={css.infoText}>{camper.location}</p>
                </div>
              </div>
              <p className={css.description}>{camper.description}</p>
              <ul className={css.categoryList}>
                {features.map(feature =>
                  (camper as any)[feature.key] ? (
                    <li key={feature.key} className={css.categoryItem}>
                      <div className={css.itemContent}>
                        <Icon name={feature.icon} width={20} height={20}/>
                        <span className={css.itemText}>{feature.label}</span>
                      </div>
                    </li>
                  ) : null
                )}
              </ul>
              <Link href={`/catalog/${camper.id}`} className={css.button}>Show more</Link>
            </div>
          </li>
        );
      })}
    </ul>
    {hasMore && (
        <div className={css.loadMoreWrap}>
          <button
            type="button"
            className={css.loadMoreBtn}
            onClick={() => setPage(p => p + 1)}
            disabled={loading}
          >
            Load more
          </button>
        </div>
    )}
    </div>
  )}; 