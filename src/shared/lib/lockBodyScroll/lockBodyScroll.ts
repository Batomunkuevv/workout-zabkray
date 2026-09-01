const SCROLLBAR_OFFSET_VAR = "--scrollbar-offset";

let lockCount = 0;
let previousOverflow = "";
let previousPaddingRight = "";

const getScrollbarWidth = () => {
    return Math.max(0, window.innerWidth - document.documentElement.clientWidth);
};

export const lockBodyScroll = () => {
    const { body } = document;

    if (lockCount === 0) {
        previousOverflow = body.style.overflow;
        previousPaddingRight = body.style.paddingRight;

        const scrollbarWidth = getScrollbarWidth();

        body.style.overflow = "hidden";

        if (scrollbarWidth > 0) {
            const computedPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

            body.style.paddingRight = `${computedPaddingRight + scrollbarWidth}px`;
            document.documentElement.style.setProperty(SCROLLBAR_OFFSET_VAR, `${scrollbarWidth}px`);
        }
    }

    lockCount += 1;

    return () => {
        lockCount = Math.max(0, lockCount - 1);

        if (lockCount > 0) {
            return;
        }

        body.style.overflow = previousOverflow;
        body.style.paddingRight = previousPaddingRight;
        document.documentElement.style.removeProperty(SCROLLBAR_OFFSET_VAR);
    };
};
