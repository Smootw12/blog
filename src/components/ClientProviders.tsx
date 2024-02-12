"use client";

import { SessionProvider } from "next-auth/react";
import { cookies } from "next/headers";
import { CookiesProvider } from "next-client-cookies";

import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface LayoutProps {
  children: ReactNode;
  value: any;
}

const ClientCookiesProvider: typeof CookiesProvider = (props) => (
  <CookiesProvider {...props} />
);

const ClientProviders: FC<LayoutProps> = ({ children, value }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ClientCookiesProvider value={value}>
        <SessionProvider>{children}</SessionProvider>
      </ClientCookiesProvider>
    </QueryClientProvider>
  );
};

export default ClientProviders;
