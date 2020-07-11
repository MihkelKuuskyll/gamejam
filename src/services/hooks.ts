import { useEffect } from 'react';

export function useTimeout(callback: Function, timeoutInMilliseconds: number, watchProperties: any[] = []) {
    useEffect(() => {
        if (!timeoutInMilliseconds) {
            return;
        }

        const timeoutReference = setTimeout(callback, timeoutInMilliseconds);

        return () => {
            if (timeoutReference) {
                clearTimeout(timeoutReference);
            }
        };
    }, watchProperties);
}