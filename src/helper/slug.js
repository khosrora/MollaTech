exports.slug = function (str) {
    return str.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
};