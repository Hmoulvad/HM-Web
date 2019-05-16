export interface IUser {
    _id: string;
    username: string;
    password: string;
    ref?: string;
    role: Role;
}

export interface IUnit {
    _id: string;
    name: string;
    projects: IProject[];
    developers: IDeveloper[];
    unitManager: IUnitManager;
    projectManagers: IProjectManager[];
}

export interface IProject {
    _id: string;
    name: string;
    unit: IUnit;
    projectManager: IProjectManager;
    developers: IDeveloper[];
}

export enum Role {
    unitManager = "Unit Manager",
    projectManager = "Project Manager",
    developer = "Developer",
}

export interface IEmployee {
    _id: string;
    name: string;
    holidayRequests?: IHolidayRequest[];
    ref?: string;
}

export interface IUnitEmployee extends IEmployee {
    unit: IUnit;
}

export interface IDeveloper extends IUnitEmployee {
    projects: IProject[];
}

export interface IUnitManager extends IUnitEmployee { }

export interface IProjectManager extends IUnitEmployee {
    projects: IProject[];
}

export interface IHolidayRequest {
    _id: string;
    creatorRef: string;
    creatorName: string | undefined,
    unitManagerName?: string;
    unitManagerRef?: string;
    unitManagerApproval?: boolean;
    refName?: string; 
    ref?: string;
    refApproval?: boolean;
    from: Date,
    to: Date
}


