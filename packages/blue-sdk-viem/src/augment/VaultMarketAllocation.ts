import { VaultMarketAllocation } from "@taufinancexyz/blue-sdk";

import { fetchVaultMarketAllocation } from "../fetch";

declare module "@taufinancexyz/blue-sdk" {
  namespace VaultMarketAllocation {
    let fetch: typeof fetchVaultMarketAllocation;
  }
}

VaultMarketAllocation.fetch = fetchVaultMarketAllocation;

export { VaultMarketAllocation };
