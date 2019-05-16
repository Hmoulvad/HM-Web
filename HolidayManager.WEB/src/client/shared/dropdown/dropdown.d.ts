export interface IDropdown {
    options: any[];
    handleChange?: (value: any) => void;
    handlePostChange?: () => void;
    returnIndex?: boolean;
    width?: number;
    isInline?: boolean;
    defaultIndex?: number;
    defaultValue?: any;
    controlledValue?: any;
    children?: (option: any) => any;
    className?: string;
    styles?: IDropdownStyles;
}

export interface IDropdownStyles {
    dropdownBackgroundColor?: string;
    optionsBackgroundColor?: string;
    optionsColor?: string;
    optionHighlightColor?: string;
    borderColor?: string;
    iconColor?: string;
}
