"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const utils_1 = require("@typescript-eslint/utils");
const __1 = __importDefault(require(".."));
const semver_1 = __importDefault(require("semver"));
const _util_1 = require("./_util");
const typescript_eslint_bottom_1 = require("typescript-eslint_bottom");
const tseslintBottom = 'typescript-eslint_bottom';
(0, ava_1.default)('our configuration is compatible with the plugin and parser at bottom of dep range', async (t) => {
    const { ourDeps, ourDevDeps } = await (0, _util_1.getPkgDetails)();
    const tseslintDepRange = ourDeps['typescript-eslint'];
    if (tseslintDepRange === undefined)
        throw new Error();
    const tseslintBottomRange = ourDevDeps[tseslintBottom];
    if (tseslintBottomRange === undefined)
        throw new Error();
    const tseslintBottomVersion = (0, _util_1.extractVersionRange)(tseslintBottomRange);
    const tseslintMinVersion = semver_1.default.minVersion(tseslintDepRange);
    if (tseslintMinVersion === null)
        throw new Error();
    t.deepEqual(tseslintBottomVersion, tseslintMinVersion.version, 'typescript-eslint_bottom version is min of dep');
    const config = {
        ...__1.default,
        languageOptions: {
            parser: typescript_eslint_bottom_1.parser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            ...__1.default.plugins,
            'typescript-eslint': typescript_eslint_bottom_1.plugin,
        },
    };
    const eslint = new utils_1.TSESLint.FlatESLint({
        baseConfig: [config],
    });
    const results = await eslint.lintText('', { filePath: 'src/index.ts' });
    t.true(results.length > 0);
    results.forEach((result) => t.deepEqual(result.messages, [], result.filePath));
});
//# sourceMappingURL=compatibility.js.map