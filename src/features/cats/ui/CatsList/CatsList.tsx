import { useCats } from "../../lib/useCats";
import { Cat } from "../Cat/Cat";
import styles from "./CatsList.module.css";

export function CatsList({ activeNav }: { activeNav: "all" | "favorite" }) {
    const { cats, loadMoreRef, loadMore } = useCats();

    return (
        <div className={styles.content}>
            {cats.map((imgSrc, i) => (
                <Cat key={i} imgSrc={imgSrc} activeNav={activeNav} />
            ))}
            {activeNav === "all" && (
                <div className={styles.loadmore} ref={loadMoreRef}>
                    {loadMore && "... загружаем еще котиков ..."}
                </div>
            )}
        </div>
    );
}
