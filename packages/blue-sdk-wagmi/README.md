# @taufinancexyz/blue-sdk-wagmi

<a href="https://www.npmjs.com/package/@taufinancexyz/blue-sdk-wagmi">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/v/@taufinancexyz/blue-sdk-wagmi?colorA=21262d&colorB=21262d&style=flat">
        <img src="https://img.shields.io/npm/v/@taufinancexyz/blue-sdk-wagmi?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Version">
    </picture>
</a>
<a href="https://github.com/morpho-org/blue-sdk-wagmi/blob/main/LICENSE">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/l/@taufinancexyz/blue-sdk-wagmi?colorA=21262d&colorB=21262d&style=flat">
        <img src="https://img.shields.io/npm/l/@taufinancexyz/blue-sdk-wagmi?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="MIT License">
    </picture>
</a>
<a href="https://www.npmjs.com/package/@taufinancexyz/blue-sdk-wagmi">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/@taufinancexyz/blue-sdk-wagmi?colorA=21262d&colorB=21262d&style=flat">
        <img src="https://img.shields.io/npm/dm/@taufinancexyz/blue-sdk-wagmi?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Downloads per month">
    </picture>
</a>
<br />
<br />

Wagmi-based package that exports Wagmi (React) hooks to fetch Morpho-related entities.

## Installation

```bash
npm install @taufinancexyz/blue-sdk-wagmi
```

```bash
yarn add @taufinancexyz/blue-sdk-wagmi
```

## Getting Started

```tsx
import { MarketId } from "@taufinancexyz/blue-sdk";
import { useMarket } from "@taufinancexyz/blue-sdk-wagmi";

export function Component({ marketId }: { marketId?: MarketId }) {
  const { data: market } = useMarket({ marketId });

  return (
    <h1>
      {market?.params.loanToken} / {market?.params.collateralToken}
    </h1>
  );
}
```
