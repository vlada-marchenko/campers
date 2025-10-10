import { fetchCamperById } from "../../lib/api"
import { useQuery } from "@tanstack/react-query"
import css from './Reviews.module.css'
import Image from "next/image"
import Icon from "../Icon/Icon"

type Props = {
    camperId: number
}

export default function Reviews({ camperId }: Props) {

    const { data: camper, isLoading, error } = useQuery({
    queryKey: ['reviews', camperId],
    queryFn: () => fetchCamperById(camperId),
    refetchOnMount: false
    })

    if (isLoading) return <p>Loading, please wait...</p>
    if (error) return  <p>Something went wrong.</p>
    if (!camper?.reviews?.length) return <p>No reviews yet.</p>
    
    return (
        <div className={css.container}>
                <ul className={css.list}>
                    {camper.reviews.map((review, index) => (
                       <li key={index} className={css.item}>
                        <div className={css.reviewer}>
                         <div className={css.avatar}>
                           {review.reviewer_name?.[0]?.toUpperCase() ?? '?'}
                         </div>
                        <div className={css.nameBlock}>
                            <span className={css.name}>{review.reviewer_name}</span>
                            <div className={css.stars}>
                                 {Array.from({ length: 5 }).map((_, i) => (
                                  <Icon
                                   key={i}
                                   name={i < (review.reviewer_rating ?? 0) ? 'yelstar' : 'star'}
                                   width={16}
                                   height={16}
                             />
                        ))}
                        </div>
                          </div>
                        </div>
                        <p className={css.description}>{review.comment}</p>
                       </li>
                    ))}
                </ul>
        </div>
    )
}