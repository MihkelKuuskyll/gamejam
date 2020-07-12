/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

export function useInterval(callback: Function, intervalInMilliseconds: number, watchProperties: any[] = []) {
    const callbackReference = useRef();
    callbackReference.current = callback as any;

    useEffect(() => {
        if (!intervalInMilliseconds) {
            return;
        }

        const intervalReference = setInterval(() => (callbackReference as any).current(), intervalInMilliseconds);

        return () => {
            if (intervalReference) {
                clearInterval(intervalReference);
            }
        };
    }, watchProperties);
}

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
