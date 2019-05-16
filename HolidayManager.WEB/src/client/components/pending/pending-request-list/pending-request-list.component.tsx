import * as React from 'react';
import { DocumentNode } from 'graphql';
import { Query } from 'react-apollo';
import { IHolidayRequest, Role } from '../../../models/models';
import { convertUnixToDate, dateDifference } from '../../../helpers/date';
import { holidayStatus } from '../../../helpers/request';
import { AppContext } from '../../../context/appContext';

interface IRequestListProps {
    query: DocumentNode;
    variables: object;
    toggleRequest: any;
    dataType: string;
    className?: string;
}

const PendingRequestList: React.FC<IRequestListProps> = ({query, variables, toggleRequest, dataType, className = "pending-request-list"}): JSX.Element => {
    const { role } = React.useContext(AppContext);

    const renderManagerName = (request: IHolidayRequest): JSX.Element => {
        if ( role === Role.unitManager) {
            return <div className={`${className}__request-text`}>{request.refName} - <span className={`${className}__request-status`}>{holidayStatus(request.refApproval)}</span></div>
        }
        if (role === Role.projectManager) {
            return <div className={`${className}__request-text`}>{request.unitManagerName} - <span className={`${className}__request-status`}>{holidayStatus(request.unitManagerApproval)}</span></div>
        }
        return <div>"Nan"</div>;
    }
    return (
      <>
        <div className={`${className}__headlines`}>
            <div className={`${className}__headline`}>Period</div>
            <div className={`${className}__headline_days`}>Days</div>
            <div className={`${className}__headline`}>Requester</div>
            <div className={`${className}__headline`}>{role === Role.projectManager ? "Project Manager" : "Unit Manager"}</div>
        </div>
        <div className={`${className}__requests`}>
            <Query query={query} variables={variables}>
                {({ loading, error, data}) => {
                    if ( loading ) return <p>Loading...</p>;
                    if ( error ) return <p>Error...</p>;
                    if ( data ) return (data[dataType] as IHolidayRequest[]).map((request: IHolidayRequest, index: number) => {
                        return (
                            <div className={`${className}__request`} onClick={() => toggleRequest(data[dataType], index)} key={index}>
                                <p className={`${className}__request-text`}>{convertUnixToDate(request.from).toLocaleDateString()} - {convertUnixToDate(request.to).toLocaleDateString()}</p>
                                <p className={`${className}__request-days`}>{dateDifference(request.from, request.to)}</p>
                                <p className={`${className}__request-text`}>{request.creatorName}</p>
                                {renderManagerName(request)}
                            </div>
                        )
                    })
                }}
            </Query>
        </div>
      </>
    );
}

export default PendingRequestList;

