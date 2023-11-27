import { createContext, useState } from "react";

export const ObserveContext = createContext();

export function ObserveProvider({ children }) {
  const [isIntersect, setIsIntersect] = useState(false);
  const [iPosition, setIPosition] = useState(250);
  const handleIntersect = (status) => setIsIntersect(status);
  const handleIPosition = (position) => setIPosition(position);

  return (
    <ObserveContext.Provider value={{ isIntersect, handleIntersect, iPosition, handleIPosition }}>
      {children}
    </ObserveContext.Provider>
  )
}