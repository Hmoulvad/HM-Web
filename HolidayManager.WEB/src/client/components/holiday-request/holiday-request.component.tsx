import * as React from 'react';
import LayoutContainer from '../../layout';
import ActiveRequest from './active-request';

const HolidayRequest: React.FunctionComponent<any> = (props) => {

    const className = "holiday-request";
    return (
        <LayoutContainer>
            <div className={`${className}`}>
                <div className={`${className}__wrapper`}>
                    <div className={`${className}__header`}>
                        <h4 className={`${className}__title`}>Your Holiday Requests</h4>
                        <p className={`${className}__description`}>Get an overview of all your Holiday Requests, and delete one if wanted.</p>
                    </div>
                </div>
                <ActiveRequest />
            </div>
        </LayoutContainer>
    )
};

export default HolidayRequest;