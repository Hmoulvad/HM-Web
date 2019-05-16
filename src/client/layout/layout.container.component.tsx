import * as React from 'react';
import { AppContext } from '../context/appContext';

interface IGrid {
    noPadding?: boolean;
    className?: string;
    children: any;
}

const LayoutContainer: React.FC<IGrid> = ({noPadding, className, children}) => {
  const { isApp } = React.useContext(AppContext);
  return (
      <div style={ isApp ? { marginTop: 50} : undefined} className={`layout ${className ? className : ""} ${noPadding ? "layout--no-padding" : ""}`}>
        {children}
      </div>
  )
};

export default LayoutContainer;