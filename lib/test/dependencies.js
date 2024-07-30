"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const _util_1 = require("./_util");
(0, ava_1.default)('range types', async (t) => {
    const { ourDeps, ourPeerDeps, ourDevDeps } = await (0, _util_1.getPkgDetails)();
    const nonCompliantDepRanges = Object.entries({
        dep: ourDeps,
        peer: ourPeerDeps,
        dev: ourDevDeps,
    })
        .flatMap(([depType, deps]) => Object.entries(deps).map(([depName, spec]) => {
        if (spec === undefined)
            throw new Error();
        return [depName, depType, spec];
    }))
        .filter(([depName, depType, spec]) => {
        if (depName === 'typescript' && depType === 'peer') {
            return spec !== '*';
        }
        const range = (0, _util_1.extractVersionRange)(spec);
        switch (depType) {
            case 'dep':
                return !(0, _util_1.isSingleCaretRange)(range);
            case 'peer':
                return !(0, _util_1.isSingleCaretRange)(range);
            case 'dev':
                return !(0, _util_1.isPinnedRange)(range);
            default:
                throw new Error();
        }
    });
    t.deepEqual(nonCompliantDepRanges, []);
});
//# sourceMappingURL=dependencies.js.map