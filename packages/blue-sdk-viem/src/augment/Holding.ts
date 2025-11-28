import { Holding } from "@taufinancexyz/blue-sdk";
import { fetchHolding } from "../fetch";

declare module "@taufinancexyz/blue-sdk" {
  namespace Holding {
    let fetch: typeof fetchHolding;
  }
}

Holding.fetch = fetchHolding;

export { Holding };
