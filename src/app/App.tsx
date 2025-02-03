import { useState } from "react";
import { CatsList } from "@/features/cats";
import { Navbar } from "@/shared/ui/Navbar/Navbar";

function App() {
    const [activeNav, setActiveNav] = useState<"all" | "favorite">("all");

    return (
        <main>
            <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
            <CatsList activeNav={activeNav} />
        </main>
    );
}

export default App;
