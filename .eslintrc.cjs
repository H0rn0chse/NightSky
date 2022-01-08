/* eslint-env node */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": ["off"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "eol-last": ["error", "always"],
        "no-unused-vars": "warn",
        "indent": ["error", 4, { "SwitchCase": 1 }]
    }
};
