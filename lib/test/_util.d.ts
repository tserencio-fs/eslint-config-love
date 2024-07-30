import { TSESLint } from '@typescript-eslint/utils';
import type { PackageJson } from 'type-fest';
interface PkgDetails {
    pkgPath: string;
    pkgJson: PackageJson;
    ourDeps: NonNullable<PackageJson['dependencies']>;
    ourPeerDeps: NonNullable<PackageJson['peerDependencies']>;
    ourDevDeps: NonNullable<PackageJson['devDependencies']>;
}
export declare const getPkgDetails: () => Promise<PkgDetails>;
export declare const isSingleCaretRange: (rangeStr: string) => boolean;
export declare const isPinnedRange: (rangeStr: string) => boolean;
export declare const extractVersionRange: (spec: string) => string;
export declare const ourRules: Partial<Record<string, TSESLint.SharedConfig.RuleEntry>>;
export declare const equivalents: string[];
export {};
