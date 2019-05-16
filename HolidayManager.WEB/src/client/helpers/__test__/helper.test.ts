import * as React from "react";
import { dateDifference, convertUnixToDate } from "../date";
import { holidayStatus } from "../request";

describe("Helper Functions Unit Tests", () => {
    it("Expect correct day difference with Date Difference Function", () => {
        const offSet = 10;
        let startDate = new Date;
        let endDate = new Date;
        endDate.setDate(endDate.getDate() + 10);
        expect(dateDifference(startDate.getTime(), endDate.getTime())).toEqual(offSet);
    });

    it("Expect to convert Unixtime to correct date with Convert Unit To Date Function"
    , () => {
        const daysDate = new Date;
        const daysDateUnix = daysDate.getTime();
        expect(convertUnixToDate(daysDateUnix)).toEqual(daysDate);
    });

    it("Expect to get pending back from test on Holiday Status Function", () => {
        expect(holidayStatus(undefined)).toEqual("Pending");
    });

    it("Expect to get Approved back from test on Holiday Status Function", () => {
        expect(holidayStatus(true)).toEqual("Approved");
    });
});
