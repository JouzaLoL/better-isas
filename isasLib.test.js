const isasLib = require("./isasLib");
const { expect } = require("chai");
const isWithinRange = require("date-fns/is_within_range");

require("dotenv").load();

describe("iSAS Lib", function () {
    this.slow(10000);

    /* Summer break check */
    before(() => {
        if (isWithinRange(new Date(), new Date((new Date()).getFullYear(), 6, 0), new Date((new Date()).getFullYear(), 9, 0))) {
            process.exit(0);
        }
    });

    it("should log in and get and parse prubezna klasifikace", async () => {
        const auth = [process.env["ISAS_USERNAME"], process.env["ISAS_PASSWORD"]];
        if (!auth || auth.some((d) => d == undefined)) {
            throw new Error("No user/pass specified in ENV vars");
        }

        const cookieJar = await isasLib.logIn({
            username: auth[0], password: auth[1]
        });

        const znamky = await isasLib.getZnamky(cookieJar);

        expect(znamky.length).to.be.at.least(1); /* Might fail on start of year */
        expect(znamky).to.satisfy((znamkyArray) => {
            return znamkyArray.every((znamka) => {
                return expect(znamka.datum).to.be.a("string")
                    && expect(znamka.datum.length).to.be.at.least(5)
                    && expect(znamka.detail).to.be.a("string")
                    && expect(znamka.vaha).to.be.a("number")
                    && expect(znamka.znamka).to.be.oneOf(["1", "2", "3", "4", "5", "A", "N", "NH"])
                    && expect(znamka.predmet).to.be.a("string");
            });
        });
    });

    it("should return no marks when login failed", async () => {
        const auth = ["DFDF", "asdfsdf"];
        // @ts-ignore
        const cookieJar = await isasLib.logIn({
            username: auth[0], password: auth[1]
        });

        const znamky = await isasLib.getZnamky(cookieJar);

        expect(znamky.length).to.equal(0);
    });

    it("should log in and get and parse detail", async () => {
        const auth = [process.env["ISAS_USERNAME"], process.env["ISAS_PASSWORD"]];
        if (!auth || auth.some((d) => d == undefined)) {
            throw new Error("No user/pass specified in ENV vars");
        }

        const cookieJar = await isasLib.logIn({
            username: auth[0], password: auth[1]
        });

        const znamky = await isasLib.getZnamky(cookieJar);
        const detail = await isasLib.getDetail(znamky[0].detail, cookieJar);

        expect(detail.histogram).to.be.a("string");
        expect(detail.detaily).to.be.a("string");
        expect(detail.histogram.length).to.be.at.least(20);
        expect(detail.detaily.length).to.be.at.least(20);
    });
});
