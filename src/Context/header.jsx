import { createContext, useState } from "react";

let headerData = createContext()

function HeaderProvider({ children }) {
    const [isHeaderOpen, setIsHeaderOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    return (
        <headerData.Provider value={{ isHeaderOpen, setIsHeaderOpen, isLoginOpen, setIsLoginOpen }}>
            {children}
        </headerData.Provider>
    )
}

export { HeaderProvider, headerData }
