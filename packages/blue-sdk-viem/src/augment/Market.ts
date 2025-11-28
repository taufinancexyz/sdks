import { Market } from "@taufinancexyz/blue-sdk";
import { fetchMarket } from "../fetch";

declare module "@taufinancexyz/blue-sdk" {
  namespace Market {
    let fetch: typeof fetchMarket;
  }
}

Market.fetch = fetchMarket;

export { Market };
