import { shallow } from "enzyme";
import * as React from "react";
import HolidayRequest from "../holiday-request.component";
import ActiveRequest from "../active-request";

describe("Holiday Request Component Tests", () => {
    it("Renders correctly in DOM", () => {
        shallow(
            <HolidayRequest />
        );
    });

    it("Expects to find a Single Active Request Component Within Holiday Request Component", () => {
        const wrapper =shallow(
            <HolidayRequest />
        );
        expect(wrapper.find(ActiveRequest)).toHaveLength(1);
    });
});
