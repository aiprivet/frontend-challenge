import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import { HeartSelected } from "./svg/HeartSelected";
import { HeartUnselected } from "./svg/HeartUnselected";

function App() {
    const [cats, setCats] = useState<Array<string>>([]);
    const [activeNav, setActiveNav] = useState<"all" | "favorite">("all");
    const [loadMore, setLoadMore] = useState(false);
    const page = useRef(0);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const headers = new Headers({
            "Content-Type": "application/json",
            "x-api-key":
                "live_5hTraJRldIDUIiyzL3Ejeozdvv4LhhEAVcifjlZoCLfhkEI7AR4vmXIpPV84kITW",
        });

        const requestOptions = {
            method: "GET",
            headers: headers,
        };

        if (loadMore) {
            fetch(
                `https://api.thecatapi.com/v1/images/search?size=mde&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${page.current}&limit=15`,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    setCats((prev) =>
                        prev.concat(
                            result.map((cat: { url: string }) => cat.url)
                        )
                    );
                    page.current += 1;
                })
                .catch((error) => console.error(error))
                .finally(() => setLoadMore(false));
        }
    }, [loadMore]);

    useEffect(() => {
        const observeTarget = loadMoreRef.current;
        if (!observeTarget) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setLoadMore(true);
                }
            },
            { threshold: 1.0 , rootMargin: "100px" }
        );

        observer.observe(observeTarget);

        return () => {
            if (observeTarget) {
                observer.unobserve(observeTarget);
            }
        };
    }, []);

    return (
        <>
            <main>
                <nav className={styles.navbar}>
                    <a
                        className={
                            activeNav === "all" ? styles.navbar__active : ""
                        }
                        onClick={() => setActiveNav("all")}
                    >
                        Все котики
                    </a>
                    <a
                        className={
                            activeNav === "favorite"
                                ? styles.navbar__active
                                : ""
                        }
                        onClick={() => setActiveNav("favorite")}
                    >
                        Любимые котики
                    </a>
                </nav>
                <div className={styles.content}>
                    {cats.map((imgSrc, i) => (
                        <Cat key={i} imgSrc={imgSrc} activeNav={activeNav} />
                    ))}
                </div>
                {activeNav === "all" && (
                    <div className={styles.loadmore} ref={loadMoreRef}>
                        {loadMore && "... загружаем еще котиков ..."}
                    </div>
                )}
            </main>
        </>
    );
}

function Cat({ imgSrc, activeNav }: { imgSrc: string; activeNav: string }) {
    const [isFavored, setIsFavored] = useState(false);
    const [mouseOn, setMouseOn] = useState(false);
    return (activeNav === "favorite" && isFavored) || activeNav === "all" ? (
        <div
            key={imgSrc}
            className={styles.content__cat}
            style={{
                backgroundImage: `url("${imgSrc}")`,
            }}
            onClick={() => setIsFavored((prev) => !prev)}
            onPointerEnter={() => setMouseOn(true)}
            onPointerLeave={() => setMouseOn(false)}
        >
            {isFavored ? <HeartSelected /> : mouseOn && <HeartUnselected />}
        </div>
    ) : null;
}

export default App;
