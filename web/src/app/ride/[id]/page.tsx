"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { sampleRides } from "@/lib/sampleData";
import { getBookings, getUserRides, saveBookings } from "@/lib/storage";
import type { Booking, Ride } from "@/lib/types";

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    cents / 100
  );
}

export default function RideDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [userRides, setUserRides] = useState<Ride[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [seats, setSeats] = useState(1);

  useEffect(() => {
    setUserRides(getUserRides());
    setBookings(getBookings());
  }, []);

  const ride = useMemo(() => {
    const all = [...userRides, ...sampleRides];
    return all.find((r) => r.id === params.id);
  }, [params.id, userRides]);

  if (!ride) {
    return (
      <main className="mx-auto max-w-md px-4 py-10">
        <p className="text-center text-sm text-zinc-600">Ride not found.</p>
      </main>
    );
  }

  const alreadyBooked = bookings.some((b) => b.rideId === ride.id);

  function handleBook() {
    if (!ride) return;
    const b: Booking = {
      id: Math.random().toString(36).slice(2),
      rideId: ride.id,
      passengerName: "You",
      seats: Math.max(1, seats),
      bookedAtIso: new Date().toISOString(),
    };
    const next = [b, ...bookings];
    setBookings(next);
    saveBookings(next);
    alert("Booking confirmed!");
    router.push("/trips");
  }

  return (
    <main className="mx-auto max-w-md px-4 py-4">
      <button className="mb-3 text-sm text-sky-700" onClick={() => router.back()}>
        ? Back
      </button>
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">
            {ride.from} ? {ride.to}
          </h1>
          <div className="text-sky-600">{formatCurrency(ride.priceCents)}</div>
        </div>
        <div className="mt-1 text-sm text-zinc-600">{new Date(ride.departureTimeIso).toLocaleString()}</div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
          <div>Driver: {ride.driverName}</div>
          <div>Seats: {ride.seatsAvailable}</div>
          {ride.vehicle ? <div className="col-span-2">Vehicle: {ride.vehicle}</div> : null}
          {ride.notes ? <div className="col-span-2">Notes: {ride.notes}</div> : null}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-base font-semibold">Book this ride</h2>
        {alreadyBooked ? (
          <p className="text-sm text-emerald-700">You have already booked this ride.</p>
        ) : (
          <div className="flex items-center gap-3">
            <label className="text-sm">Seats</label>
            <input
              type="number"
              min={1}
              max={ride.seatsAvailable}
              value={seats}
              onChange={(e) => setSeats(Math.max(1, Number(e.target.value) || 1))}
              className="w-24 rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
            <button
              className="ml-auto rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm active:scale-[0.99]"
              onClick={handleBook}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
