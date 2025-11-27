export enum ChainId {
  RiseMainnet = 99999999, // change in the future
  RiseTestnet = 11155931,
  Localhost = 1337,
}

export interface ChainMetadata {
  readonly name: string;
  readonly id: ChainId;
  readonly explorerUrl: string;
  readonly nativeCurrency: {
    readonly name: string;
    readonly symbol: string;
    readonly decimals: number;
  };
  readonly identifier: string;
}

export namespace ChainUtils {
  export const toHexChainId = (chainId: ChainId) => {
    return `0x${chainId.toString(16)}`;
  };

  export const getExplorerUrl = (chainId: ChainId) => {
    return ChainUtils.CHAIN_METADATA[chainId].explorerUrl;
  };

  export const getExplorerAddressUrl = (chainId: ChainId, address: string) => {
    return `${getExplorerUrl(chainId)}/address/${address}`;
  };

  export const getExplorerTransactionUrl = (chainId: ChainId, tx: string) => {
    return `${getExplorerUrl(chainId)}/tx/${tx}`;
  };

  export const CHAIN_METADATA = {
    [ChainId.RiseMainnet]: {
      name: "Rise",
      id: ChainId.RiseMainnet,
      nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
      explorerUrl: "https://explorer.riselabs.xyz",
      identifier: "rise",
    },
    [ChainId.RiseTestnet]: {
      name: "Rise",
      id: ChainId.RiseTestnet,
      nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
      explorerUrl: "https://explorer.testnet.riselabs.xyz",
      identifier: "rise",
    },
    [ChainId.Localhost]: {
      name: "Rise",
      id: ChainId.Localhost,
      nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
      explorerUrl: "https://google,com",
      identifier: "rise",
    },
  } satisfies Record<ChainId, ChainMetadata>;
}
