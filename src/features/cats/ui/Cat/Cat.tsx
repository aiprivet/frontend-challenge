import HeartSelected from "../../../../shared/assets/heart-selected.svg?react"
import HeartUnselected from "../../../../shared/assets/heart-unselected.svg?react"

import { useCallback, useState } from "react";
import styles from "./Cat.module.css";

export function Cat({
    imgSrc,
    activeNav,
}: {
    imgSrc: string;
    activeNav: "all" | "favorite";
}) {
    const [isFavored, setIsFavored] = useState(false);
    const [mouseOn, setMouseOn] = useState(false);

    const handleClick = useCallback(() => {
        setIsFavored((prev) => !prev);
        setMouseOn(false);
    }, [setMouseOn, setIsFavored]);

    return (activeNav === "favorite" && isFavored) || activeNav === "all" ? (
        <div
            className={styles.cat}
            style={{ backgroundImage: `url("${imgSrc}")` }}
            onClick={handleClick}
            onPointerEnter={() => setMouseOn(true)}
            onPointerLeave={() => setMouseOn(false)}
        >
            {isFavored ? (
                <HeartSelected className={styles.icon} />
            ) : (
                mouseOn && <HeartUnselected className={styles.icon} />
            )}
        </div>
    ) : null;
}
