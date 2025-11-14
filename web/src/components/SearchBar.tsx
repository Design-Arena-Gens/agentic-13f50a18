"use client";

import { useState } from "react";

export type SearchValues = {
  from: string;
  to: string;
  date: string; // yyyy-mm-dd
  seats: number;
};

export function SearchBar({ initial, onSearch }: { initial?: Partial<SearchValues>; onSearch: (v: SearchValues) => void }) {
  const [from, setFrom] = useState(initial?.from ?? "");
  const [to, setTo] = useState(initial?.to ?? "");
  const [date, setDate] = useState(initial?.date ?? "");
  const [seats, setSeats] = useState(initial?.seats ?? 1);

  return (
    <form
      className="grid grid-cols-2 gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch({ from, to, date, seats: Math.max(1, Number(seats) || 1) });
      }}
    >
      <div className="col-span-2">
        <label className="block text-xs font-medium text-zinc-600">From</label>
        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="City or landmark"
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
        />
      </div>
      <div className="col-span-2">
        <label className="block text-xs font-medium text-zinc-600">To</label>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="City or landmark"
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-zinc-600">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-zinc-600">Seats</label>
        <input
          type="number"
          min={1}
          max={6}
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="col-span-2 mt-1 w-full rounded-xl bg-sky-600 py-2 text-sm font-semibold text-white shadow-sm active:scale-[0.99]"
      >
        Search Rides
      </button>
    </form>
  );
}
