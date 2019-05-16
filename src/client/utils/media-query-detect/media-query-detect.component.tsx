import * as React from "react";
import { IMediaQueryDetectProps, IMediaQueryDetectState } from "./media-query-detect";
import { MediaQuery } from "./media-query-detect.types";

class MediaQueryDetect extends React.Component<IMediaQueryDetectProps, IMediaQueryDetectState> {
    public mediaQueries: any[] = [];
    constructor(props: any) {
        super(props);
        this.state = {
            breakpoint: ""
        };
    }

    public componentDidMount() {
        if (typeof window !== "undefined") {
            this.mediaQueries = Object.keys(MediaQuery).map((k: any) => ({
                name: k,
                query: window.matchMedia(MediaQuery[k]),
                handler: this.onWidthChange.bind(this, k)
            }));

            this.mediaQueries.forEach((mq: any) => {
                if (mq.query.matches) {
                    this.setState({ breakpoint: mq.name });
                }
                mq.query.addListener(mq.handler);
            });
        }
    }

    public componentWillUnmount() {
        this.mediaQueries.forEach((mq: any) => mq.query.removeListener && mq.query.removeListener(mq.handler));
    }

    public onWidthChange = (breakpoint: string, query: any) => {
        if (query.matches) {
            this.setState({ breakpoint });
        }
    }

    public render() {
        const { breakpoint } = this.state;
        const props = {
            breakpoint,
            match: this.props.match.includes(MediaQuery[breakpoint])
        };

        return this.props.children(props);
    }
}

export default MediaQueryDetect;
