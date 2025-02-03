import { useState } from "react";
import { Navbar } from "../shared/ui/Navbar/Navbar";
import { CatsList } from "../features/cats/ui/CatsList/CatsList";

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
