import { Navigate, RouteObject } from "react-router-dom";

type WrappedRouteProps = RouteObject & {
  canAccess?: boolean;
  redirectUrl?: string;
}

export const WrappedRoute = ({ canAccess, ...props }: WrappedRouteProps): WrappedRouteProps => {
  if (canAccess === undefined || canAccess) {
    return props;
  }
  return {
    ...props,
    element: <Navigate to={props.redirectUrl || '/'} />
  }
}