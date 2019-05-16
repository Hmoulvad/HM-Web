import * as React from 'react';
import { DocumentNode } from 'graphql';
import { Query } from 'react-apollo';
import { IHolidayRequest } from '../../../../models/models';
import { convertUnixToDate, dateDifference } from '../../../../helpers/date';
import { holidayStatus } from '../../../../helpers/request';

interface IRequestListProps {
    query: DocumentNode;
    variables: object;
    toggleRequest: any;
    dataType: string;
    className?: string;
}

const ActiveRequestList: React.FC<IRequestListProps> = ({query, variables, toggleRequest, dataType, className = "active-request-list"}): JSX.Element => {
    return (
      <>
        <div className={`${className}__headlines`}>
            <div className={`${className}__headline`}>Period</div>
            <div className={`${className}__headline_days`}>Days</div>
            <div className={`${className}__headline`}>Unit Manager</div>
            <div className={`${className}__headline`}>Project Manager</div>
        </div>
        <div className={`${className}__requests`}>
            <Query query={query} variables={variables}>
                {({ loading, error, data}) => {
                    if ( loading ) return <p>Loading...</p>;
                    if ( error ) return <p>Error...</p>;
                    if ( data ) return (data[dataType] as IHolidayRequest[]).map((request: IHolidayRequest, index: number) => {
                        return (
                            <div className={`${className}__request`} onClick={() => toggleRequest(data[dataType], index)} key={index}>
                                <div className={`${className}__request-text`}>{convertUnixToDate(request.from).toLocaleDateString()} {convertUnixToDate(request.to).toLocaleDateString()}</div>
                                <div className={`${className}__request-days`}>{dateDifference(request.from, request.to)}</div>
                                <div className={`${className}__request-text`}>{request.unitManagerName} - <span className={`${className}__request-status`}>{holidayStatus(request.unitManagerApproval)}</span></div>
                                {request.ref ? 
                                <div className={`${className}__request-text`}>{request.refName} - <span className={`${className}__request-status`}>{holidayStatus(request.refApproval)}</span></div> 
                                :  
                                <div className={`${className}__request-text`}>NaN</div>}
                            </div>
                        )
                    })
                }}
            </Query>
        </div>
      </>
    );
}

export default ActiveRequestList;

