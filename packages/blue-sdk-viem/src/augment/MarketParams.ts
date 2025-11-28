import { MarketParams } from "@taufinancexyz/blue-sdk";
import { fetchMarketParams } from "../fetch";

declare module "@taufinancexyz/blue-sdk" {
  namespace MarketParams {
    let fetch: typeof fetchMarketParams;
  }
}

MarketParams.fetch = fetchMarketParams;

export { MarketParams };
