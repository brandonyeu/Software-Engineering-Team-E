module.exports = {
    env: { browser: true, es2020: true, node: true },
    extends: ["custom", "plugin:react-hooks/recommended"],
    root: true,
    parserOptions: { ecmaVersion: "ESNext", sourceType: "module" },
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": "warn",
        "react-hooks/exhaustive-deps": "error",
    },
};
