export const parse_options = (options) => {
    return {
        capitalize_option: options && options.capitalize ? options.capitalize : false,
        humanize_option: options && options.humanize ? options.humanize : false
    };
};

export const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const humanize = (text) => {
    return text.split("_").join(" ").trim();
};