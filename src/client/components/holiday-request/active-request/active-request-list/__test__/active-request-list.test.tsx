import { shallow } from "enzyme";
import * as React from "react";
import ActiveRequestList from "../active-request-list.component";
import GraphqlSchema from "../../../../../graphql";

describe("Active Request List Component Tests", () => {
    it("Renders correctly in DOM", () => {
        shallow(
            <ActiveRequestList 
                query={GraphqlSchema.GET_HOLIDAY_REQUESTS} 
                dataType={"getUserHolidayRequests"} 
                toggleRequest={() =>console.log("test")}
                variables={{_id: "5cd07c708ec4f39170c1117a"}} 
            />
        );
    });
});
