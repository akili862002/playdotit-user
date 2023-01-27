import ErrorBoundary from "@/components/ErrorBoundary";
import React from "react";
import { ReactNode, Suspense } from "react";

export const Loadable =
  <T,>(
    Component: React.LazyExoticComponent<React.FC<T>>,
    Loading: ReactNode = <></>
  ) =>
  (props: T) =>
    (
      <Suspense fallback={Loading}>
        <ErrorBoundary>
          <Component {...(props as any)} />
        </ErrorBoundary>
      </Suspense>
    );
