"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const typescript_eslint_1 = require("typescript-eslint");
const pluginN = __importStar(require("eslint-plugin-n"));
const pluginImport = __importStar(require("eslint-plugin-import"));
const pluginPromise = __importStar(require("eslint-plugin-promise"));
const _util_1 = require("./_util");
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("@typescript-eslint/utils");
const _intentionally_unused_rules_1 = require("../_intentionally-unused-rules");
const _rules_to_consider_1 = require("./_rules_to_consider");
if (pluginN === undefined)
    throw new Error();
if (pluginImport === undefined)
    throw new Error();
if (pluginPromise === undefined)
    throw new Error();
const eslintRules = new utils_1.TSESLint.Linter().getRules();
if (pluginN.rules === undefined)
    throw new Error();
if (pluginImport.rules === undefined)
    throw new Error();
if (pluginPromise.rules === undefined)
    throw new Error();
if (typescript_eslint_1.plugin.rules === undefined)
    throw new Error();
const rulesets = [
    [typescript_eslint_1.plugin.rules, '@typescript-eslint'],
    [pluginN.rules, 'n'],
    [pluginImport.rules, 'import'],
    [pluginPromise.rules, 'promise'],
];
const knownRules = new Map([
    ...eslintRules.entries(),
    ...rulesets.flatMap(([rules, pkgName]) => Object.entries(rules).map(([name, rule]) => [`${pkgName}/${name}`, rule])),
]);
const deprecatedKnownRules = [...knownRules.entries()]
    .filter(([_name, rule_]) => {
    const rule = rule_;
    const meta = rule.meta;
    if (meta === undefined)
        return false;
    return meta.deprecated === true;
})
    .map(([name, _rule]) => name);
const usedRules = Object.keys(_util_1.ourRules);
const acknowledgedRules = [
    ...deprecatedKnownRules,
    ..._rules_to_consider_1.rulesToConsider,
    ..._intentionally_unused_rules_1.intentionallyUnusedRules,
    ...usedRules,
];
(0, ava_1.default)('rule names valid', (t) => {
    const nonExistentRules = lodash_1.default.difference(acknowledgedRules, [
        ...knownRules.keys(),
    ]);
    t.deepEqual(nonExistentRules, []);
});
(0, ava_1.default)('no intersection between lists', (t) => {
    const lists = {
        rulesToConsider: _rules_to_consider_1.rulesToConsider,
        intentionallyUnusedRules: _intentionally_unused_rules_1.intentionallyUnusedRules,
        usedRules,
        deprecatedKnownRules,
    };
    const counts = Object.entries(lists)
        .flatMap(([listTitle, list]) => list.map((rule) => [listTitle, rule]))
        .reduce((acc, [listTitle, rule]) => {
        acc[rule] = Object.hasOwn(acc, rule)
            ? [...acc[rule], listTitle]
            : [listTitle];
        return acc;
    }, {});
    const intersection = Object.fromEntries(Object.entries(counts).filter(([_rule, inLists]) => inLists.length > 1));
    t.deepEqual(intersection, {});
});
(0, ava_1.default)('known rules are considered', (t) => {
    const inexplicablyExcludedRules = lodash_1.default.difference([...knownRules.keys()], acknowledgedRules);
    t.deepEqual(inexplicablyExcludedRules, []);
});
(0, ava_1.default)('no deprecated rules', (t) => {
    const usedDeprecatedRules = Object.keys(_util_1.ourRules).filter((name) => deprecatedKnownRules.includes(name));
    t.deepEqual(usedDeprecatedRules, []);
});
(0, ava_1.default)('JS equivalent rules are off', async (t) => {
    if (typescript_eslint_1.plugin.rules === undefined)
        throw new Error();
    const ourRules_ = _util_1.ourRules;
    if (ourRules_ === undefined)
        throw new Error();
    const jsEquivalentRulesThatAreOn = _util_1.equivalents.filter((ruleName) => {
        const baseName = ruleName.replace('@typescript-eslint/', '');
        const baseRuleConfig = ourRules_[baseName];
        if (baseRuleConfig === undefined)
            return false;
        if (!Array.isArray(baseRuleConfig))
            throw new Error();
        const severity = baseRuleConfig[0];
        if (typeof severity !== 'string')
            throw new Error();
        return severity !== 'off';
    });
    t.deepEqual(jsEquivalentRulesThatAreOn, []);
});
//# sourceMappingURL=rules.js.map