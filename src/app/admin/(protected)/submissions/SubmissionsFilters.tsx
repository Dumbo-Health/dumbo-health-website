"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

const MIDNIGHT = "#031F3D";

type Filters = {
  search: string;
  flow: string;
  risk: string;
  eligible: string;
  checkout: string;
  dateFrom: string;
  dateTo: string;
};

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 text-gray-700"
      style={{ minWidth: 130 }}
    >
      {children}
    </select>
  );
}

export default function SubmissionsFilters({
  totalCount,
}: {
  totalCount: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const get = (key: string) => searchParams.get(key) ?? "";

  const filters: Filters = {
    search: get("search"),
    flow: get("flow"),
    risk: get("risk"),
    eligible: get("eligible"),
    checkout: get("checkout"),
    dateFrom: get("dateFrom"),
    dateTo: get("dateTo"),
  };

  // Local state for search — debounced to avoid a server request per keystroke
  const [searchInput, setSearchInput] = useState(filters.search);

  // Sync local input back when URL clears (e.g. "Clear filters" button)
  useEffect(() => {
    setSearchInput(get("search"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Debounce search → URL param (400ms)
  useEffect(() => {
    const current = searchParams.get("search") ?? "";
    if (searchInput === current) return;
    const timer = setTimeout(() => {
      setFilter("search", searchInput);
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const setFilter = useCallback(
    (key: keyof Filters, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page"); // reset to page 1 on filter change
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams]
  );

  const hasFilters = Object.values(filters).some(Boolean);

  const clearAll = () => {
    startTransition(() => {
      router.replace(pathname);
    });
  };

  return (
    <div className="mb-4 space-y-3">
      {/* Row 1 — search + quick filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <input
          type="text"
          placeholder="Search email…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 text-gray-700 w-52"
        />

        {/* Flow */}
        <Select value={filters.flow} onChange={(v) => setFilter("flow", v)}>
          <option value="">All flows</option>
          <option value="undiagnosed">Undiagnosed</option>
          <option value="diagnosed">Diagnosed</option>
        </Select>

        {/* Risk */}
        <Select value={filters.risk} onChange={(v) => setFilter("risk", v)}>
          <option value="">All risk levels</option>
          <option value="high">High risk</option>
          <option value="moderate">Moderate risk</option>
          <option value="low">Low risk</option>
        </Select>

        {/* Eligible */}
        <Select value={filters.eligible} onChange={(v) => setFilter("eligible", v)}>
          <option value="">All states</option>
          <option value="yes">Eligible states</option>
          <option value="no">Not eligible</option>
        </Select>

        {/* Checkout intent */}
        <Select value={filters.checkout} onChange={(v) => setFilter("checkout", v)}>
          <option value="">All checkout status</option>
          <option value="clicked">Checkout clicked</option>
          <option value="not_clicked">No checkout click</option>
        </Select>

        {/* Date range */}
        <span className="text-xs text-gray-500">From</span>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilter("dateFrom", e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 text-gray-700"
        />
        <span className="text-xs text-gray-500">To</span>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilter("dateTo", e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 text-gray-700"
        />

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
          >
            Clear filters
          </button>
        )}

        {isPending && (
          <span className="text-xs text-amber-500 animate-pulse">Loading…</span>
        )}
      </div>

      {/* Row 2 — result count */}
      <p className="text-xs" style={{ color: MIDNIGHT, opacity: 0.45 }}>
        {hasFilters
          ? `${totalCount} submissions match`
          : `${totalCount} total submissions`}
      </p>
    </div>
  );
}
