import moment from 'moment';
import mongoose from 'mongoose';
import regeneratorRuntime from "regenerator-runtime";

import TypeModel from './TypeModel';
import MinMaxModel from "./MinMaxModel";
import UniqueModel from './UniqueModel';
import RequiredModel from './RequiredModel';
import MinMaxLengthModel from './MinMaxLengthModel';
import UserDefinedValidationModel from './UserDefinedValidationModel';

import transform_mongoose_error from '../dist/index';
import { capitalize, humanize, parse_options } from '../src/utils';

describe("MongooseValidationErrorHandler", () => {

    describe("capitalize", () => {
        it("starts with an alphabet", () => {
            expect(capitalize("")).toBe("");
            expect(capitalize("biruk")).toBe("Biruk");
            expect(capitalize("Biruk")).toBe("Biruk");
            expect(capitalize("biruk_adera")).toBe("Biruk_adera");
        });

        it("start with an underscore", () => {
            expect(capitalize("_")).toBe("_");
            expect(capitalize("_biruk")).toBe("_biruk");
            expect(capitalize("_biruk_adera")).toBe("_biruk_adera");
        });
    });

    describe("humanize", () => {
        it("no underscore", () => {
            expect(humanize("")).toBe("");
            expect(humanize("biruk")).toBe("biruk");
        });

        it("with underscore", () => {
            expect(humanize("_a")).toBe("a");
            expect(humanize("a_")).toBe("a");
            expect(humanize("a_b_c")).toBe("a b c");
            expect(humanize("biruk_adera")).toBe("biruk adera");
        });
    });

    describe("parse_options", () => {
        it("no options", () => {
            expect(parse_options()).toHaveProperty("capitalize_option", false);
            expect(parse_options()).toHaveProperty("humanize_option", false);
        });

        it("only capitalize", () => {
            let options = parse_options({capitalize: true});
            expect(options).toHaveProperty("capitalize_option", true);
            expect(options).toHaveProperty("humanize_option", false);
        });

        it("only humanize", () => {
            let options = parse_options({humanize: true});
            expect(options).toHaveProperty("capitalize_option", false);
            expect(options).toHaveProperty("humanize_option", true);
        });

        it("capitalize: false, humanize: false", () => {
            let options = parse_options({humanize: false, capitalize: false});
            expect(options).toHaveProperty("capitalize_option", false);
            expect(options).toHaveProperty("humanize_option", false);
        });

        it("capitalize: false, humanize: true", () => {
            let options = parse_options({humanize: false, capitalize: true});
            expect(options).toHaveProperty("capitalize_option", true);
            expect(options).toHaveProperty("humanize_option", false);
        });

        it("capitalize: true, humanize: false", () => {
            let options = parse_options({humanize: true, capitalize: false});
            expect(options).toHaveProperty("capitalize_option", false);
            expect(options).toHaveProperty("humanize_option", true);
        });

        it("capitalize: true, humanize: true", () => {
            let options = parse_options({humanize: true, capitalize: true});
            expect(options).toHaveProperty("capitalize_option", true);
            expect(options).toHaveProperty("humanize_option", true);
        });
    });
    
    describe("required: true, ", () => {
        let model;

        beforeEach(() => {
            model = new RequiredModel();
        });
        it("capitalize: false, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error);
                expect(errors_messages.length).toBe(5);
                expect(errors_messages).toContainEqual({"field": "required_string", "message": "\"required_string\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_number", "message": "\"required_number\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_date", "message": "\"required_date\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_boolean", "message": "\"required_boolean\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_buffer", "message": "\"required_buffer\" is Required."});
            }
        });
    
        it("capitalize: true, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true});
                expect(errors_messages.length).toBe(5);
                expect(errors_messages).toContainEqual({"field": "required_string", "message": "\"Required_string\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_number", "message": "\"Required_number\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_date", "message": "\"Required_date\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_boolean", "message": "\"Required_boolean\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_buffer", "message": "\"Required_buffer\" is Required."});
            }
        });
    
        it("capitalize: false, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {humanize: true});
                expect(errors_messages.length).toBe(5);
                expect(errors_messages).toContainEqual({"field": "required_string", "message": "\"required string\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_number", "message": "\"required number\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_date", "message": "\"required date\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_boolean", "message": "\"required boolean\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_buffer", "message": "\"required buffer\" is Required."});
            }
        });
    
        it("capitalize: true, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {humanize: true, capitalize: true});
                expect(errors_messages.length).toBe(5);
                expect(errors_messages).toContainEqual({"field": "required_string", "message": "\"Required string\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_number", "message": "\"Required number\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_date", "message": "\"Required date\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_boolean", "message": "\"Required boolean\" is Required."});
                expect(errors_messages).toContainEqual({"field": "required_buffer", "message": "\"Required buffer\" is Required."});
            }
        });
    });

    describe("minlength: 3, ", () => {
        let model;

        beforeAll(() => {
            model = new MinMaxLengthModel();
            model.minlength_string = "";
        });

        it("capitalize: false, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error);
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "minlength_string", "message": "\"minlength_string\" is shorter than the minimum allowed length."});
            }
        });
    
        it("capitalize: true, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "minlength_string", "message": "\"Minlength_string\" is shorter than the minimum allowed length."});            
            }
        });
    
        it("capitalize: false, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "minlength_string", "message": "\"minlength string\" is shorter than the minimum allowed length."});            
            }
        });
    
        it("capitalize: true, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true, humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "minlength_string", "message": "\"Minlength string\" is shorter than the minimum allowed length."});            
            }
        });
    });

    describe("maxlength: 8, ", () => {
        let model;

        beforeAll(() => {
            model = new MinMaxLengthModel();
            model.maxlength_string = "123456789";
        });

        it("capitalize: false, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error);
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "maxlength_string", "message": "\"maxlength_string\" is longer than the maximum allowed length."});
            }
        });
    
        it("capitalize: true, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "maxlength_string", "message": "\"Maxlength_string\" is longer than the maximum allowed length."});
            }
        });
    
        it("capitalize: false, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "maxlength_string", "message": "\"maxlength string\" is longer than the maximum allowed length."});
            }
        });
    
        it("capitalize: true, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true, humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "maxlength_string", "message": "\"Maxlength string\" is longer than the maximum allowed length."});
            }
        });
    });

    describe("min, ", () => {
        let model;
        
        describe("number: 5, ", () => {
            beforeAll(() => {
                model = new MinMaxModel();
                model.min_number = 0;
            });
    
            it("capitalize: false, humanize: false", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error);
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "min_number", "message": "\"min_number\" is less than the minimum allowed value."});
                }
            });

            it("capitalize: true, humanize: false", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error, {capitalize: true});
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "min_number", "message": "\"Min_number\" is less than the minimum allowed value."});
                }
            });

            it("capitalize: false, humanize: true", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error, {humanize: true});
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "min_number", "message": "\"min number\" is less than the minimum allowed value."});
                }
            });

            it("capitalize: true, humanize: true", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error, {capitalize: true, humanize: true});
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "min_number", "message": "\"Min number\" is less than the minimum allowed value."});
                }
            });
        });

        describe("30 Days Earlier", () => {
            beforeAll(() => {
                model = new MinMaxModel();
                model.min_date = moment().subtract(31, "days");
            });
    
            it("capitalize: false, humanize: false", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error);
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "min_date", "message": "\"min_date\" is before the minimum allowed date."});
                }
            });

            it("capitalize: true, humanize: false", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error, {capitalize: true});
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "min_date", "message": "\"Min_date\" is before the minimum allowed date."});
                }
            });

            it("capitalize: false, humanize: true", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error, {humanize: true});
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "min_date", "message": "\"min date\" is before the minimum allowed date."});
                }
            });

            it("capitalize: true, humanize: true", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error, {humanize: true, capitalize: true});
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "min_date", "message": "\"Min date\" is before the minimum allowed date."});
                }
            });
        })
    });

    describe("max, ", () => {
        let model;
        
        describe("number: 10, ", () => {
            beforeAll(() => {
                model = new MinMaxModel();
                model.max_number = 11;
            });
    
            it("capitalize: false, humanize: false", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error);
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "max_number", "message": "\"max_number\" is greater than the maximum allowed value."});
                }
            });

            it("capitalize: true, humanize: false", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error, {capitalize: true});
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "max_number", "message": "\"Max_number\" is greater than the maximum allowed value."});
                }
            });

            it("capitalize: false, humanize: true", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error, {humanize: true});
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "max_number", "message": "\"max number\" is greater than the maximum allowed value."});
                }
            });

            it("capitalize: true, humanize: true", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error, {capitalize: true, humanize: true});
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "max_number", "message": "\"Max number\" is greater than the maximum allowed value."});
                }
            });
        });

        describe("30 Days Later", () => {
            beforeAll(() => {
                model = new MinMaxModel();
                model.max_date = moment().add(31, "days");
            });
    
            it("capitalize: false, humanize: false", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error);
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "max_date", "message": "\"max_date\" is after the maximum allowed date."});
                }
            });

            it("capitalize: true, humanize: false", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error, {capitalize: true});
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "max_date", "message": "\"Max_date\" is after the maximum allowed date."});
                }
            });

            it("capitalize: false, humanize: true", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error, {humanize: true});
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "max_date", "message": "\"max date\" is after the maximum allowed date."});
                }
            });

            it("capitalize: true, humanize: true", async () => {
                try {
                    await model.save();
                    fail();
                }
                catch (error) {
                    let errors_messages = transform_mongoose_error(error, {capitalize: true, humanize: true});
                    expect(errors_messages.length).toBe(1);
                    expect(errors_messages).toContainEqual({"field": "max_date", "message": "\"Max date\" is after the maximum allowed date."});
                }
            });

        })
    });

    describe("boolean", () => {
        let model;

        beforeAll(() => {
            model = new TypeModel();
            model.type_boolean = "content";
        });

        it("capitalize: false, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_boolean", "message": "\"type_boolean\" must be a boolean."});
            }
        });

        it("capitalize: true, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_boolean", "message": "\"Type_boolean\" must be a boolean."});
            }
        });

        it("capitalize: false, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_boolean", "message": "\"type boolean\" must be a boolean."});
            }
        });

        it("capitalize: true, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true, humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_boolean", "message": "\"Type boolean\" must be a boolean."});
            }
        });
    });

    describe("buffer", () => {
        let model;

        beforeAll(() => {
            model = new TypeModel();
            model.type_buffer = true;
        });

        it("capitalize: false, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_buffer", "message": "\"type_buffer\" must be a buffer."});
            }
        });

        it("capitalize: true, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_buffer", "message": "\"Type_buffer\" must be a buffer."});
            }
        });

        it("capitalize: false, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_buffer", "message": "\"type buffer\" must be a buffer."});
            }
        });

        it("capitalize: true, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true, humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_buffer", "message": "\"Type buffer\" must be a buffer."});
            }
        });
    });

    describe("date", () => {
        let model;

        beforeAll(() => {
            model = new TypeModel();
            model.type_date = true;
        });

        it("capitalize: false, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_date", "message": "\"type_date\" must be a date."});
            }
        });

        it("capitalize: true, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_date", "message": "\"Type_date\" must be a date."});
            }
        });

        it("capitalize: false, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_date", "message": "\"type date\" must be a date."});
            }
        });

        it("capitalize: true, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true, humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_date", "message": "\"Type date\" must be a date."});
            }
        });
    });

    describe("enum", () => {
        let model;

        beforeAll(() => {
            model = new TypeModel();
            model.type_string_enum = "D";
        });

        it("capitalize: false, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_string_enum", "message": "\"D\" is an invalid value for the attribute \"type_string_enum\"."});
            }
        });

        it("capitalize: true, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_string_enum", "message": "\"D\" is an invalid value for the attribute \"Type_string_enum\"."});
            }
        });

        it("capitalize: false, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_string_enum", "message": "\"D\" is an invalid value for the attribute \"type string enum\"."});
            }
        });

        it("capitalize: true, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true, humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_string_enum", "message": "\"D\" is an invalid value for the attribute \"Type string enum\"."});
            }
        });
    });

    describe("number", () => {
        let model;

        beforeAll(() => {
            model = new TypeModel();
            model.type_number = "not-a-number";
        });

        it("capitalize: false, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_number", "message": "\"type_number\" must be a number."});
            }
        });

        it("capitalize: true, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_number", "message": "\"Type_number\" must be a number."});
            }
        });

        it("capitalize: false, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_number", "message": "\"type number\" must be a number."});
            }
        });

        it("capitalize: true, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true, humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_number", "message": "\"Type number\" must be a number."});
            }
        });        
    });

    describe("ObjectId", () => {
        let model;

        beforeAll(() => {
            model = new TypeModel();
            model.type_object_id = "not-an-object-id";
        });

        it("capitalize: false, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_object_id", "message": "\"type_object_id\" must be an ObjectId."});
            }
        });

        it("capitalize: true, humanize: false", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_object_id", "message": "\"Type_object_id\" must be an ObjectId."});
            }
        });

        it("capitalize: false, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_object_id", "message": "\"type object id\" must be an ObjectId."});
            }
        });

        it("capitalize: true, humanize: true", async () => {
            try {
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true, humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "type_object_id", "message": "\"Type object id\" must be an ObjectId."});
            }
        });
    });

    describe("User Defined", () => {

        it("Validation with Message", async () => {
            try {
                let model = new UserDefinedValidationModel();
                model.array_validator_with_message = [];
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {});
                expect(errors_messages).toContainEqual({"field": "array_validator_with_message", "message": "Array must contain a value"});
            }
        });

        it("Validation with no Message", async () => {
            try {
                let model = new UserDefinedValidationModel();
                model.array_validator_with_no_message = [];
                await model.save();
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {});
                expect(errors_messages).toContainEqual({"field": "array_validator_with_no_message", "message": "Validator failed for path `array_validator_with_no_message` with value ``"});
            }
        });
    });

    describe("unique", () => {
        beforeAll(async () => {
            let dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/mongoose-validation-error-handler";
            await mongoose.connect(dbUrl, {useUnifiedTopology: true, useNewUrlParser: true});

            let model = new UniqueModel();
            model.unique_attribute_1 = "unique1@unique.com";
            await model.save();
        });

        it("capitalize: false, humanize: false", async () => {
            try {
                let model = new UniqueModel();
                model.unique_attribute_1 = "unique1@unique.com";
                await model.save();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {});
                expect(errors_messages).toContainEqual({"field": "unique_attribute_1", "message": "unique_attribute_1 already exists."});
            }

        });

        it("capitalize: true, humanize: false", async () => {
            try {
                let model = new UniqueModel();
                model.unique_attribute_1 = "unique1@unique.com";
                await model.save();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true});
                expect(errors_messages).toContainEqual({"field": "unique_attribute_1", "message": "Unique_attribute_1 already exists."});
            }

        });

        it("capitalize: false, humanize: true", async () => {
            try {
                let model = new UniqueModel();
                model.unique_attribute_1 = "unique1@unique.com";
                await model.save();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {humanize: true});
                expect(errors_messages).toContainEqual({"field": "unique_attribute_1", "message": "unique attribute 1 already exists."});
            }
        });

        it("capitalize: true, humanize: true", async () => {
            try {
                let model = new UniqueModel();
                model.unique_attribute_1 = "unique1@unique.com";
                await model.save();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true, humanize: true});
                expect(errors_messages).toContainEqual({"field": "unique_attribute_1", "message": "Unique attribute 1 already exists."});
            }

        });


        afterAll(async () => {
            await UniqueModel.deleteMany({});
            await mongoose.connection.dropCollection("unique");
            mongoose.connection.close();
        });
    })


    describe("CastError", () => {
        it("capitalize: false, humanize: false", async () => {
            try {
                let response = await RequiredModel.find({_id: "INVALID-ID"});
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "_id", "message": "\"RequiredModel\" with the provided \"_id\" doesn't exist."});
            }
        });

        it("capitalize: true, humanize: false", async () => {
            try {
                let response = await RequiredModel.find({_id: "INVALID-ID"});
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "_id", "message": "\"RequiredModel\" with the provided \"_id\" doesn't exist."});
            }
        });

        it("capitalize: false, humanize: true", async () => {
            try {
                let response = await RequiredModel.find({_id: "INVALID-ID"});
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "_id", "message": "\"RequiredModel\" with the provided \"id\" doesn't exist."});
            }
        });

        it("capitalize: true, humanize: true", async () => {
            try {
                let response = await RequiredModel.find({_id: "INVALID-ID"});
                fail();
            }
            catch (error) {
                let errors_messages = transform_mongoose_error(error, {capitalize: true, humanize: true});
                expect(errors_messages.length).toBe(1);
                expect(errors_messages).toContainEqual({"field": "_id", "message": "\"RequiredModel\" with the provided \"id\" doesn't exist."});
            }
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

});