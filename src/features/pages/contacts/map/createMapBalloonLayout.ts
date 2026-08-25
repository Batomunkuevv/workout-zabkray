import type { YMapLayout, YMapsApi } from "./types";

type BalloonLayoutContext = {
    getElement: () => HTMLElement | null;
    getParentElement: () => HTMLElement;
    events: {
        fire: (name: "userclose" | "shapechange") => void;
    };
    _$element?: HTMLElement | null;
    _onClose?: (event: Event) => void;
    applyElementOffset: () => void;
};

type BalloonLayoutClass = YMapLayout & {
    superclass: {
        build: (...args: unknown[]) => void;
        clear: (...args: unknown[]) => void;
        onSublayoutSizeChange: (...args: unknown[]) => void;
        getShape: (...args: unknown[]) => unknown;
    };
};

const isBalloonElement = (element: HTMLElement | null | undefined): element is HTMLElement =>
    Boolean(element?.querySelector(".wz-map-balloon__tail"));

export const createMapBalloonLayout = (ymaps: YMapsApi, contentHtml: string): YMapLayout => {
    const BalloonLayout: BalloonLayoutClass = ymaps.templateLayoutFactory.createClass(
        `
            <div class="wz-map-balloon">
                ${contentHtml}
                <div class="wz-map-balloon__tail" aria-hidden="true"></div>
            </div>
        `,
        {
            build: function (this: BalloonLayoutContext) {
                BalloonLayout.superclass.build.call(this);

                this._$element = this.getParentElement().querySelector(".wz-map-balloon");

                if (!isBalloonElement(this._$element)) {
                    return;
                }

                this.applyElementOffset();

                const closeButton = this._$element.querySelector(".wz-map-balloon__close");

                this._onClose = (event: Event) => {
                    event.preventDefault();
                    this.events.fire("userclose");
                };

                closeButton?.addEventListener("click", this._onClose);
            },
            clear: function (this: BalloonLayoutContext) {
                const closeButton = this._$element?.querySelector(".wz-map-balloon__close");

                if (closeButton && this._onClose) {
                    closeButton.removeEventListener("click", this._onClose);
                }

                BalloonLayout.superclass.clear.call(this);
            },
            onSublayoutSizeChange: function (this: BalloonLayoutContext, ...args: unknown[]) {
                BalloonLayout.superclass.onSublayoutSizeChange.apply(this, args);

                if (!isBalloonElement(this._$element)) {
                    return;
                }

                this.applyElementOffset();
                this.events.fire("shapechange");
            },
            applyElementOffset: function (this: BalloonLayoutContext) {
                const element = this._$element;

                if (!isBalloonElement(element)) {
                    return;
                }

                element.style.left = `${-(element.offsetWidth / 2)}px`;
                element.style.top = `${-element.offsetHeight}px`;
            },
            getShape: function (this: BalloonLayoutContext) {
                const element = this._$element;

                if (!isBalloonElement(element)) {
                    return BalloonLayout.superclass.getShape.call(this);
                }

                const left = element.offsetLeft;
                const top = element.offsetTop;

                return new ymaps.shape.Rectangle(
                    new ymaps.geometry.pixel.Rectangle([
                        [left, top],
                        [left + element.offsetWidth, top + element.offsetHeight],
                    ]),
                );
            },
        },
    ) as BalloonLayoutClass;

    return BalloonLayout;
};
