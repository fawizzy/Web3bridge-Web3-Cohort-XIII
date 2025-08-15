import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TimeNFTModule", (m) => {
  const TimeNFT = m.contract("TimeNFT");


  return { TimeNFT };
});
