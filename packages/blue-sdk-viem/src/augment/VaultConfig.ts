import { VaultConfig } from "@taufinancexyz/blue-sdk";
import { fetchVaultConfig } from "../fetch";

declare module "@taufinancexyz/blue-sdk" {
  namespace VaultConfig {
    let fetch: typeof fetchVaultConfig;
  }
}

VaultConfig.fetch = fetchVaultConfig;

export { VaultConfig };
