import styles from "./Navbar.module.css";

export function Navbar({
    activeNav,
    setActiveNav,
}: {
    activeNav: "all" | "favorite";
    setActiveNav: (nav: "all" | "favorite") => void;
}) {
    return (
        <nav className={styles.navbar}>
            <a
                className={activeNav === "all" ? styles.navbar__active : ""}
                onClick={() => setActiveNav("all")}
            >
                Все котики
            </a>
            <a
                className={
                    activeNav === "favorite" ? styles.navbar__active : ""
                }
                onClick={() => setActiveNav("favorite")}
            >
                Любимые котики
            </a>
        </nav>
    );
}
