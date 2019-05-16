import * as React from 'react';
import Helmet from 'react-helmet';
import * as DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Mutation } from 'react-apollo';
import GraphqlSchema from "../../../graphql";
import { AppContext } from '../../../context/appContext';
import { Role, IDeveloper } from '../../../models/models';
import Dropdown from '../../../shared/dropdown/dropdown.component';
import Button from '../../../shared/button';

interface IAddRequestProps {
}
interface IRangeState {
    from: Date;
    to: Date;
}

const AddRequest: React.FunctionComponent<IAddRequestProps> = ({}) => {
    const className = "add-request";
    const initialState: IRangeState = {
        from: new Date,
        to: new Date,
    };
    const numberOfMonths = 2;
    const [ state, setState ] = React.useState<IRangeState>(initialState);
    const { user, objectRefId, role } = React.useContext(AppContext);
    const [ activeProject, setActiveProject ] = React.useState<any | undefined>(undefined);

    React.useEffect(() => {
        if ( user !== undefined ) {
            if ((user as IDeveloper).projects !== undefined) {
                setActiveProject((user as IDeveloper).projects[0])
              }
        }
    }, [])

    const handleDayClick = (date: Date) => {
        const range = DayPicker.default.DateUtils.addDayToRange(date, state);
        setState(range);
        console.log(range);
    }

    const handleDropdownChange = (value: string) => {
        const projects = (user as IDeveloper).projects;
        if (projects !== undefined || null) {
          const findProject = projects.find(s => s.projectManager.name === value);
          setActiveProject(findProject);
        }
    }

    function dropdownOptions(): any[] {
        if ( user !== undefined) {
            const projects = (user as IDeveloper).projects;
            let options: any[] = [];
            projects.forEach(project => {
                options.push(project.projectManager.name)
            });
            return options;
        }
        return [];
    }

    const handleResetClick = (): void => {
        setState(initialState);
    }
    const { from, to } = state;
    const modifiers = { start: from, end: to};
    return (
        <div className={`${className}`}>
            {role === Role.developer && (
                <>
                <div className={`${className}__project`}>Pick the Project Manager you want to refer to request to</div>
                <Dropdown handleChange={handleDropdownChange} className={`${className}__dropdown`} options={dropdownOptions()}></Dropdown>
                </>
            )}
            <p className={`${className}__description`}>Pick the dates you where you wish to have vacation </p>
            <div className={`${className}__selected`}>
                <div className={`${className}__selected-header`}>Selected Dates</div>
                { from && to && (
                    <div className={`${className}__selected-dates`}>
                        <div className={`${className}__selected-date`}>{from.toLocaleDateString()}</div>
                        <div className={`${className}__selected-date`}>-</div>
                        <div className={`${className}__selected-date`}>{to.toLocaleDateString()}</div>
                    </div>
                )}
            </div>
        {from && to && <Button className={`${className}__reset-button`} onClick={handleResetClick} text="Reset"/> }
        <DayPicker.default
            className="Selectable"
            numberOfMonths={numberOfMonths}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={handleDayClick}
        />
        <Mutation mutation={GraphqlSchema.ADD_HOLIDAY_REQUEST}>
            {( addHolidayRequest, { error }) => (
                <Button text="Add Request" className={`${className}__add-button`} onClick={(e: any) => {
                    e.preventDefault();
                    addHolidayRequest({
                    variables: {
                    _id: objectRefId,
                    role,
                    projectId: activeProject._id,
                    to,
                    from,
                    }
                }).catch( e => {
                console.log(e.message);
                })
                }}/>
            )}
        </Mutation>
        </div>
);
};

export default AddRequest;