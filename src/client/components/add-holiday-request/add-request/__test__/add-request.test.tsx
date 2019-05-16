import AddRequest from "../add-request.component";
import { shallow } from "enzyme";
import * as React from "react";

describe("Add Request Component Tests", () => {
    it("Renders correctly in DOM", () => {
        shallow(
            <AddRequest />
        );
    });
});
