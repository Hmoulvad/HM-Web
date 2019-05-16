import * as React from "react";
import { Role, IUser, IDeveloper, IUnitManager, IProjectManager } from "../models/models";

export interface IAppContext  {
    isAuth: boolean;
    isApp: boolean;
    objectRefId: string | undefined;
    userId: string | undefined;
    role: Role | undefined;
    user: IDeveloper | IUnitManager | IProjectManager | undefined;
    setIsApp: ( app: boolean ) => void;
    setAuth: ( auth: boolean ) => void;
    logout: () => void;
}

export const defaultContext: IAppContext = {
    isAuth: false,
    isApp: false,
    objectRefId: undefined,
    userId: undefined,
    role: undefined,
    user: undefined,
    logout: () => {
        defaultContext.objectRefId = undefined,
        defaultContext.user = undefined,
        defaultContext.isApp = false;
        defaultContext.isAuth = false;
        defaultContext.userId = undefined;
        defaultContext.role = undefined
    },
    setIsApp: (app: boolean) => {
        defaultContext.isApp = app;
    },
    setAuth: (auth: boolean) => {
        defaultContext.isAuth = auth;
    },
}

export const AppContext = React.createContext(defaultContext);