import {useCallback, useRef} from "react";

export default function UseDebounce (callback, delay) {
    const timer = useRef();

    return useCallback((...args) => {
        if (timer) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay]);
}