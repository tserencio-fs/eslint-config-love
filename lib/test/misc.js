"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const __1 = __importDefault(require(".."));
(0, ava_1.default)('rule configs are arrays', (t) => {
    if (__1.default.rules === undefined)
        throw new Error();
    const nonArrayConfigs = Object.entries(__1.default.rules).filter(([_rule, config]) => !Array.isArray(config));
    t.deepEqual(nonArrayConfigs, []);
});
//# sourceMappingURL=misc.js.map