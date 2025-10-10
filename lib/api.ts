import type {Camper} from '../types/camper'
import axios from 'axios';


const BASE_URL = process.env.NEXT_PUBLIC_API


export async function fetchCampers(): Promise<Camper[]> {
    try {
        const { data } = await axios.get<Camper[]>(`${BASE_URL}`)
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch campers')
    }
}

export async function fetchCamperById(id: number): Promise<Camper> {
    try {
        const { data } = await axios.get<Camper>(`${BASE_URL}/${id}`)
        return data;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch camper')
    }
}