import * as React from "react";
import ReactDOM from "react-dom";

import { isBrowser } from "../../helpers/browser.helper";

interface IPortalProps {
    className?: string;
    appendTo?: string;
}

export const Portal: React.FC<IPortalProps> = ({ children, className = "", appendTo = "" }: any): React.ReactPortal | null => {
    const portalRoot = React.useRef<HTMLElement | undefined>(getPortalRoot());
    const el = React.useRef<HTMLElement | undefined>(addPortalElement());

    function getPortalRoot() {
        if (isBrowser()) {
            return appendTo ? document.querySelector(appendTo) : document.body;
        }

        return undefined;
    }

    function addPortalElement() {
        if (isBrowser()) {
            return document.createElement("div");
        }

        return undefined;
    }

    React.useEffect(() => {
        if (isBrowser()) {
            if (portalRoot.current && el.current) {
                el.current.classList.add(...className!.split(" ").filter((c: string) => !!c));
                portalRoot.current.appendChild(el.current);
            }
        }

        return () => {
            if (portalRoot.current && el.current) {
                portalRoot.current.removeChild(el.current);
            }
        };
    }, []);

    return (
        !!el.current
            ? ReactDOM.createPortal(
                children,
                el.current
            )
            : null
    );
};

export default Portal;
