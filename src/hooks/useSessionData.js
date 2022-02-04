import { useContext } from "react";
import SessionDataContext from "../contexts/SessionDataContext";

export default function useSessionData() {
  return useContext(SessionDataContext);
}