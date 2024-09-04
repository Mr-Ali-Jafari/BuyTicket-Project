import { createContext, useState } from "react";

let headerData = createContext()

function HeaderProvider({ children }) {
    const [isHeaderOpen, setIsHeaderOpen] = useState(false)
    return (
        <headerData.Provider value={{ isHeaderOpen, setIsHeaderOpen }}>
            {children}
        </headerData.Provider>
    )
}

export { HeaderProvider, headerData }
