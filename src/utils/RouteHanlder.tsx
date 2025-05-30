import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RouteHanlder = (targetPath: string) => {
  const navigate = useNavigate();
  const effectRef = React.useRef(false);

  useEffect(() => {
    if (effectRef.current) return;
    effectRef.current = true;

    navigate(targetPath);
  }, [targetPath]);

  return;
};

export default RouteHanlder;
