# @taufinancexyz/simulation-sdk-wagmi

<a href="https://www.npmjs.com/package/@taufinancexyz/simulation-sdk-wagmi">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/v/@taufinancexyz/simulation-sdk-wagmi?colorA=21262d&colorB=21262d&style=flat">
        <img src="https://img.shields.io/npm/v/@taufinancexyz/simulation-sdk-wagmi?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Version">
    </picture>
</a>
<a href="https://github.com/taufinancexyz/simulation-sdk-wagmi/blob/main/LICENSE">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/l/@taufinancexyz/simulation-sdk-wagmi?colorA=21262d&colorB=21262d&style=flat">
        <img src="https://img.shields.io/npm/l/@taufinancexyz/simulation-sdk-wagmi?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="MIT License">
    </picture>
</a>
<a href="https://www.npmjs.com/package/@taufinancexyz/simulation-sdk-wagmi">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/@taufinancexyz/simulation-sdk-wagmi?colorA=21262d&colorB=21262d&style=flat">
        <img src="https://img.shields.io/npm/dm/@taufinancexyz/simulation-sdk-wagmi?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Downloads per month">
    </picture>
</a>
<br />
<br />

Wagmi-based package that exports Wagmi (React) hooks to fetch Morpho-related entities.

## Installation

```bash
npm install @taufinancexyz/simulation-sdk-wagmi
```

```bash
yarn add @taufinancexyz/simulation-sdk-wagmi
```

## Getting Started

```tsx
import { useMemo } from "react";

import { Address, MarketId } from "@taufinancexyz/blue-sdk";
import { simulateOperation } from "@taufinancexyz/simulation-sdk";
import { useSimulationState } from "@taufinancexyz/simulation-sdk-wagmi";

export function Component({
  user,
  marketId,
}: {
  user?: Address;
  marketId?: MarketId;
}) {
  const { data } = useSimulationState({ marketIds: [marketId], users: [user] });

  const simulated = useMemo(() => {
    if (data == null) return;

    return simulateOperation(
      {
        type: "Blue_Supply",
        sender: user,
        args: {
          id: marketId,
          onBehalf: user,
          assets: 1_000000n,
        },
      },
      data
    );
  }, [data, user, marketId]);

  return <h1>{simulated.getPosition(user, marketId).supplyShares}</h1>;
}
```
