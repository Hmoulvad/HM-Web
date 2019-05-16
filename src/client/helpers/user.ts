import client from "../apolloClient/apolloClient";
import GraphQLSchema from "../graphql";
import { DocumentNode } from "graphql";

export async function isAuthenticated() {
    const results = await client.query({
        query: GraphQLSchema.WHO_AM_I
    }).catch(e => {
        console.log("IsAuthenticated: ",e)
    })
    if ( results ) {
        return true;
    }
    return false;
}

export async function getRefObject (role: string, refId: string) {
    let query: DocumentNode = GraphQLSchema.GET_DEVELOPER;
    switch (role) {
        case "Developer": {
            query = GraphQLSchema.GET_DEVELOPER;
            break;
        }
        case "Project Manager": {
            query = GraphQLSchema.GET_PROJECT_MANAGER;
            break;
        }
        case "Unit Manager": {
            query = GraphQLSchema.GET_UNIT_MANAGER;
            break;
        }
        default: {
            console.log("No Role was specified");
            break;
        }
    }
    const results = await client.query({
        query,
        variables: {_id: refId}
    }).catch(e => {
        console.log(e)
    })
    if ( results ) {
        return (results as any).data
    }
}