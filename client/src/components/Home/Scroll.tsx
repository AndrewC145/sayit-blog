import { useLocation, type Location } from "react-router";
import { useLayoutEffect } from "react";

function Scroll({ children }: { children: React.ReactNode }) {
  const location: Location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
}

export default Scroll;
