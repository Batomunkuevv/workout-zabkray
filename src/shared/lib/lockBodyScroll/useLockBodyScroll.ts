"use client";

import { useEffect } from "react";

import { lockBodyScroll } from "./lockBodyScroll";

export const useLockBodyScroll = (isLocked: boolean) => {
    useEffect(() => {
        if (!isLocked) {
            return undefined;
        }

        return lockBodyScroll();
    }, [isLocked]);
};
