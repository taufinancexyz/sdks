# @taufinancexyz/test

<a href="https://www.npmjs.com/package/@taufinancexyz/test">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/v/@taufinancexyz/test?colorA=21262d&colorB=21262d&style=flat">
        <img src="https://img.shields.io/npm/v/@taufinancexyz/test?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Version">
    </picture>
</a>
<a href="https://github.com/taufinancexyz/test/blob/main/LICENSE">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/l/@taufinancexyz/test?colorA=21262d&colorB=21262d&style=flat">
        <img src="https://img.shields.io/npm/l/@taufinancexyz/test?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="MIT License">
    </picture>
</a>
<a href="https://www.npmjs.com/package/@taufinancexyz/test">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/@taufinancexyz/test?colorA=21262d&colorB=21262d&style=flat">
        <img src="https://img.shields.io/npm/dm/@taufinancexyz/test?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Downloads per month">
    </picture>
</a>
<br />
<br />

Viem-based package that exports utilities to build Vitest & Playwright fixtures that spawn anvil forks as child processes.

Heavily inspired by [`prool`](https://github.com/wevm/prool), but lighter & faster.

## Installation

```bash
npm install @taufinancexyz/test
```

```bash
yarn add @taufinancexyz/test
```

## Getting Started

### Vitest (viem)

Export an extended vitest `test`:

```typescript
import { createViemTest } from "@taufinancexyz/test/vitest";
import { mainnet } from "viem/chains";

export const test = createViemTest(mainnet, {
  forkUrl: process.env.MAINNET_RPC_URL,
  forkBlockNumber: 19_530_000,
});
```

See more on its internal usage for [viem-based E2E tests here](../blue-sdk-viem/test/).

### Playwright

Export an extended Playwright `test`:

```typescript
import { createViemTest } from "@taufinancexyz/test/playwright";
import { mainnet } from "viem/chains";

export const test = createViemTest(mainnet, {
  forkUrl: process.env.MAINNET_RPC_URL,
  forkBlockNumber: 19_530_000,
});
```

### Spawn anvil instances

```typescript
import { mainnet } from "viem/chains";
import { spawnAnvil } from "@taufinancexyz/test";

spawnAnvil(mainnet, { forkBlockNumber: 19_750_000n });
```
