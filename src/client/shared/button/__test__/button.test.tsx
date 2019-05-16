import { shallow } from "enzyme";
import * as React from "react";
import Button from "../button.component";

describe("Button Component Tests", () => {
    it("Renders correctly in DOM", () => {
        shallow(
            <Button text="Test" />
        );
    });
    it("Expects to find button HTML element in the DOM", () => {
        const wrapper = shallow(<Button text="test"/>)
        expect(wrapper.find('button')).toHaveLength(1);
    });

    it("Expects to find button HTML element with className test in the DOM", () => {
        const wrapper = shallow(<Button className="test" text="test"/>)
        expect(wrapper.find('button.test')).toHaveLength(1);
    });

    it("Expects to run onClick function when button is pressed in the DOM", () => {
        const mockCallBackClick = jest.fn();
        const wrapper = shallow(
            <Button onClick={mockCallBackClick} className="test" text="test"/>
        );
        wrapper.find('button').simulate('click');
        expect(mockCallBackClick.mock.calls.length).toEqual(1);
    });
});
