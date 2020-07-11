module.exports = {
    extends: [
        "airbnb/base",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    plugins: ["react", "react-hooks", "@typescript-eslint"],
    parser: "@typescript-eslint/parser",
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "curly": ["error", "all"],
        "import/extensions": "off",
        "import/order": "off",
        "no-bitwise": "warn",
        "no-param-reassign": ["warn", { "props": false }],
        "no-plusplus": "warn",
        "no-shadow": "off",
        "no-underscore-dangle": "warn",
        "no-unused-expressions": ["error", {"allowTernary": true}],
        "object-shorthand": ["error", "always"],
        "prefer-destructuring": ["error", {"object": true, "array": false}],
        "react/display-name": "warn",
        "react/no-array-index-key": "warn",
        "react/prop-types": ["error", { "ignore": ["children", "className"], "skipUndeclared": true }],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "semi": "error",
    },
    globals: {
        "window": true,
        "document": true,
        "fetch": true,
        "navigator": true,
        "alert": true,
        "Image": true,
        "IntersectionObserver": true,
        "FormData": true,
        "it": true,
        "describe": true,
    },
    "settings": {
        "react": {
            "version": "latest"
        },
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    }
};