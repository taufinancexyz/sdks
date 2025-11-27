import {
  type DeepPartial,
  type DottedKeys,
  deepFreeze,
  entries,
} from "@morpho-org/morpho-ts";
import isPlainObject from "lodash.isplainobject";
import mergeWith from "lodash.mergewith";
import { ChainId } from "./chain.js";
import { UnsupportedChainIdError } from "./errors.js";
import type { Address } from "./types.js";

/** Address used to replicate an erc20-behaviour for native token.
 *
 * NB: data might differ from expected onchain native token data
 */
export const NATIVE_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export interface ChainAddresses {
  morpho: Address;
  permit2?: Address;
  bundler3: {
    bundler3: Address;
    generalAdapter1: Address;
    paraswapAdapter?: Address;
    erc20WrapperAdapter?: Address;
    compoundV2MigrationAdapter?: Address;
    compoundV3MigrationAdapter?: Address;
    aaveV2MigrationAdapter?: Address;
    aaveV3CoreMigrationAdapter?: Address;
    aaveV3PrimeMigrationAdapter?: Address;
    aaveV3EtherFiMigrationAdapter?: Address;
    aaveV3OptimizerMigrationAdapter?: Address;
  };
  adaptiveCurveIrm: Address;
  publicAllocator?: Address;
  metaMorphoFactory?: Address;
  vaultV2Factory?: Address;
  morphoMarketV1AdapterFactory?: Address;
  morphoVaultV1AdapterFactory?: Address;
  registryList?: Address;
  chainlinkOracleFactory?: Address;
  preLiquidationFactory?: Address;
  wNative?: Address;
  morphoToken?: Address;
  /**
   * Must implement DAI specific permit (otherwise breaks permit signatures).
   */
  dai?: Address;
  /**
   * Must implement USDC permit version 2 (otherwise breaks permit signatures).
   */
  usdc?: Address;
  stEth?: Address;
  wstEth?: Address;
}

const _addressesRegistry = {
  // [ChainId.EthMainnet]: {
  //   morpho: "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb",
  //   permit2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
  //   bundler3: {
  //     bundler3: "0x6566194141eefa99Af43Bb5Aa71460Ca2Dc90245",
  //     generalAdapter1: "0x4A6c312ec70E8747a587EE860a0353cd42Be0aE0",
  //     paraswapAdapter: "0x03b5259Bd204BfD4A616E5B79b0B786d90c6C38f",
  //     erc20WrapperAdapter: "0xf83D17dFE160597b19e4FdD8ea61A23e9a87F962",
  //     compoundV2MigrationAdapter: "0x9B89c07f480Df1945279031b5fC6fF241b8f1101",
  //     compoundV3MigrationAdapter: "0xdBa5bdE29eA030Bfa6A608592dFcA1D02CB26773",
  //     aaveV2MigrationAdapter: "0x40288815C399709dFC0875A384B637fFe387961B",
  //     aaveV3CoreMigrationAdapter: "0xb09e40EbE31b738fbf20289270a397118707D475",
  //     aaveV3PrimeMigrationAdapter: "0x2CC8d502a65824B4cF9A58DB03490bA024BDB806",
  //     aaveV3EtherFiMigrationAdapter:
  //       "0x4011dc6581fA05F9B0c7A12AdCd676e2b1a59ca3",
  //     aaveV3OptimizerMigrationAdapter:
  //       "0x9e2ea2d5785598a163D569D795f286F5C55ad972",
  //   },
  //   adaptiveCurveIrm: "0x870aC11D48B15DB9a138Cf899d20F13F79Ba00BC",
  //   publicAllocator: "0xfd32fA2ca22c76dD6E550706Ad913FC6CE91c75D",
  //   metaMorphoFactory: "0x1897A8997241C1cD4bD0698647e4EB7213535c24",
  //   vaultV2Factory: "0xA1D94F746dEfa1928926b84fB2596c06926C0405",
  //   morphoMarketV1AdapterFactory: "0xb049465969ac6355127cDf9E88deE63d25204d5D",
  //   morphoVaultV1AdapterFactory: "0xD1B8E2dee25c2b89DCD2f98448a7ce87d6F63394",
  //   registryList: "0x3696c5eAe4a7Ffd04Ea163564571E9CD8Ed9364e",
  //   chainlinkOracleFactory: "0x3A7bB36Ee3f3eE32A60e9f2b33c1e5f2E83ad766",
  //   preLiquidationFactory: "0x6FF33615e792E35ed1026ea7cACCf42D9BF83476",

  //   wNative: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  //   morphoToken: "0x9994E35Db50125E0DF82e4c2dde62496CE330999",
  //   // Must implement DAI specific permit (otherwise breaks permit signatures).
  //   dai: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  //   sDai: "0x83F20F44975D03b1b09e64809B757c47f942BEeA",
  //   mkr: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
  //   stEth: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
  //   wstEth: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
  //   osEth: "0xf1C9acDc66974dFB6dEcB12aA385b9cD01190E38",
  //   bIB01: "0xCA30c93B02514f86d5C86a6e375E3A330B435Fb5",
  //   // If we want to change the wbIB01 address, we have to check if the new one has simple permit or not.
  //   // Currently, wbIB01 is considered to have simple permit.
  //   wbIB01: "0xcA2A7068e551d5C4482eb34880b194E4b945712F",
  //   bC3M: "0x2F123cF3F37CE3328CC9B5b8415f9EC5109b45e7",
  //   // If we want to change the wbC3M address, we have to check if the new one has simple permit or not.
  //   // Currently, wbC3M is considered to have simple permit.
  //   wbC3M: "0x95D7337d43340E2721960Dc402D9b9117f0d81a2",
  //   // Must implement USDC permit version 2 (otherwise breaks permit signatures).
  //   usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  //   usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  //   crvUsd: "0xf939E0A03FB07F59A73314E73794Be0E57ac1b4E",

  //   "stkcvxcrvUSDTWBTCWETH-morpho":
  //     "0xb0Ce26C88e4e7DCa51968b6047f44646f5064278",
  //   crvUSDTWBTCWETH: "0xf5f5B97624542D72A9E06f04804Bf81baA15e2B4",
  //   "stkcvxcrvUSDCWBTCWETH-morpho":
  //     "0x0ea1a65A2c255f24Ee8D81eA6AaC54Decd9d269e",
  //   crvUSDCWBTCWETH: "0x7F86Bf177Dd4F3494b841a37e810A34dD56c829B",
  //   "stkcvxcrvCRVUSDTBTCWSTETH-morpho":
  //     "0x3ce8Ec9f3d89aD0A2DdbCC3FDB8991BD241Fc82E",
  //   crvCRVUSDTBTCWSTETH: "0x2889302a794dA87fBF1D6Db415C1492194663D13",
  //   "stkcvxTryLSD-morpho": "0x6BA072F0d22806F2C52e9792AF47f2D59103BEBE",
  //   tryLSD: "0x2570f1bD5D2735314FC102eb12Fc1aFe9e6E7193",
  //   "stkcvxcrvUSDETHCRV-morpho": "0xAc904BAfBb5FB04Deb2b6198FdCEedE75a78Ce5a",
  //   crvUSDETHCRV: "0x4eBdF703948ddCEA3B11f675B4D1Fba9d2414A14",
  //   "stkcvx2BTC-f-morpho": "0x385E12cf4040543Bc8C18e05C1298Be5B04f3f5e",
  //   "2BTC-f": "0xB7ECB2AA52AA64a717180E030241bC75Cd946726",
  // },
  // [ChainId.BaseMainnet]: {
  //   morpho: "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb",
  //   permit2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
  //   bundler3: {
  //     bundler3: "0x6BFd8137e702540E7A42B74178A4a49Ba43920C4",
  //     generalAdapter1: "0xb98c948CFA24072e58935BC004a8A7b376AE746A",
  //     paraswapAdapter: "0x6abE8ABd0275E5564ed1336F0243A52C32562F71",
  //     erc20WrapperAdapter: "0xdeEf55F0A7366cC3Baf5E04313269389Fe17E9AE",
  //     compoundV3MigrationAdapter: "0x85D4812Ef92c040d4270eD8547b6835e41FbbB70",
  //     aaveV3CoreMigrationAdapter: "0xb27Aa2a964eAd5ed661D86974b37e4fB995b36f5",
  //   },
  //   adaptiveCurveIrm: "0x46415998764C29aB2a25CbeA6254146D50D22687",
  //   publicAllocator: "0xA090dD1a701408Df1d4d0B85b716c87565f90467",
  //   metaMorphoFactory: "0xFf62A7c278C62eD665133147129245053Bbf5918",
  //   vaultV2Factory: "0x4501125508079A99ebBebCE205DeC9593C2b5857",
  //   morphoMarketV1AdapterFactory: "0x133baC94306B99f6dAD85c381a5be851d8DD717c",
  //   morphoVaultV1AdapterFactory: "0xF42D9c36b34c9c2CF3Bc30eD2a52a90eEB604642",
  //   registryList: "0x5C2531Cbd2cf112Cf687da3Cd536708aDd7DB10a",
  //   chainlinkOracleFactory: "0x2DC205F24BCb6B311E5cdf0745B0741648Aebd3d",
  //   preLiquidationFactory: "0x8cd16b62E170Ee0bA83D80e1F80E6085367e2aef",

  //   wNative: "0x4200000000000000000000000000000000000006",
  //   // Must implement USDC permit version 2 (otherwise breaks permit signatures).
  //   usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  //   verUsdc: "0x59aaF835D34b1E3dF2170e4872B785f11E2a964b",
  //   testUsdc: "0xBC77067f829979812d795d516E523C4033b66409",
  // },
  // [ChainId.PolygonMainnet]: {
  //   morpho: "0x1bF0c2541F820E775182832f06c0B7Fc27A25f67",
  //   bundler3: {
  //     bundler3: "0x2d9C3A9E67c966C711208cc78b34fB9E9f8db589",
  //     generalAdapter1: "0xB261B51938A9767406ef83bbFbaAFE16691b7047",
  //     paraswapAdapter: "0x5F2617F12D1fDd1e43e72Cb80C92dFcE8124Db8d",
  //     compoundV3MigrationAdapter: "0xB34D2f54139bA12defC315C0822aDf9A5eB9A9b7",
  //     aaveV2MigrationAdapter: "0x43980Ae597f12Ff64690506b2AEEFFb4D8BeAF2a",
  //     aaveV3CoreMigrationAdapter: "0xEcB1662a1dff5C20650CF98c3334d2fddcD50742",
  //   },
  //   permit2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
  //   adaptiveCurveIrm: "0xe675A2161D4a6E2de2eeD70ac98EEBf257FBF0B0",
  //   publicAllocator: "0xfac15aff53ADd2ff80C2962127C434E8615Df0d3",
  //   metaMorphoFactory: "0xa9c87daB340631C34BB738625C70499e29ddDC98",
  //   vaultV2Factory: "0xC11a53eE9B1eCc7a068D8e40F8F17926584F97Cf",
  //   morphoMarketV1AdapterFactory: "0xD1A0C86F28ecD1657Ad06415c2B230cC89D9b6dd",
  //   morphoVaultV1AdapterFactory: "0xEb174FEA51Da241eB3B516959B216e013de2888a",
  //   registryList: "0xb70a43821d2707fA9d0EDd9511CC499F468Ba564",
  //   chainlinkOracleFactory: "0x1ff7895Eb842794c5d07C4c547b6730e61295215",
  //   preLiquidationFactory: "0xeDadDe37D76c72b98725614d0b41C20Fe612d304",

  //   wNative: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
  //   // Must implement USDC permit version 2 (otherwise breaks permit signatures).
  //   usdc: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  // },
  // [ChainId.LineaMainnet]: {
  //   morpho: "0x6B0D716aC0A45536172308e08fC2C40387262c9F",
  //   bundler3: {
  //     bundler3: "0x1Ee8Ec299E8014760D50A4E3CfC3b44Cc2242625",
  //     generalAdapter1: "0x454dAb6ce9891245696b239b4845a1cDC268255d",
  //   },
  //   adaptiveCurveIrm: "0x85C2Ef4Bd69f42D7Da19Fb9dcdD7Fb8d0F59cDeE",
  //   publicAllocator: "0x2d4cf00e18D48fD030d9b1E2FAAE6e0384C7610B",
  //   metaMorphoFactory: "0xA148a8223B622A72dC36472DE1492aBb5c089BA7",
  //   vaultV2Factory: "0x5DC11CF8BA4C39d1194F91218D35008d9F52A5d0",
  //   morphoMarketV1AdapterFactory: "0x3267BbdC94274B4BE081c01ffc6123dA12E8c043",
  //   morphoVaultV1AdapterFactory: "0x6FaF26DD640e22457cA4fd5DA702BA3E169eEd87",
  //   registryList: "0x122Ea8ff8888C29F8736665d576e3fAEF15D27D5",
  //   chainlinkOracleFactory: "0x3FFF726062B03BfD5BC485eeEEcc92CF1d8F0105",
  //   preLiquidationFactory: "0x05a0Ff4E564ED1ba6B42247E19edFf83545C3C40",

  //   wNative: "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f",
  //   usdc: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
  // },
  [ChainId.Localhost]: {
    morpho: "0x6c247b1F6182318877311737BaC0844bAa518F5e",
    bundler3: {
      bundler3: "0x1FA4431bC113D308beE1d46B0e98Cb805FB48C13",
      generalAdapter1: "0x9954aFB60BB5A222714c478ac86990F221788B88",
    },
    permit2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
    adaptiveCurveIrm: "0x66F30587FB8D4206918deb78ecA7d5eBbafD06DA",
    publicAllocator: "0x769583Af5e9D03589F159EbEC31Cc2c23E8C355E",
    metaMorphoFactory: "0x878988f5f561081deEa117717052164ea1Ef0c82",
    vaultV2Factory: "0x6b46fa3cc9EBF8aB230aBAc664E37F2966Bf7971",
    registryList: "0xc00eb3c7aD1aE986A7f05F5A9d71aCa39c763C65",
    chainlinkOracleFactory: "0x98Ce5D183DC0c176f54D37162F87e7eD7f2E41b5",
    preLiquidationFactory: "0x635c31B5DF1F7EFbCbC07E302335Ef4230758e3d",
    // morphoMarketV1AdapterFactory: "0x96456Bf888D4de607Bf3ca0b3C8e4DF9b0d0Ad47",
    // morphoVaultV1AdapterFactory: "0xD8Fc8a85779551e78B516da9f74061cb3b086793",
  },
  // TODO: fill out
  [ChainId.RiseTestnet]: {
    morpho: "0x0",
    permit2: "0x0",
    bundler3: {
      bundler3: "0x0",
      generalAdapter1: "0x0",
    },
    adaptiveCurveIrm: "0x0",
    publicAllocator: "0x0",
    metaMorphoFactory: "0x0",
    chainlinkOracleFactory: "0x0",
    preLiquidationFactory: "0x0",
    wNative: "0x0",
    usdc: "0x0",
  },
  [ChainId.RiseMainnet]: {
    morpho: "0x0",
    bundler3: {
      bundler3: "0x0",
      generalAdapter1: "0x0",
    },
    adaptiveCurveIrm: "0x0",
    publicAllocator: "0x0",
    metaMorphoFactory: "0x0",
    chainlinkOracleFactory: "0x0",
    preLiquidationFactory: "0x0",

    wNative: "0x0",
  },
} as const;

export type ChainDeployments<Addresses = ChainAddresses> = {
  [key in keyof Addresses]: Address extends Addresses[key]
    ? bigint
    : ChainDeployments<Addresses[key]>;
};

const _deployments = {
  // [ChainId.EthMainnet]: {
  //   morpho: 18883124n,
  //   permit2: 15986406n,
  //   bundler3: {
  //     bundler3: 21643807n,
  //     generalAdapter1: 21872136n,
  //     paraswapAdapter: 21643807n,
  //     erc20WrapperAdapter: 21872136n,
  //     compoundV2MigrationAdapter: 21643807n,
  //     compoundV3MigrationAdapter: 21643807n,
  //     aaveV2MigrationAdapter: 21643807n,
  //     aaveV3CoreMigrationAdapter: 21643807n,
  //     aaveV3PrimeMigrationAdapter: 21643807n,
  //     aaveV3EtherFiMigrationAdapter: 21643807n,
  //     aaveV3OptimizerMigrationAdapter: 21643807n,
  //   },
  //   adaptiveCurveIrm: 18883124n,
  //   publicAllocator: 19375099n,
  //   metaMorphoFactory: 21439510n,
  //   vaultV2Factory: 23375073n,
  //   morphoMarketV1AdapterFactory: 23375073n,
  //   morphoVaultV1AdapterFactory: 23375073n,
  //   registryList: 23375119n,
  //   chainlinkOracleFactory: 19375066n,
  //   preLiquidationFactory: 21414664n,
  // },
  // [ChainId.BaseMainnet]: {
  //   morpho: 13977148n,
  //   permit2: 1425180n,
  //   bundler3: {
  //     bundler3: 25161671n,
  //     generalAdapter1: 26539234n,
  //     paraswapAdapter: 25161671n,
  //     erc20WrapperAdapter: 26539234n,
  //     compoundV3MigrationAdapter: 25161671n,
  //     aaveV3CoreMigrationAdapter: 25161671n,
  //   },
  //   adaptiveCurveIrm: 13977152n,
  //   publicAllocator: 13979545n,
  //   metaMorphoFactory: 23928808n,
  //   vaultV2Factory: 35615206n,
  //   morphoMarketV1AdapterFactory: 35615206n,
  //   morphoVaultV1AdapterFactory: 35615206n,
  //   registryList: 35615358n,
  //   chainlinkOracleFactory: 13978286n,
  //   preLiquidationFactory: 23779056n,
  // },
  // [ChainId.PolygonMainnet]: {
  //   morpho: 66931042n,
  //   bundler3: {
  //     bundler3: 68074185n,
  //     generalAdapter1: 68074185n,
  //     paraswapAdapter: 68074185n,
  //     compoundV3MigrationAdapter: 68690465n,
  //     aaveV2MigrationAdapter: 68690465n,
  //     aaveV3CoreMigrationAdapter: 68690465n,
  //   },
  //   permit2: 35701901n,
  //   adaptiveCurveIrm: 66931042n,
  //   publicAllocator: 66931042n,
  //   metaMorphoFactory: 66931042n,
  //   vaultV2Factory: 77371907n,
  //   morphoMarketV1AdapterFactory: 77371907n,
  //   morphoVaultV1AdapterFactory: 77371907n,
  //   registryList: 77372020n,
  //   chainlinkOracleFactory: 66931042n,
  //   preLiquidationFactory: 68074185n,
  // },
  [ChainId.Localhost]: {
    morpho: 0n,
    bundler3: {
      bundler3: 0n,
      generalAdapter1: 0n,
    },
    adaptiveCurveIrm: 0n,
    publicAllocator: 0n,
    metaMorphoFactory: 0n,
    vaultV2Factory: 0n,
    morphoMarketV1AdapterFactory: 0n,
    morphoVaultV1AdapterFactory: 0n,
    registryList: 0n,
    chainlinkOracleFactory: 0n,
    preLiquidationFactory: 0n,
  },
  [ChainId.RiseTestnet]: {
    morpho: 0n,
    bundler3: {
      bundler3: 0n,
      generalAdapter1: 0n,
    },
    adaptiveCurveIrm: 0n,
    publicAllocator: 0n,
    metaMorphoFactory: 0n,
    vaultV2Factory: 0n,
    morphoMarketV1AdapterFactory: 0n,
    morphoVaultV1AdapterFactory: 0n,
    registryList: 0n,
    chainlinkOracleFactory: 0n,
    preLiquidationFactory: 0n,
  },
  [ChainId.RiseMainnet]: {
    morpho: 0n,
    bundler3: {
      bundler3: 0n,
      generalAdapter1: 0n,
    },
    adaptiveCurveIrm: 0n,
    publicAllocator: 0n,
    metaMorphoFactory: 0n,
    vaultV2Factory: 0n,
    morphoMarketV1AdapterFactory: 0n,
    morphoVaultV1AdapterFactory: 0n,
    registryList: 0n,
    chainlinkOracleFactory: 0n,
    preLiquidationFactory: 0n,
  },
} as const satisfies Record<ChainId, ChainDeployments>;

export type AddressLabel = DottedKeys<(typeof _addressesRegistry)[ChainId]>;

export const getChainAddresses = (chainId: number): ChainAddresses => {
  const chainAddresses = addresses[chainId];
  if (chainAddresses == null) throw new UnsupportedChainIdError(chainId);

  return chainAddresses;
};

/**
 * Assumptions:
 * - unwrapped token has same number of decimals than wrapped tokens.
 */
const _unwrappedTokensMapping: Record<number, Record<Address, Address>> = {
  // [ChainId.EthMainnet]: {
  //   [_addressesRegistry[ChainId.EthMainnet].wbIB01]:
  //     _addressesRegistry[ChainId.EthMainnet].bIB01,
  //   [_addressesRegistry[ChainId.EthMainnet].wbC3M]:
  //     _addressesRegistry[ChainId.EthMainnet].bC3M,
  //   [_addressesRegistry[ChainId.EthMainnet].wNative]: NATIVE_ADDRESS,
  //   [_addressesRegistry[ChainId.EthMainnet].stEth]: NATIVE_ADDRESS,
  //   [_addressesRegistry[ChainId.EthMainnet].wstEth]:
  //     _addressesRegistry[ChainId.EthMainnet].stEth,
  //   [_addressesRegistry[ChainId.EthMainnet]["stkcvxcrvUSDTWBTCWETH-morpho"]]:
  //     _addressesRegistry[ChainId.EthMainnet].crvUSDTWBTCWETH,
  //   [_addressesRegistry[ChainId.EthMainnet]["stkcvxcrvUSDCWBTCWETH-morpho"]]:
  //     _addressesRegistry[ChainId.EthMainnet].crvUSDCWBTCWETH,
  //   [_addressesRegistry[ChainId.EthMainnet][
  //     "stkcvxcrvCRVUSDTBTCWSTETH-morpho"
  //   ]]: _addressesRegistry[ChainId.EthMainnet].crvCRVUSDTBTCWSTETH,
  //   [_addressesRegistry[ChainId.EthMainnet]["stkcvxTryLSD-morpho"]]:
  //     _addressesRegistry[ChainId.EthMainnet].tryLSD,
  //   [_addressesRegistry[ChainId.EthMainnet]["stkcvxcrvUSDETHCRV-morpho"]]:
  //     _addressesRegistry[ChainId.EthMainnet].crvUSDETHCRV,
  //   [_addressesRegistry[ChainId.EthMainnet]["stkcvx2BTC-f-morpho"]]:
  //     _addressesRegistry[ChainId.EthMainnet]["2BTC-f"],
  // },
  // [ChainId.BaseMainnet]: {
  //   [_addressesRegistry[ChainId.BaseMainnet].wNative]: NATIVE_ADDRESS,
  //   [_addressesRegistry[ChainId.BaseMainnet].verUsdc]:
  //     _addressesRegistry[ChainId.BaseMainnet].usdc,
  //   [_addressesRegistry[ChainId.BaseMainnet].testUsdc]:
  //     _addressesRegistry[ChainId.BaseMainnet].usdc,
  // },
  // [ChainId.PolygonMainnet]: {
  //   [_addressesRegistry[ChainId.PolygonMainnet].wNative]: NATIVE_ADDRESS,
  // },
  // [ChainId.Localhost]: {
  //   [_addressesRegistry[ChainId.Localhost].wNative]: NATIVE_ADDRESS,
  // },
  // [ChainId.RiseTestnet]: {
  //   [_addressesRegistry[ChainId.RiseTestnet].wNative]: NATIVE_ADDRESS,
  // },
  // [ChainId.RiseMainnet]: {
  //   [_addressesRegistry[ChainId.RiseMainnet].wNative]: NATIVE_ADDRESS,
  // },
};

export function getUnwrappedToken(wrappedToken: Address, chainId: number) {
  return unwrappedTokensMapping[chainId]?.[wrappedToken];
}

/**
 * The registry of all known ERC20Wrapper tokens.
 */
export const erc20WrapperTokens: Record<number, Set<Address>> = {};

/**
 * The registry of all known PermissionedERC20Wrapper with a `hasPermission` getter.
 * All permissioned wrapper tokens are considered ERC20Wrapper and automatically added to the erc20WrapperTokens registry.
 */
export const permissionedWrapperTokens: Record<number, Set<Address>> = {
  // [ChainId.BaseMainnet]: new Set([
  //   _addressesRegistry[ChainId.BaseMainnet].testUsdc,
  // ]),
};

/**
 * The registry of all known permissioned wrapped Backed tokens.
 * All permissioned Backed tokens are considered ERC20Wrapper and automatically added to the erc20WrapperTokens registry.
 */
export const permissionedBackedTokens: Record<number, Set<Address>> = {
  // [ChainId.EthMainnet]: new Set([
  //   _addressesRegistry[ChainId.EthMainnet].wbIB01,
  //   _addressesRegistry[ChainId.EthMainnet].wbC3M,
  // ]),
};

/**
 * The registry of all known permissioned wrapped tokens that require a Coinbase attestation.
 * All permissioned Coinbase tokens are considered PermissionedERC20Wrapper and automatically added to the permissionedWrapperTokens registry.
 */
export const permissionedCoinbaseTokens: Record<number, Set<Address>> = {
  // [ChainId.BaseMainnet]: new Set([
  //   _addressesRegistry[ChainId.BaseMainnet].verUsdc,
  // ]),
};

export const getPermissionedCoinbaseTokens = (chainId: number) =>
  permissionedCoinbaseTokens[chainId] ?? new Set();

entries(permissionedBackedTokens).forEach(([chainId, tokens]) => {
  tokens.forEach((token) =>
    (erc20WrapperTokens[chainId] ??= new Set()).add(token),
  );
});

entries(permissionedCoinbaseTokens).forEach(([chainId, tokens]) => {
  tokens.forEach((token) =>
    (permissionedWrapperTokens[chainId] ??= new Set()).add(token),
  );
});

entries(permissionedWrapperTokens).forEach(([chainId, tokens]) => {
  tokens.forEach((token) =>
    (erc20WrapperTokens[chainId] ??= new Set()).add(token),
  );
});

/** /!\  These tokens can not be listed in `erc20WrapperTokens` because the following specs are different:
 * - calling `depositFor` supplies on blue instead of minting wrapped token to the user
 */
export const convexWrapperTokens: Record<number, Set<Address>> = {
  // [ChainId.EthMainnet]: new Set([
  //   _addressesRegistry[ChainId.EthMainnet]["stkcvxcrvUSDTWBTCWETH-morpho"],
  //   _addressesRegistry[ChainId.EthMainnet]["stkcvxcrvUSDCWBTCWETH-morpho"],
  //   _addressesRegistry[ChainId.EthMainnet]["stkcvxcrvCRVUSDTBTCWSTETH-morpho"],
  //   _addressesRegistry[ChainId.EthMainnet]["stkcvxTryLSD-morpho"],
  //   _addressesRegistry[ChainId.EthMainnet]["stkcvxcrvUSDETHCRV-morpho"],
  //   _addressesRegistry[ChainId.EthMainnet]["stkcvx2BTC-f-morpho"],
  // ]),
};

export let addressesRegistry = deepFreeze(_addressesRegistry);
export let addresses = addressesRegistry as Record<number, ChainAddresses>;
export let deployments = deepFreeze(_deployments);
export let unwrappedTokensMapping = deepFreeze(_unwrappedTokensMapping);

/**
 * Registers custom addresses and unwrapped token mappings to extend
 * the default address registry (on ewisting or unknown chains).
 *
 * @param options - Optional configuration object
 * @param options.unwrappedTokens - A mapping of chain IDs to token address maps,
 *                                  where each entry maps wrapped tokens to their unwrapped equivalents.
 * @param options.addresses - Custom address entries to merge into the default registry.
 *                            Can be a subset of `ChainAddresses` if chain is already known.
 *                            Must provide all required addresses if chain is unknown.
 * @param options.deployments - Custom deployment entries to merge into the default registry.
 *                              Can be a subset of `ChainDeployments` if chain is already known.
 *                              Must provide all required deployments if chain is unknown.
 *
 * @throws {Error} If attempting to override an existing address.
 *
 * @example
 * ```ts
 * registerCustomAddresses({
 *   addresses: {
 *     1: { contract: "0xabc..." }
 *   },
 *   unwrappedTokens: {
 *     1: { "0xWrapped": "0xUnwrapped" }
 *   }
 * });
 * ```
 */
export function registerCustomAddresses({
  unwrappedTokens,
  addresses: customAddresses,
  deployments: customDeployments,
}: {
  unwrappedTokens?: Record<number, Record<Address, Address>>;
  addresses?:
    | DeepPartial<Record<keyof typeof _addressesRegistry, ChainAddresses>>
    | Record<number, ChainAddresses>;
  deployments?:
    | DeepPartial<Record<keyof typeof _deployments, ChainDeployments>>
    | Record<number, ChainDeployments>;
} = {}) {
  const customizer =
    (type: string) =>
    // biome-ignore lint/suspicious/noExplicitAny: type is not trivial and not important here
    (objValue: any, srcValue: any, key: string) => {
      if (
        objValue !== undefined &&
        !isPlainObject(objValue) &&
        objValue !== srcValue
      )
        throw new Error(`Cannot override existing ${type}: ${key}`);
    };

  if (customAddresses)
    addresses = addressesRegistry = deepFreeze(
      mergeWith({}, addressesRegistry, customAddresses, customizer("address")),
    );

  if (customDeployments)
    deployments = deepFreeze(
      mergeWith({}, deployments, customDeployments, customizer("deployment")),
    );

  if (unwrappedTokens)
    unwrappedTokensMapping = deepFreeze(
      mergeWith(
        {},
        unwrappedTokensMapping,
        unwrappedTokens,
        customizer("unwrapped token"),
      ),
    );
}
