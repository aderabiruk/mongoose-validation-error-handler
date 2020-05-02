/**
 * Parse options argument and Returns an Options Object
 *
 * Options Object Definition { capitalize: Boolean, humanize: Boolean }
 *
 * @param {object} [options] Optional Object { [capitalize]: Boolean, [humanize]: Bolean }
 * @returns {object} Options Object
 */
export declare const parse_options: (options: any) => {
    capitalize_option: any;
    humanize_option: any;
};
/**
 * Capitalizes the first character of a text
 *
 * @param {string} text
 * @returns {string}
 */
export declare const capitalize: (text: string) => string;
/**
 * Replaces all underscores with a white space
 *
 * @param {string} text
 * @returns {string}
 */
export declare const humanize: (text: string) => string;
