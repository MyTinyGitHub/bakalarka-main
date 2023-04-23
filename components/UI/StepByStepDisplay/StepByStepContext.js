import React, { useContext, useState } from "react";

export const DebugContext = React.createContext()

export function useDebuger() {
    return useContext(DebugContext)
}

export function DebugProvider({ children }) {
    const [steps, setSteps] = useState([]);


    return <DebugContext.Provider value={{steps, setSteps}}>
            { children }
    </DebugContext.Provider>
}