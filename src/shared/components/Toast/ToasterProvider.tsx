"use client";
import { Toaster } from "sonner";

export type ToasterProviderProps = {
  expand?: boolean;
  duration?: number;
};

export function ToasterProvider({ expand = false, duration = 2000 }: ToasterProviderProps) {
  return <Toaster position="top-right" richColors expand={expand} duration={duration} />;
}
