import * as React from 'react';
import LayoutContainer from '../../layout';
import AddRequest from './add-request';

const AddHolidayRequest: React.FC<any> = ({}) => {
    const className = "add-holiday-request";
    return (
        <LayoutContainer>
            <div className={`${className}`}>
                <div className={`${className}__wrapper`}>
                    <div className={`${className}__header`}>
                        <h4 className={`${className}__title`}>Add a Holiday Request</h4>
                    </div>
                </div>
                <AddRequest />
            </div>
        </LayoutContainer>
    );
}

export default AddHolidayRequest;
