import * as React from "react";

export interface ISvgIconProps {
    iconName: string;
    className?: string;
}

const SvgIcon: React.FC<ISvgIconProps> = (props) => {
    const { iconName, className = "" } = props;

    try {
        const svg = require(`../../../assets/icons/${iconName}.svg`);
        return <img src={svg} className={`svg-icon ${className}`}></img>
    } catch (e) {
        console.error(e);
    }
    return <React.Fragment />;
};

export default SvgIcon;
