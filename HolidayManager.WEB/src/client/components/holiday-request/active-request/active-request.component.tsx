import * as React from 'react';
import GraphqlSchema from "../../../graphql";
import { AppContext } from '../../../context/appContext';
import { IHolidayRequest } from '../../../models/models';
import client from "../../../apolloClient";
import { DocumentNode } from 'graphql';
import Modal from '../../../shared/modal/modal.component';
import ActiveRequestList from './active-request-list';
import { convertUnixToDate } from '../../../helpers/date';
import Button from '../../../shared/button';

const ActiveRequest: React.FunctionComponent<any> = (props) => {
    const className = "active-request";
    const { objectRefId } = React.useContext(AppContext);
    const [ activeRequest, setActiveRequest ] = React.useState<IHolidayRequest | undefined>(undefined);
    const ref = React.createRef<Modal>();

    async function deleteHolidayRequest(): Promise<void> {
        let mutation: DocumentNode = GraphqlSchema.DELETE_HOLIDAY_REQUEST;
        await client.mutate({
            mutation,
            variables: {
                _id: activeRequest!._id
            }
        }).catch(e => {
            console.log(e.message);
        }).then(e => {
            ref.current!.close();
        })
    }

    const toggleRequest = (data: IHolidayRequest[], index: number): void => {
        if (!!ref!.current) {
            ref.current.open();
        }
        setActiveRequest(data[index])
    }

    return (
        <div className={`${className}`}>
            <ActiveRequestList dataType={"getUserHolidayRequests"} toggleRequest={toggleRequest} query={GraphqlSchema.GET_HOLIDAY_REQUESTS} variables={{_id: objectRefId}} />
            {activeRequest !== undefined && (
                <Modal className={`${className}__modal`} ref={ref}>
                    <h4 className={`${className}__modal__header`}>Delete Holiday Request</h4>
                    <p className={`${className}__modal__description`}>Do you wish to delete the following Holiday Request?</p>
                    <div className={`${className}__modal__request`}>
                        Ranging from: 
                        <span className={`${className}__modal__date`}>
                            {convertUnixToDate(activeRequest.from).toDateString()}
                        </span>
                    </div>
                    <div className={`${className}__modal__request`}>
                        to:  
                        <span className={`${className}__modal__date`}>
                            {convertUnixToDate(activeRequest.to).toDateString()}
                        </span>
                    </div>
                    <Button text="Yes" onClick={deleteHolidayRequest} className={`${className}__modal__button`} />
                </Modal>
            )}
        </div>
)
};

export default ActiveRequest;