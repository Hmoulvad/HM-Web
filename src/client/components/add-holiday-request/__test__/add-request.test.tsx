import { shallow } from "enzyme";
import * as React from "react";
import AddHolidayRequest from "../add-holiday-request.component";
import AddRequest from "../add-request";

describe("Add Holiday Request Component Tests", () => {
    it("Renders correctly in DOM", () => {
        shallow(
            <AddHolidayRequest />
        );
    });

    it("Expects to find a Single Add Request Component Within Add Holiday Request Component", () => {
        const wrapper =shallow(
            <AddHolidayRequest />
        );
        expect(wrapper.find(AddRequest)).toHaveLength(1); 
    });
});
