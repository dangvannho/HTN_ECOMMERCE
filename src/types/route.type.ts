import { ReactElement, ComponentType } from "react";

export type Route = {
  path: string;
  component: React.ReactElement;
  layout?: ComponentType<{ children: ReactElement }> | null;
  children?: Route[];
};

export type PrivateRouteProps = {
  children: React.ReactNode;
};
