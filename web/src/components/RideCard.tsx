"use client";

import Link from "next/link";
import { Ride } from "@/lib/types";

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    cents / 100
  );
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  }).format(d);
}

export function RideCard({ ride }: { ride: Ride }) {
  return (
    <Link
      href={`/ride/${ride.id}`}
      className="block rounded-xl border border-zinc-200 p-4 shadow-sm transition active:scale-[0.99]"
    >
      <div className="flex items-center justify-between">
        <div className="text-base font-semibold">{ride.from} ? {ride.to}</div>
        <div className="text-sm font-medium text-sky-600">{formatCurrency(ride.priceCents)}</div>
      </div>
      <div className="mt-1 text-sm text-zinc-600">{formatTime(ride.departureTimeIso)}</div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <div className="text-zinc-700">?? {ride.driverName}</div>
        <div className="text-zinc-700">?? {ride.seatsAvailable} seats</div>
      </div>
      {ride.vehicle ? <div className="mt-1 text-xs text-zinc-500">{ride.vehicle}</div> : null}
    </Link>
  );
}
