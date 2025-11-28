import { VaultMarketConfig } from "@taufinancexyz/blue-sdk";

import { fetchVaultMarketConfig } from "../fetch";

declare module "@taufinancexyz/blue-sdk" {
  namespace VaultMarketConfig {
    let fetch: typeof fetchVaultMarketConfig;
  }
}

VaultMarketConfig.fetch = fetchVaultMarketConfig;

export { VaultMarketConfig };
