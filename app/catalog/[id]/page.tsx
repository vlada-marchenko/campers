import CamperDetails from "./CamperDetails.client"
import { fetchCamperById } from "../../../lib/api"
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query"
import type { Metadata } from "next"

export interface PageParams {
  id: string,
}

type Props = {
  params: Promise<PageParams>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const { id } = await params
  const camperId = Number(id)
  const camper = await fetchCamperById(camperId)
  
  return {
    title: camper.name,
    description: camper.description
  }
}


export default async function CamperPage({
  params
}: { params: Promise<PageParams>}) {
  const {id} = await params
  const camperId = Number(id)

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['camper', camperId],
    queryFn: () => fetchCamperById(camperId)
  })

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <CamperDetails camperId={camperId}/>
    </HydrationBoundary>
  )
}