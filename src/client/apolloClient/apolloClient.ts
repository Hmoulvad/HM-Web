import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";

const httpLink = createHttpLink({
    uri: "https://impact-hm-server.herokuapp.com/",
  });
  
const authLink = setContext((_, { headers }: any) => {
const token = localStorage.getItem("token");
return {
    headers: {
    ...headers,
    authorization: token ? token : "",
    }
}
});

const client = new ApolloClient({
link: authLink.concat(httpLink),
cache: new InMemoryCache()
});

export default client;