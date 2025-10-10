import { NextResponse } from "next/server";
import type { Camper } from "../../../types/camper";

const api = process.env.NEXT_PUBLIC_API!; 

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const city = (searchParams.get('city') ?? '').trim().toLowerCase()
  const vehicle = searchParams.get('vehicle') || ''
  const featuresParam = searchParams.get('features') || ''
  const page = Number(searchParams.get('page') || '1')
  const pageSize = Number(searchParams.get('pageSize') || '4')

  const upstream = await fetch(api)
  if (!upstream.ok) return NextResponse.json({ items: [], total: 0 }, { status: 200 })
  const data = await upstream.json()

  const campers: Camper[] = Array.isArray(data.items) ? data.items : Array.isArray(data) ? data : []

  const featureKeys = featuresParam
    .split(',')
    .map(set => set.trim())
    .filter(Boolean)

  const filtered = campers.filter((camper) => {
    const cityOk = city ? (camper.location ?? '').toLowerCase().includes(city) : true
    const vehicleOk = vehicle ? camper.form === vehicle : true
    const featuresOk = featureKeys.length === 0
      ? true
      : featureKeys.every((k) => Boolean((camper as any)[k]))
    return cityOk && vehicleOk && featuresOk
  })

  const total = filtered.length
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)

  return NextResponse.json({ items, total })
}
