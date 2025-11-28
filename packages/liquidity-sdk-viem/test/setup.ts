import { createViemTest } from "@taufinancexyz/test/vitest";
import { mainnet } from "viem/chains";

export const test = createViemTest(mainnet, {
  forkUrl: process.env.MAINNET_RPC_URL,
  forkBlockNumber: 21_365_000,
});
