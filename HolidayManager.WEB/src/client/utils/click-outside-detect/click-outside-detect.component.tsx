import * as React from "react";
import { FC, useEffect, useRef } from "react";

import { isBrowser } from "../../helpers/browser.helper";

interface IClickOutsideDetectProps {
    onClickOutside: (event?: MouseEvent) => void;
    style?: React.CSSProperties;
    className?: string;
}

export const ClickOutsideDetect: FC<IClickOutsideDetectProps> = props => {
    const { children, className = "", style } = props;
    const clickRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isBrowser()) {
            // Timeout is used to add event listener after an eventual click event used to spawn the container has finished it's bubbling phase.
            setTimeout(() => {
                window.addEventListener("click", handleOutsideClick);
            }, 0);

            return () => {
                window.removeEventListener("click", handleOutsideClick);
            };
        }
    }, []);

    function handleOutsideClick(event: MouseEvent): void {
        const path = event.composedPath && event.composedPath();

        if (!path) {
            return;
        }

        if (!event.composedPath().some((e) => ((e as HTMLDivElement) === clickRef.current))) {
            props.onClickOutside(event);
        }
    }

    return (
        <div className={className} style={style} ref={clickRef}>
            {children}
        </div>
    );
};

export default ClickOutsideDetect;
