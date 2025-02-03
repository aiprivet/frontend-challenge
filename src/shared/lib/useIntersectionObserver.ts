import { useEffect } from "react";

export function useIntersectionObserver(
    targetRef: React.RefObject<HTMLElement>,
    onIntersect: () => void
) {
    useEffect(() => {
        const observeTarget = targetRef.current;
        if (!observeTarget) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onIntersect();
                }
            },
            { threshold: 1.0, rootMargin: "100px" }
        );

        observer.observe(observeTarget);

        return () => {
            if (observeTarget) {
                observer.unobserve(observeTarget);
            }
        };
    }, [targetRef, onIntersect]);
}
