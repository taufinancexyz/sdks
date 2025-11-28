import { AccrualVault, Vault } from "@taufinancexyz/blue-sdk";

import { fetchAccrualVault, fetchVault } from "../fetch";

declare module "@taufinancexyz/blue-sdk" {
  namespace Vault {
    let fetch: typeof fetchVault;
  }

  namespace AccrualVault {
    let fetch: typeof fetchAccrualVault;
  }
}

Vault.fetch = fetchVault;
AccrualVault.fetch = fetchAccrualVault;

export { Vault, AccrualVault };
