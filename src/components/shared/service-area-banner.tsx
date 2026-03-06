"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois",
  "Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts",
  "Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
  "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington",
  "West Virginia","Wisconsin","Wyoming",
];

function USMap() {
  return (
    <svg
      viewBox="0 0 960 600"
      className="w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified US outline */}
      <path
        d="M 120 200 L 200 180 L 300 160 L 400 140 L 500 130 L 600 125 L 700 130 L 800 140 L 850 160 L 860 200 L 870 250 L 860 300 L 840 350 L 800 400 L 750 430 L 700 440 L 650 450 L 600 440 L 550 430 L 500 440 L 450 450 L 400 440 L 350 420 L 300 400 L 250 380 L 200 350 L 150 300 L 130 250 Z"
        fill="#F5E6D1"
        stroke="#031F3D"
        strokeWidth="1.5"
        strokeOpacity="0.2"
      />
      {/* Florida highlight */}
      <ellipse cx="720" cy="420" rx="50" ry="35" fill="#FF8361" fillOpacity="0.6" />
      <text x="720" y="425" textAnchor="middle" className="fill-white font-heading text-[14px] font-medium">FL</text>
      {/* Texas highlight */}
      <ellipse cx="480" cy="400" rx="65" ry="45" fill="#78BFBC" fillOpacity="0.6" />
      <text x="480" y="405" textAnchor="middle" className="fill-white font-heading text-[14px] font-medium">TX</text>
    </svg>
  );
}

export function ServiceAreaBanner() {
  const [activeTab, setActiveTab] = useState<"cash" | "insurance">("cash");
  const [selectedState, setSelectedState] = useState("");
  const [interest, setInterest] = useState<"insurance" | "cash">("cash");

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-heading text-3xl font-medium text-midnight md:text-[40px]">
            Where Dumbo Health is available
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-body text-lg text-midnight/60">
            More and more people, from coast to coast, are choosing to sleep
            better with Dumbo Health.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center gap-2">
          <button
            onClick={() => setActiveTab("cash")}
            className={`rounded-full px-6 py-2.5 font-body text-sm font-bold transition-all ${
              activeTab === "cash"
                ? "bg-peach text-white shadow-md shadow-peach/20"
                : "bg-sunlight text-midnight/60 hover:bg-sunlight/80"
            }`}
          >
            Out-of-pocket
          </button>
          <button
            onClick={() => setActiveTab("insurance")}
            className={`rounded-full px-6 py-2.5 font-body text-sm font-bold transition-all ${
              activeTab === "insurance"
                ? "bg-teal text-white shadow-md shadow-teal/20"
                : "bg-sunlight text-midnight/60 hover:bg-sunlight/80"
            }`}
          >
            Insurance Coverage Coming Soon
          </button>
        </div>

        {/* Content */}
        <div className="mt-8 grid items-start gap-12 lg:grid-cols-2">
          {/* US Map */}
          <div className="mx-auto w-full max-w-md">
            <USMap />
            {activeTab === "cash" ? (
              <div className="mt-4 flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-peach" />
                  <span className="font-body text-sm text-midnight/60">
                    Florida
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-teal" />
                  <span className="font-body text-sm text-midnight/60">
                    Texas
                  </span>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-center font-body text-sm text-midnight/50">
                Insurance coverage is coming soon. Join the waitlist to be
                notified when we launch in your state.
              </p>
            )}
          </div>

          {/* Waitlist Form */}
          <div className="rounded-2xl border border-sunlight bg-daylight p-6 md:p-8">
            <h3 className="font-heading text-xl font-medium text-midnight">
              Join the waitlist
            </h3>

            <div className="mt-6 space-y-4">
              {/* State dropdown */}
              <div>
                <label
                  htmlFor="waitlist-state"
                  className="mb-1.5 block font-body text-sm font-bold text-midnight/70"
                >
                  State
                </label>
                <select
                  id="waitlist-state"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full rounded-lg border border-sunlight bg-white px-4 py-3 font-body text-sm text-midnight outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal"
                >
                  <option value="">Select your state</option>
                  {US_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Interest toggle */}
              <div>
                <p className="mb-2 font-body text-sm font-bold text-midnight/70">
                  I&apos;m interested in
                </p>
                <div className="flex gap-3">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="interest"
                      value="insurance"
                      checked={interest === "insurance"}
                      onChange={() => setInterest("insurance")}
                      className="accent-peach"
                    />
                    <span className="font-body text-sm text-midnight">
                      Insurance
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="interest"
                      value="cash"
                      checked={interest === "cash"}
                      onChange={() => setInterest("cash")}
                      className="accent-peach"
                    />
                    <span className="font-body text-sm text-midnight">
                      Cash-Pay
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <Button className="mt-2 w-full rounded-lg bg-peach py-3 font-body text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-peach/15 transition-all hover:-translate-y-0.5 hover:bg-peach/90 hover:shadow-lg active:translate-y-0">
                Sign Up
              </Button>

              <p className="font-body text-xs text-midnight/40">
                By clicking Sign Up you&apos;re confirming that you agree with
                our{" "}
                <a href="/terms-of-use" className="underline hover:text-peach">
                  Terms and Use
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
