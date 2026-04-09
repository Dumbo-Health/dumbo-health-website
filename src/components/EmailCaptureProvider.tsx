"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import EmailCaptureBlock, {
  EmailCaptureBlockProps,
} from "@/components/EmailCaptureBlock";

type EnsureEmailCaptureOptions = Pick<
  EmailCaptureBlockProps,
  | "heading"
  | "description"
  | "successHeadline"
  | "successMessage"
  | "sessionId"
  | "sourceUrl"
  | "metadata"
>;

interface EmailCaptureContextValue {
  ensureEmailCapture: (options?: EnsureEmailCaptureOptions) => Promise<void>;
  ensureEmailBlock: (options?: EnsureEmailCaptureOptions) => Promise<void>;
  hasCapturedEmail: boolean;
}

const EmailCaptureContext = createContext<EmailCaptureContextValue | undefined>(undefined);

interface EmailCaptureProviderProps {
  children: ReactNode;
  defaults?: EnsureEmailCaptureOptions;
}

export function EmailCaptureProvider({
  children,
  defaults,
}: EmailCaptureProviderProps) {
  const [modalKey, setModalKey] = useState(0);
  const [hasCapturedEmail, setHasCapturedEmail] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [overlayOptions, setOverlayOptions] = useState<EnsureEmailCaptureOptions>();
  const pendingPromiseRef = useRef<{ resolve: () => void; promise: Promise<void> } | null>(
    null
  );

  const ensureEmailCapture = useCallback(
    (options: EnsureEmailCaptureOptions = {}) => {
      // Always show the gate on a fresh page load — no localStorage bypass.
      // hasCapturedEmail is session-only: prevents asking twice in one session.
      if (hasCapturedEmail) {
        return Promise.resolve();
      }

      if (pendingPromiseRef.current) {
        return pendingPromiseRef.current.promise;
      }

      const mergedOptions: EnsureEmailCaptureOptions = {
        ...defaults,
        ...options,
        metadata: {
          ...defaults?.metadata,
          ...options.metadata,
        },
      };

      let resolveFn: () => void;
      const promise = new Promise<void>((resolve) => {
        resolveFn = resolve;
      });

      pendingPromiseRef.current = {
        resolve: resolveFn!,
        promise,
      };

      setOverlayOptions(mergedOptions);
      setModalKey((current) => current + 1);
      setIsOpen(true);

      return promise;
    },
    [defaults, hasCapturedEmail]
  );

  const handleSuccess = useCallback(() => {
    setIsOpen(false);
    setOverlayOptions(undefined);
    setHasCapturedEmail(true);

    if (pendingPromiseRef.current) {
      pendingPromiseRef.current.resolve();
      pendingPromiseRef.current = null;
    }
  }, []);

  const contextValue = useMemo<EmailCaptureContextValue>(
    () => ({
      ensureEmailCapture,
      ensureEmailBlock: ensureEmailCapture,
      hasCapturedEmail,
    }),
    [ensureEmailCapture, hasCapturedEmail]
  );

  const combinedOptions = useMemo(() => {
    if (!overlayOptions) return defaults;
    return overlayOptions;
  }, [defaults, overlayOptions]);

  return (
    <EmailCaptureContext.Provider value={contextValue}>
      {children}
      {isOpen ? (
        <EmailCaptureBlock
          key={modalKey}
          heading={combinedOptions?.heading}
          description={combinedOptions?.description}
          successHeadline={combinedOptions?.successHeadline}
          successMessage={combinedOptions?.successMessage}
          sessionId={combinedOptions?.sessionId}
          sourceUrl={combinedOptions?.sourceUrl}
          metadata={combinedOptions?.metadata}
          onSuccess={handleSuccess}
        />
      ) : null}
    </EmailCaptureContext.Provider>
  );
}

export function useEmailCapture(): EmailCaptureContextValue {
  const context = useContext(EmailCaptureContext);

  if (!context) {
    throw new Error("useEmailCapture must be used within an EmailCaptureProvider");
  }

  return context;
}

export type { EnsureEmailCaptureOptions };
