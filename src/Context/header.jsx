import { createContext, useState } from "react";

let headerData = createContext()

function HeaderProvider({ children }) {
    const [isHeaderOpen, setIsHeaderOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isCheckCodeOpen, setIsCheckCodeOpen] = useState(false)
    return (
        <headerData.Provider value={{ isHeaderOpen, setIsHeaderOpen, isLoginOpen, setIsLoginOpen, isCheckCodeOpen, setIsCheckCodeOpen }}>
            {children}
        </headerData.Provider>
    )
}

export { HeaderProvider, headerData }
