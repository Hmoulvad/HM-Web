import * as React from "react";

import SvgIcon from "../svg-icon";
import MediaQueryDetect from "../../utils/media-query-detect";
import { MediaQuery } from "../../utils/media-query-detect/media-query-detect.types";

import { IDropdown } from "./dropdown";

/**
 * @description
 * Takes list of options. Outputs selected option.
 * The preselected option is the option in position 0 in the options array.
 *
 * @param {number} [width] if unset the dropdown goes full width. Width can be set to a pixel amount.
 * @param {string} [defaultValue] Sets the value of the dropdown before it has changed.
 * @param {number} [defaultIndex] if set, option corresponding to value will be set initially.
 * @param {IDropdownStyles} [styles] styles for the dropdown. Refer to IDropdownStyles in "./dropdown.d.ts".
 *
 * @example
 *
 * // Simple types
 * const options = [1, 2, 3];
 *
 *  <Dropdown options={options} />;
 *
 * // Complex types, child as function used for selecting values to as options.
 *  const options = [{ name: "something" }, { name: "else" }];
 *
 *  <Dropdown options={options}>
 *      {({ name }) => name}
 *  </Dropdown>;
 */

interface IDropdownState {
    isOpen: boolean;
    selectedValue?: any;
}

class Dropdown extends React.Component<IDropdown, IDropdownState> {
    public static defaultProps: Partial<IDropdown> = {
        className: "",
        styles: {
            dropdownBackgroundColor: "",
            optionHighlightColor: "",
            optionsBackgroundColor: "",
            optionsColor: "",
            iconColor: "",
            borderColor: ""
        }
    };

    constructor(props: Readonly<IDropdown>) {
        super(props);

        this.state = { isOpen: false, selectedValue: this.defaultValue };
    }

    public componentDidUpdate(prevProps: Readonly<IDropdown>): void {
        if (!this.compareOptions(prevProps.options, this.props.options)) {
            return;
        }
    }

    public selectItem(value: string, isJson?: boolean, index?: number): void {
        if (!!this.props.returnIndex) {
            if (isJson && !!this.props.defaultValue) {
                // We have a mocked value, so we subtract index
                index = index! - 1;
            }
            value = this.props.options[index!];
            if (!!this.props.handleChange) {
                this.props.handleChange(index);
            }
        } else {
            value = isJson ? JSON.parse(value) : value;

            if (!!this.props.handleChange) {
                this.props.handleChange(value);
            }
        }

        this.setState({ selectedValue: value });
        if (!!this.props.handlePostChange) {
            this.props.handlePostChange();
        }
    }

    public render() {
        const { options, width, isInline, className, styles, defaultValue, controlledValue } = this.props;
        const { selectedValue, isOpen } = this.state;
        const value = controlledValue || selectedValue;
        const dynamicSelectedValue = typeof value === "string" ? value : this.renderValue(value);

        return (
            <MediaQueryDetect match={[MediaQuery.XS, MediaQuery.SM, MediaQuery.MD]}>
                {({ match }: { match: boolean }) => match ?
                    <div className={`dropdown ${className} ${isInline ? " dropdown--inline" : ""} ${options.length === 0 ? " dropdown--disabled" : ""}`}
                        style={{ width: width + "px", backgroundColor: styles!.dropdownBackgroundColor, borderColor: styles!.borderColor }}
                    >
                        <select className="dropdown__portable-select"
                            value={JSON.stringify(controlledValue) || JSON.stringify(selectedValue)}
                            onChange={e => this.selectItem(e.target.value, true, e.target.selectedIndex)}
                        >
                            {!!defaultValue ?
                                <option value="">{defaultValue}</option>
                                : null}
                            {options.map((o: any, index: number) => (
                                <option key={index} value={JSON.stringify(o)}>{this.renderValue(o)}</option>
                            ))}
                        </select>
                        <div className="dropdown__spacer" style={{ backgroundColor: styles!.borderColor }} />
                        <div className="dropdown__icon-container" style={{ color: styles!.iconColor }}>
                            <SvgIcon className="dropdown__icon" iconName="arrowDown" />
                        </div>
                    </div>
                    :
                    <div className={`dropdown ${className} ${isInline ? "dropdown--inline" : ""} ${options.length === 0 ? "dropdown--disabled" : ""}`}
                        onClick={() => this.setState({ isOpen: !this.state.isOpen })}
                        style={{ width: width + "px", backgroundColor: styles!.dropdownBackgroundColor, borderColor: styles!.borderColor }}
                    >
                        <div className="dropdown__value">{dynamicSelectedValue}</div>
                        <div className="dropdown__spacer" style={{ backgroundColor: styles!.borderColor }} />
                        <div className="dropdown__icon-container" style={{ color: styles!.iconColor }}>
                            <SvgIcon className="dropdown__icon" iconName="arrowDown" />
                        </div>
                        {isOpen && options.length > 0 ?
                            <ul className="dropdown__list" style={{ backgroundColor: styles!.optionsBackgroundColor, color: styles!.optionsColor }}>
                                    {options!.map((object: any, index: number) => (
                                        <li className={`dropdown__item ${controlledValue === object ? "dropdown__item--active" : ""}`}
                                            key={index}
                                            onClick={() => this.selectItem(object, false, index)}
                                        >
                                            <span className="dropdown__item-hover-bg" style={{ backgroundColor: styles!.optionHighlightColor }} />
                                            {this.renderValue(object)}
                                        </li>
                                ))}
                            </ul>
                            :
                            null
                        }
                    </div>
                }
            </MediaQueryDetect>
        );
    }

    private renderValue(valueObject: any): any {
        return typeof this.props.children === "function" ? this.props.children(valueObject) : valueObject;
    }

    private get defaultValue(): any {
        const { defaultIndex, defaultValue, options } = this.props;

        if (defaultValue != null) {
            return defaultValue;
        } else if (defaultIndex !== undefined) {
            return options[defaultIndex];
        }

        return options[0];
    }

    private compareOptions(prevOptions: string[], newOptions: string[]): boolean {
        if (prevOptions.length !== newOptions.length) {
            return false;
        }
        for (let i = 0; i < prevOptions.length; i++) {
            if (prevOptions[i] !== newOptions[i]) {
                return false;
            }
        }
        return true;
    }
}

export default Dropdown;
