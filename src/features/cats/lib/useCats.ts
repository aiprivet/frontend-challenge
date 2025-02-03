import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "@/shared/lib/useIntersectionObserver";
import { getCats } from "../api/catsApi";

export const useCats = () => {
    const [cats, setCats] = useState<Array<string>>([]);
    const [loadMore, setLoadMore] = useState(false);
    const page = useRef(0);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (loadMore) {
            getCats(page.current)
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

    useIntersectionObserver(loadMoreRef, () => setLoadMore(true));

    return { cats, loadMoreRef, loadMore };
}
