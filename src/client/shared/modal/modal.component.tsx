import * as React from "react";
import { CSSTransition } from "react-transition-group";
import Portal from "../portal/portal.component";
import ClickOutsideDetect from "../../utils/click-outside-detect";
import { isBrowser } from "../../helpers/browser.helper";
import SvgIcon from "../svg-icon";

interface IModalProps {
    animationDuration?: number; // Default: 300
    includeBackdrop?: boolean; // Default: true
    includeExitButton?: boolean; // Default: true
    className?: string; // Default: ""
    containerClassName?: string; // Default: ""
    animationClassNames?: string; // Defaults: "fade"
    disableBackgroundInteraction?: boolean; // Default: true
    style?: React.CSSProperties;
    onModalClosed?: () => void;
    ref: React.RefObject<Modal>;
    preventClose: boolean;
}

interface IModalState {
    isExiting: boolean;
    isOpen: boolean;
}

const DISABLE_INTERACTION_CLASS = "disable-interaction";

class Modal extends React.Component<IModalProps, IModalState> {
    public static defaultProps: Readonly<Partial<IModalProps>> = {
        animationDuration: 300,
        includeBackdrop: true,
        includeExitButton: true,
        disableBackgroundInteraction: true,
        className: "",
        containerClassName: "",
        animationClassNames: "fade",
        preventClose: false
    };
    private static ESCAPE_KEY = 27;

    public state: Readonly<IModalState> = { isExiting: false, isOpen: false };

    constructor(props: IModalProps) {
        super(props);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    public componentWillUnmount(): void {
        const { disableBackgroundInteraction } = this.props;

        if (disableBackgroundInteraction && isBrowser()) {
            this.toggleBackgroundInteraction(true);
        }
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    public componentWillMount(): void {
        this.toggleBackgroundInteraction(true);
    }

    public componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    public render(): JSX.Element | null {
        const {
            children,
            className,
            containerClassName,
            animationClassNames,
            animationDuration,
            includeBackdrop,
            includeExitButton,
            style
        } = this.props;
        const { isExiting, isOpen } = this.state;

        if (!isOpen) {
            return null;
        }

        return (
            <Portal className={`modal ${containerClassName}`}>
                {includeBackdrop ?
                    <CSSTransition timeout={animationDuration!} in={!isExiting} appear={true} unmountOnExit classNames="fade">
                        <div className="modal__backdrop" style={{ transitionDuration: `${animationDuration}ms` }}></div>
                    </CSSTransition>
                    : null}
                <CSSTransition
                    timeout={animationDuration!}
                    in={!isExiting}
                    appear={true}
                    unmountOnExit
                    classNames={animationClassNames!}
                    onExited={this.exitAnimationDone.bind(this)}
                    >
                        {!this.props.preventClose ? (
                        <ClickOutsideDetect className={`modal__container ${className}`}
                            style={{ ...style, transitionDuration: `${animationDuration}ms` }}
                            onClickOutside={this.close.bind(this)}
                        >
                            {
                                !!includeExitButton ?
                                    <React.Fragment>
                                        <div onClick={() => this.close()} className="modal__exit-button">
                                            <SvgIcon iconName="clear" />
                                        </div>
                                        {children}
                                    </React.Fragment>
                                    :
                                    children
                            }
                        </ClickOutsideDetect>
                        ) : (
                            <div  className={`modal__container ${className}`}>
                                {children}
                            </div>
                        )}
                </CSSTransition>
            </Portal>
        );
    }

    public open(): void {
        const { disableBackgroundInteraction } = this.props;
        const { isOpen } = this.state;

        if (isOpen) {
            return;
        }

        this.setState({ isOpen: true });

        if (disableBackgroundInteraction && isBrowser()) {
            this.toggleBackgroundInteraction(false);
        }
    }

    public close(): void {
        const { isOpen } = this.state;

        if (!isOpen) {
            return;
        }

        this.setState({ isExiting: true });
    }

    private exitAnimationDone(): void {
        const { disableBackgroundInteraction } = this.props;
        this.setState({ isExiting: false, isOpen: false });

        if (this.props.onModalClosed != null) {
            this.props.onModalClosed();
        }

        if (disableBackgroundInteraction && isBrowser()) {
            this.toggleBackgroundInteraction(true);
        }
    }

    private toggleBackgroundInteraction(isEnabled: boolean) {
        if (isBrowser()) {
            if (isEnabled) {
                document.body.classList.remove(DISABLE_INTERACTION_CLASS);
            } else {
                document.body.classList.add(DISABLE_INTERACTION_CLASS);
            }
        }
    }

    private handleKeyDown = (event: any) => {
        if (!this.props.preventClose) {
            switch (event.keyCode) {
                case Modal.ESCAPE_KEY:
                    this.close();
                    break;
                default:
                    break;
            }
        }
    }
}

export default Modal;
