import { VaultUser } from "@taufinancexyz/blue-sdk";

import { fetchVaultUser } from "../fetch";

declare module "@taufinancexyz/blue-sdk" {
  namespace VaultUser {
    let fetch: typeof fetchVaultUser;
  }
}

VaultUser.fetch = fetchVaultUser;
