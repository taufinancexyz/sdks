# @taufinancexyz/test-wagmi

<a href="https://www.npmjs.com/package/@taufinancexyz/test-wagmi">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/v/@taufinancexyz/test-wagmi?colorA=21262d&colorB=21262d&style=flat">
        <img src="https://img.shields.io/npm/v/@taufinancexyz/test-wagmi?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Version">
    </picture>
</a>
<a href="https://github.com/taufinancexyz/test-wagmi/blob/main/LICENSE">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/l/@taufinancexyz/test-wagmi?colorA=21262d&colorB=21262d&style=flat">
        <img src="https://img.shields.io/npm/l/@taufinancexyz/test-wagmi?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="MIT License">
    </picture>
</a>
<a href="https://www.npmjs.com/package/@taufinancexyz/test-wagmi">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/@taufinancexyz/test-wagmi?colorA=21262d&colorB=21262d&style=flat">
        <img src="https://img.shields.io/npm/dm/@taufinancexyz/test-wagmi?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Downloads per month">
    </picture>
</a>
<br />
<br />

Wagmi-based extension of [`@taufinancexyz/test`](../test/) that injects a test Wagmi config as a test fixture alongside viem's anvil client.

## Installation

```bash
npm install @taufinancexyz/test-wagmi
```

```bash
yarn add @taufinancexyz/test-wagmi
```

## Getting Started

Export an extended vitest `test`:

```typescript
import { createWagmiTest } from "@taufinancexyz/test-wagmi";
import { mainnet } from "viem/chains";

export const test = createWagmiTest(mainnet, {
  forkUrl: process.env.MAINNET_RPC_URL,
  forkBlockNumber: 19_530_000,
});
```

See more on its internal usage for [wagmi-based tests here](../blue-sdk-wagmi/test/e2e/).
