/**
 * https://github.com/mightyiam/eslint-config-love/issues/10
 */
export type Bar = null;
export type Foo<Bar> = (a: Bar) => Bar;
/**
 * https://github.com/mightyiam/eslint-config-love/issues/2
 */
export default class Zoo {
    private readonly name;
    constructor(name: string);
    get greeting(): string;
}
/**
 * https://github.com/mightyiam/eslint-config-love/issues/3
 */
export interface Boo {
    b_oo: null;
}
