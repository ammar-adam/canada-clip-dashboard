"use client";

import { createContext, useContext } from "react";
import type { MerchantId } from "@/lib/merchantData";

const MerchantContext = createContext<MerchantId | null>(null);

export function MerchantProvider({
  merchantId,
  children,
}: {
  merchantId: MerchantId | null;
  children: React.ReactNode;
}) {
  return (
    <MerchantContext.Provider value={merchantId}>
      {children}
    </MerchantContext.Provider>
  );
}

export function useMerchant(): MerchantId {
  const id = useContext(MerchantContext);
  if (id == null) return "backpack";
  return id;
}
