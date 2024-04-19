import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type MobileContextType = {
    isMobile: boolean;
};

const MobileContext = createContext<MobileContextType | undefined>(undefined);

export function UseMobile() {
    const context = useContext(MobileContext);
    if (!context) {
        throw new Error("useMobile must be used within a MobileProvider");
    }
    return context;
}

type MobileProviderProps = {
    children: ReactNode;
};

export function MobileProvider({ children }: MobileProviderProps) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    function handleWindowSizeChange() {
        setIsMobile(window.innerWidth <= 768);
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    return (
        <MobileContext.Provider value={{ isMobile }}>
            {children}
        </MobileContext.Provider>
    );
}