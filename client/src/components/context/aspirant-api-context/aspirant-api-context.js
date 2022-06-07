import {createContext, useContext} from "react";

export const AspirantApiContext = createContext();

export const useAspirantApiContext = () => useContext(AspirantApiContext)