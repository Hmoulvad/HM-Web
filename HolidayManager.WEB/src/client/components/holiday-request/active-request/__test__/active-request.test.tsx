import { shallow } from "enzyme";
import * as React from "react";
import ActiveRequest from "../active-request.component";
import ActiveRequestList from "../active-request-list";
import Modal from "../../../../shared/modal/modal.component";

describe("Active Request Component Tests", () => {
    it("Renders correctly in DOM", () => {
        shallow(
            <ActiveRequest />
        );
    });

    it("Expects to find a Single Active Request List Component Within Active Request Component", () => {
        const wrapper = shallow(
            <ActiveRequest />
        );
        expect(wrapper.find(ActiveRequestList)).toHaveLength(1);
    });

    it("Expects to find no Modal Component within Holiday Request since it shouldn't render when activeRequest is undefined per default", () => {
        const wrapper = shallow(
            <ActiveRequest />
        );
        expect(wrapper.find(Modal)).toBeNull;
    });
});
