"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchBar, type SearchValues } from "@/components/SearchBar";
import { RideCard } from "@/components/RideCard";
import { sampleRides } from "@/lib/sampleData";
import { getUserRides } from "@/lib/storage";
import type { Ride } from "@/lib/types";

export default function Home() {
  const [query, setQuery] = useState<SearchValues>({ from: "", to: "", date: "", seats: 1 });
  const [userRides, setUserRides] = useState<Ride[]>([]);

  useEffect(() => {
    setUserRides(getUserRides());
  }, []);

  const results = useMemo(() => {
    const all = [...userRides, ...sampleRides];
    return all.filter((r) => {
      const matchFrom = query.from ? r.from.toLowerCase().includes(query.from.toLowerCase()) : true;
      const matchTo = query.to ? r.to.toLowerCase().includes(query.to.toLowerCase()) : true;
      const matchSeats = r.seatsAvailable >= (query.seats || 1);
      const matchDate = query.date
        ? new Date(r.departureTimeIso).toISOString().slice(0, 10) === query.date
        : true;
      return matchFrom && matchTo && matchSeats && matchDate;
    });
  }, [query, userRides]);

  return (
    <main className="mx-auto max-w-md px-4 py-4">
      <header className="mb-4">
        <h1 className="text-xl font-semibold">Find a ride</h1>
      </header>
      <SearchBar
        initial={query}
        onSearch={(q) => {
          setQuery(q);
        }}
      />
      <section className="mt-4 space-y-3">
        {results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-600">
            No rides found. Try broadening your search.
          </div>
        ) : (
          results.map((r) => <RideCard key={r.id} ride={r} />)
        )}
      </section>
    </main>
  );
}
