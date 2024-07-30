"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * https://github.com/mightyiam/eslint-config-love/issues/2
 */
class Zoo {
    name;
    constructor(name) {
        this.name = name;
    }
    get greeting() {
        return `Hello ${this.name}`;
    }
}
exports.default = Zoo;
/**
 * ESLint should ignore this `no-undef` violation because that rule is turned off for TypeScript.
 */
// console.log(undef)
/**
 * https://github.com/mightyiam/eslint-config-love/issues/110
 */
// Inline callbacks don't need return types:
setTimeout(() => {
    console.log();
}, 1);
// The return type is clear from the left side of the assignment:
const double = (n) => n * 2;
[1, 2].map(double);
//# sourceMappingURL=fixture.js.map