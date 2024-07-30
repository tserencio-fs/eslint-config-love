"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const utils_1 = require("@typescript-eslint/utils");
const __1 = __importDefault(require(".."));
const _expected_exported_value_1 = require("./_expected-exported-value");
const eslint = new utils_1.TSESLint.FlatESLint({
    baseConfig: [__1.default],
});
const actualP = eslint.calculateConfigForFile('foo.js');
(0, ava_1.default)('plugins', async (t) => {
    // @ts-expect-error type seems wrong
    const actual = await actualP;
    if (actual.plugins === undefined)
        throw new Error();
    const actualSansAt = Object.fromEntries(Object.entries(actual.plugins).filter(([key, _]) => key !== '@'));
    t.deepEqual(actualSansAt, _expected_exported_value_1.expectedExportedValue.plugins);
});
(0, ava_1.default)('languageOptions', async (t) => {
    // @ts-expect-error type seems wrong
    const actual = await actualP;
    const actualLanguageOptions = actual.languageOptions;
    if (actualLanguageOptions === undefined)
        throw new Error();
    t.deepEqual(actualLanguageOptions, {
        ..._expected_exported_value_1.expectedExportedValue.languageOptions,
        ecmaVersion: 'latest',
        sourceType: 'module',
    });
});
(0, ava_1.default)('rules', async (t) => {
    // @ts-expect-error type seems wrong
    const actual = await actualP;
    if (_expected_exported_value_1.expectedExportedValue.rules === undefined)
        throw new Error();
    const rules = _expected_exported_value_1.expectedExportedValue.rules;
    const normalized = Object.fromEntries(Object.entries(rules).map(([name, value]) => {
        if (value === undefined)
            throw new Error();
        if (!Array.isArray(value))
            throw new Error();
        const [level, ...options] = value;
        if (typeof level === 'number')
            throw new Error();
        return [name, [{ error: 2, warn: 1, off: 0 }[level], ...options]];
    }));
    t.deepEqual(actual.rules, normalized);
});
//# sourceMappingURL=resolved-config.js.map