"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { boot, show, hide, onShow, onHide, shutdown } from "@intercom/messenger-js-sdk";
import { INTERCOM_APP_ID } from "@/lib/constants";

interface IntercomContextValue {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  isOpen: boolean;
}

const IntercomContext = createContext<IntercomContextValue | null>(null);

export function useIntercom(): IntercomContextValue {
  const ctx = useContext(IntercomContext);
  if (!ctx) throw new Error("useIntercom must be used within IntercomProvider");
  return ctx;
}

export function IntercomProvider({ children }: { children: React.ReactNode }) {
  const booted = useRef(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    boot({ app_id: INTERCOM_APP_ID, hide_default_launcher: true });
    onShow(() => setIsOpen(true));
    onHide(() => setIsOpen(false));

    return () => { shutdown(); };
  }, []);

  const value: IntercomContextValue = {
    show,
    hide,
    toggle: () => (isOpen ? hide() : show()),
    isOpen,
  };

  return (
    <IntercomContext.Provider value={value}>
      {children}
    </IntercomContext.Provider>
  );
}
