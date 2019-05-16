import { DocumentNode } from "graphql";
import gql from "graphql-tag";

const LOGIN: DocumentNode = gql `
    mutation logIn($username: String!, $password: String!) 
    {
        login(username: $username, password: $password)
    }
`;

const SIGN_UP: DocumentNode = gql `
    mutation signUp($username: String!, $password: String!)
    {
        signup(username: $username, password: $password)
    }
`;

const DELETE_HOLIDAY_REQUEST: DocumentNode = gql `
    mutation deleteHolidayRequest($_id: String!)
    {
        deleteHolidayRequest(_id: $_id)
    }
`;


const GQL_UNITS: DocumentNode = gql `
{
    units {
        _id,
        name
    }
}
`;

const WHO_AM_I: DocumentNode = gql `
{
    isLoggedIn {
        username,
    }
}
`;

const ADD_HOLIDAY_REQUEST: DocumentNode = gql `
    mutation createHolidayRequest($_id: String!, $role: String!, $projectId: String, $to: String!, $from: String!)
    {
        createHolidayRequest(_id: $_id, role: $role, projectId: $projectId, to: $to, from: $from)
    }
    
`;

const VALIDATE_TOKEN: DocumentNode = gql `
    mutation isTokenValid($token: String!) 
    {
        isTokenValid(token: $token)
    }
`;

const GET_DEVELOPER: DocumentNode = gql `
    query developer($_id: String!)
    {
        developer(_id: $_id) 
        {
            name,
            ref,
            unit,
            projects {
                _id,
                name,
                projectManager {
                    _id,
                    name,
                }
            },
            holidayRequests {
                _id
            }
        }    
    }
`;

const RESPOND_TO_HOLIDAY_REQUEST: DocumentNode = gql`
    mutation respondToHolidayRequest($_id: String!, $role: String!, $refId: String!, $response: Boolean!)
    {
        respondToHolidayRequest(_id: $_id, role: $role, refId: $refId, response: $response)
    }
`;

const GET_UNIT_MANAGER: DocumentNode = gql `
    query unitManager($_id: String!)
    {
        unitManager(_id: $_id) 
        {
            name,
            ref,
            unit,
            holidayRequests {
                _id
            }
        }    
    }
`;

const GET_PROJECT_MANAGER: DocumentNode = gql `
    query projectManager($_id: String!)
    {
        projectManager(_id: $_id) 
        {
            name,
            ref,
            unit,
            projects {
                _id,
            },
            holidayRequests {
                _id
            }
        }    
    }
`;

const GET_HOLIDAY_REQUESTS: DocumentNode = gql `
    query getUserHolidayRequests($_id: String!)
    {
        getUserHolidayRequests(_id: $_id) {
            _id,
            unitManagerRef,
            unitManagerName
            unitManagerApproval,
            refName,
            ref,
            refApproval,
            from,
            to,
        }
    }
`;

const GET_HOLIDAY_REQUESTS_MANAGER: DocumentNode = gql`
    query getPendingHolidayRequests($_id: String!)
    {
        getPendingHolidayRequests(_id: $_id) {
            _id,
            creatorName,
            unitManagerRef,
            unitManagerName
            unitManagerApproval,
            refName,
            ref,
            refApproval,
            from,
            to,
        }
    }
`;


const GraphQLSchema = {
    GET_HOLIDAY_REQUESTS,
    ADD_HOLIDAY_REQUEST,
    GQL_UNITS,
    WHO_AM_I,
    LOGIN,
    SIGN_UP,
    VALIDATE_TOKEN,
    GET_DEVELOPER,
    GET_UNIT_MANAGER,
    GET_PROJECT_MANAGER,
    DELETE_HOLIDAY_REQUEST,
    GET_HOLIDAY_REQUESTS_MANAGER,
    RESPOND_TO_HOLIDAY_REQUEST
}

export default GraphQLSchema;

