'use client'

import css from './CamperDetails.module.css'
import Icon from '../../../components/Icon/Icon'
import { useState, useEffect } from 'react';
import type { Camper } from '../../../types/camper';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { fetchCamperById } from '../../../lib/api';
import Image from 'next/image';
import Features from '../../../components/Features/Features';
import Reviews from '../../../components/Reviews/Reviews';

type Props = {
    camperId: number
}

export default function CamperDetails({ camperId }: Props) {

    const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features')

    const {data: camper, isLoading, error} = useQuery({
        queryKey:['camper', camperId],
        queryFn: () => fetchCamperById(camperId),
        refetchOnMount: false
    });

    if(isLoading) return <p>Loading, please wait...</p>
    if(error || !camper) return <p>Something went wrong.</p>
    

        const count = camper.reviews?.length ?? 0;
        const total = (camper.reviews ?? []).reduce((sum, r) => sum + r.reviewer_rating, 0);
        const avg = count ? (total / count).toFixed(1) : '0.0';

    return (
        <div className={css.container}>
            <div className={css.mainInfo}>
                <h2 className={css.name}>{camper.name}</h2>
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
            </div>
            <div className={css.price}>
                  <p className={css.textPrice}>&euro;{camper.price}</p>
                </div>
            <div className={css.imgContainer}>
               {camper.gallery.map((img, index) => (
                <Image key={index} src={img.original} alt={`${camper.name} photo ${index+1}`} width={292} height={312} className={css.img} />
               ))}
            </div>
            <div>
                <p className={css.description}>{camper.description}</p>
            </div>
        <div className={css.containerInfo}>
        <div className={css.btnGroup}>
        <button
          className={activeTab === "features" ? css.btnActive : css.btnInactive}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={activeTab === "reviews" ? css.btnActive : css.btnInactive}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      <hr className={css.divider}/>

      <div className={css.cardContainer}>
        {activeTab === "features" && (
        <Features camperId={camperId}/>    
        )}
        {activeTab === "reviews"  && (
        <Reviews camperId={camperId}/>
        )} 
      </div>
    </div>
        </div>
    )
    }
