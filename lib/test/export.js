"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const __1 = __importDefault(require(".."));
const _expected_exported_value_1 = require("./_expected-exported-value");
(0, ava_1.default)('exported value', (t) => {
    t.deepEqual(__1.default, _expected_exported_value_1.expectedExportedValue);
});
//# sourceMappingURL=export.js.map