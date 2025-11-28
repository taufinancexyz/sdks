import { VaultMarketPublicAllocatorConfig } from "@taufinancexyz/blue-sdk";
import { fetchVaultMarketPublicAllocatorConfig } from "../fetch";

declare module "@taufinancexyz/blue-sdk" {
  namespace VaultMarketPublicAllocatorConfig {
    let fetch: typeof fetchVaultMarketPublicAllocatorConfig;
  }
}

VaultMarketPublicAllocatorConfig.fetch = fetchVaultMarketPublicAllocatorConfig;

export { VaultMarketPublicAllocatorConfig };
