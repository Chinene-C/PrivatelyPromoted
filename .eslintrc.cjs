module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: "standard",
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    rules: {
        quotes: ["error", "double", {
            avoidEscape: true,
            allowTemplateLiterals: true
        }],
        indent: ["error", 4],
        semi: [2, "always"],
        camelcase: "off"
    }
};
