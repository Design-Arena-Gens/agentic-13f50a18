"use client";

import { useEffect, useState } from "react";
import { getUserRides, saveUserRides } from "@/lib/storage";
import type { Ride } from "@/lib/types";

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function OfferPage() {
  const [rides, setRides] = useState<Ride[]>([]);

  const [form, setForm] = useState({
    driverName: "",
    from: "",
    to: "",
    date: "",
    time: "",
    seatsAvailable: 3,
    priceCents: 10000,
    vehicle: "",
    notes: "",
  });

  useEffect(() => {
    setRides(getUserRides());
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const departure = new Date(`${form.date}T${form.time || "08:00"}:00`);
    const newRide: Ride = {
      id: uid(),
      driverName: form.driverName || "You",
      from: form.from,
      to: form.to,
      departureTimeIso: departure.toISOString(),
      seatsAvailable: Math.max(1, Number(form.seatsAvailable) || 1),
      priceCents: Math.max(0, Number(form.priceCents) || 0),
      vehicle: form.vehicle || undefined,
      notes: form.notes || undefined,
    };
    const next = [newRide, ...rides];
    setRides(next);
    saveUserRides(next);
    setForm({
      driverName: "",
      from: "",
      to: "",
      date: "",
      time: "",
      seatsAvailable: 3,
      priceCents: 10000,
      vehicle: "",
      notes: "",
    });
    alert("Ride offered! It will appear in Search and Trips.");
  }

  return (
    <main className="mx-auto max-w-md px-4 py-4">
      <h1 className="mb-4 text-xl font-semibold">Offer a ride</h1>
      <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div>
          <label className="block text-xs font-medium text-zinc-600">Your name</label>
          <input
            value={form.driverName}
            onChange={(e) => setForm((f) => ({ ...f, driverName: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            placeholder="Driver name"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600">From</label>
          <input
            value={form.from}
            onChange={(e) => setForm((f) => ({ ...f, from: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            placeholder="City or landmark"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600">To</label>
          <input
            value={form.to}
            onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            placeholder="City or landmark"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-zinc-600">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600">Time</label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-zinc-600">Seats</label>
            <input
              type="number"
              min={1}
              max={6}
              value={form.seatsAvailable}
              onChange={(e) => setForm((f) => ({ ...f, seatsAvailable: Number(e.target.value) }))}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600">Price (?)</label>
            <input
              type="number"
              min={0}
              step={50}
              value={form.priceCents / 100}
              onChange={(e) => setForm((f) => ({ ...f, priceCents: Math.max(0, Number(e.target.value) * 100) }))}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600">Vehicle</label>
          <input
            value={form.vehicle}
            onChange={(e) => setForm((f) => ({ ...f, vehicle: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            placeholder="e.g., Swift - KA 01 AB 1234"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            placeholder="Any preferences or instructions"
            rows={3}
          />
        </div>
        <button type="submit" className="w-full rounded-xl bg-sky-600 py-2 text-sm font-semibold text-white shadow-sm active:scale-[0.99]">
          Publish ride
        </button>
      </form>

      <section className="mt-6">
        <h2 className="mb-2 text-base font-semibold">Your offered rides</h2>
        {rides.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-600">
            You haven't offered any rides yet.
          </div>
        ) : (
          <ul className="space-y-2 text-sm text-zinc-700">
            {rides.map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3">
                <div>
                  <div className="font-medium">
                    {r.from} ? {r.to}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {new Date(r.departureTimeIso).toLocaleString()}
                  </div>
                </div>
                <button
                  className="text-red-600"
                  onClick={() => {
                    const next = rides.filter((x) => x.id !== r.id);
                    setRides(next);
                    saveUserRides(next);
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
