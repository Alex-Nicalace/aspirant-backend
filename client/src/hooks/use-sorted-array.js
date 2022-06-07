import {useMemo} from "react";

export const useSortedArray = (array, sort) => {
    return useMemo(() => {
        if (sort) {
            return [...array].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return array;
    }, [sort, array]);
}