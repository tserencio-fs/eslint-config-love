"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.equivalents = exports.ourRules = exports.extractVersionRange = exports.isPinnedRange = exports.isSingleCaretRange = exports.getPkgDetails = void 0;
const __1 = __importDefault(require(".."));
const typescript_eslint_1 = require("typescript-eslint");
const utils_1 = require("@typescript-eslint/utils");
const semver_1 = __importDefault(require("semver"));
const getPkgDetails = async () => {
    const { readPackageUp } = await import('read-pkg-up');
    const readResult = await readPackageUp();
    if (readResult === undefined) {
        throw new Error();
    }
    const ourPkg = readResult.packageJson;
    if (ourPkg.dependencies === undefined) {
        throw new Error();
    }
    const ourDeps = ourPkg.dependencies;
    if (ourPkg.peerDependencies === undefined) {
        throw new Error();
    }
    const ourPeerDeps = ourPkg.peerDependencies;
    if (ourPkg.devDependencies === undefined) {
        throw new Error();
    }
    const ourDevDeps = ourPkg.devDependencies;
    return {
        pkgJson: ourPkg,
        pkgPath: readResult.path,
        ourDeps,
        ourPeerDeps,
        ourDevDeps,
    };
};
exports.getPkgDetails = getPkgDetails;
const isSingleCaretRange = (rangeStr) => {
    const range = new semver_1.default.Range(rangeStr);
    return (range.set.length === 1 &&
        range.set[0].length === 2 &&
        range.set[0][0].operator === '>=' &&
        range.set[0][1].operator === '<');
};
exports.isSingleCaretRange = isSingleCaretRange;
const isPinnedRange = (rangeStr) => {
    const range = new semver_1.default.Range(rangeStr);
    return (range.set.length === 1 &&
        range.set[0].length === 1 &&
        range.set[0][0].operator === '');
};
exports.isPinnedRange = isPinnedRange;
const extractVersionRange = (spec) => spec.split('@').slice(-1)[0];
exports.extractVersionRange = extractVersionRange;
const ourRules_ = __1.default.rules;
if (ourRules_ === undefined)
    throw new Error('we seem to be exporting no rules');
exports.ourRules = ourRules_;
exports.equivalents = [...new utils_1.TSESLint.Linter().getRules().keys()].filter((name) => Object.prototype.hasOwnProperty.call(typescript_eslint_1.plugin.rules, name));
//# sourceMappingURL=_util.js.map