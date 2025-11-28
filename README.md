# Morpho SDKs

![image](https://github.com/user-attachments/assets/c77d5054-5342-4c1b-81ae-b8c002c2fd8d)

<p align="center"><i>A collection of Software Development Kits to ease interactions with the Morpho protocol and Morpho Vaults.</i></p>
<br />

## Getting Started

### Viem

- [**`@taufinancexyz/blue-sdk-viem`**](./packages/blue-sdk-viem/): Viem-based augmentation of `@taufinancexyz/blue-sdk` that exports (and optionally injects) viem-based fetch methods
- [**`@taufinancexyz/bundler-sdk-viem`**](./packages/bundler-sdk-viem/): Viem-based extension of `@taufinancexyz/simulation-sdk` that exports utilities to transform simple interactions on Morpho (such as `Blue_Borrow`) and Morpho Vaults (such as `MetaMorpho_Deposit`) into the required bundles (with ERC20 approvals, transfers, etc) to submit to the bundler onchain
- [**`@taufinancexyz/liquidity-sdk-viem`**](./packages/liquidity-sdk-viem/): Viem-based package that helps seamlessly calculate the liquidity available through the PublicAllocator
- [**`@taufinancexyz/liquidation-sdk-viem`**](./packages/liquidation-sdk-viem/): Viem-based package that provides utilities to build viem-based liquidation bots on Morpho and examples using Flashbots and Morpho's GraphQL API

### Wagmi

- [**`@taufinancexyz/blue-sdk-wagmi`**](./packages/blue-sdk-wagmi/): Wagmi-based package that exports Wagmi (React) hooks to fetch Morpho-related entities
- [**`@taufinancexyz/simulation-sdk-wagmi`**](./packages/simulation-sdk-wagmi/): Wagmi-based extension of `@taufinancexyz/simulation-sdk` that exports Wagmi (React) hooks to fetch simulation states

### Development

- [**`@taufinancexyz/morpho-ts`**](./packages/morpho-ts/): TypeScript package to handle all things time & format-related

- [**`@taufinancexyz/blue-sdk`**](./packages/blue-sdk/): Framework-agnostic package that defines Morpho-related entity classes (such as `Market`, `Token`, `Vault`)

- [**`@taufinancexyz/simulation-sdk`**](./packages/simulation-sdk/): Framework-agnostic package that defines methods to simulate interactions on Morpho (such as `Supply`, `Borrow`) and Morpho Vaults (such as `Deposit`, `Withdraw`)

- [**`@taufinancexyz/blue-api-sdk`**](./packages/blue-api-sdk/): GraphQL SDK that exports types from the [API's GraphQL schema](https://blue-api.morpho.org/graphql) and a useful Apollo cache controller

### Testing

- [**`@taufinancexyz/test`**](./packages/test/): Viem-based package that exports utilities to build Vitest & Playwright fixtures that spawn anvil forks as child processes
- [**`@taufinancexyz/test-wagmi`**](./packages/test-wagmi/): Wagmi-based extension of `@taufinancexyz/test` that injects a test Wagmi config as a test fixture alongside viem's anvil client

- [**`@taufinancexyz/morpho-test`**](./packages/morpho-test/): Framework-agnostic extension of `@taufinancexyz/blue-sdk` that exports test fixtures useful for E2E tests on forks

### Test coverage

1. Install `lcov`: `sudo apt install lcov`
2. Generate coverage info: `pnpm test:coverage`
3. Generate hierarchical coverage report: `pnpm coverage:report`

## Getting involved

Learn [how to add a new chain configuration](./docs/adding-new-chain.md) to the sdks.

## Authors

- [@rubilmax](https://github.com/rubilmax) (rubilmax.eth, [Twitter](https://x.com/rubilmax))
- [@oumar-fall](https://github.com/oumar-fall) (oumix.eth)
- [@julien-devatom](https://github.com/oumar-fall) ([Twitter](https://x.com/julien_devatom))

## License

[MIT](/LICENSE) License
