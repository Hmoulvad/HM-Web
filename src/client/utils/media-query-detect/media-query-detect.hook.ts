import { useEffect, useState } from "react";

import { MediaQuery } from "./media-query-detect.types";
import { isBrowser } from "../../helpers/browser.helper";

function useMediaQueryDetect(mediaQuery: MediaQuery): boolean {
    if (!isBrowser()) {
        return false;
    }

    const [isMatch, setIsMatch] = useState(false);

    function onMatchMedia(e: MediaQueryListEvent): void {
        if (e.matches !== isMatch) {
            setIsMatch(e.matches);
        }
    }

    useEffect(() => {
        const mql = window.matchMedia(mediaQuery);
        mql.addEventListener("change", onMatchMedia);

        return () => {
            mql.removeEventListener("change", onMatchMedia);
        };
    });

    return isMatch;
}

export default useMediaQueryDetect;
