import * as React from 'react';
import LayoutContainer from '../../layout';

interface IFooter {
}

const Footer: React.FC<IFooter> = ({}) => {
  return (
      <LayoutContainer>
          <div className="footer"></div>
      </LayoutContainer>
  )
};

export default Footer;