import { Token } from "@taufinancexyz/blue-sdk";
import { fetchToken } from "../fetch";

declare module "@taufinancexyz/blue-sdk" {
  namespace Token {
    let fetch: typeof fetchToken;
  }
}

Token.fetch = fetchToken;

export { Token };
