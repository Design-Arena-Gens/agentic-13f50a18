"use client";

import { useEffect, useMemo, useState } from "react";
import { getBookings, getUserRides } from "@/lib/storage";
import type { Booking, Ride } from "@/lib/types";

export default function TripsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    setBookings(getBookings());
    setRides(getUserRides());
  }, []);

  const upcomingBookings = useMemo(() => bookings, [bookings]);

  return (
    <main className="mx-auto max-w-md px-4 py-4">
      <h1 className="mb-4 text-xl font-semibold">Your trips</h1>

      <section className="mb-6">
        <h2 className="mb-2 text-base font-semibold">Bookings</h2>
        {upcomingBookings.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-600">
            You have no bookings.
          </div>
        ) : (
          <ul className="space-y-2">
            {upcomingBookings.map((b) => (
              <li key={b.id} className="rounded-xl border border-zinc-200 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Booking ID: {b.id}</div>
                  <div className="text-zinc-600">Seats: {b.seats}</div>
                </div>
                <div className="text-xs text-zinc-500">Booked at {new Date(b.bookedAtIso).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold">Offered rides</h2>
        {rides.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-600">
            You haven't offered any rides yet.
          </div>
        ) : (
          <ul className="space-y-2">
            {rides.map((r) => (
              <li key={r.id} className="rounded-xl border border-zinc-200 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {r.from} ? {r.to}
                  </div>
                  <div className="text-zinc-600">{new Date(r.departureTimeIso).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
