import { User } from "@taufinancexyz/blue-sdk";
import { fetchUser } from "../fetch";

declare module "@taufinancexyz/blue-sdk" {
  namespace User {
    let fetch: typeof fetchUser;
  }
}

User.fetch = fetchUser;

export { User };
