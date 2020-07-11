module.exports = {
    extends: ["airbnb-typescript-prettier"],
    rules: {
        "@typescript-eslint/no-use-before-define": "off",
        "no-param-reassign": ["warn", { "props": false }],
    }
};