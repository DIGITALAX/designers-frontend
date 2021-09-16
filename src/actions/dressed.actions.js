import { utils as ethersUtils } from 'ethers';
import { getMonaTokenContract } from "@services/contract.service";
import { getMonaContractAddressByChainId } from "@services/network.service";
import { convertToWei } from '@helpers/price.helpers';

const address = '0x3Cc6Bc27c36d23Ed95289BAF5b0bcB8538D1467c';

class DressedActions {
  async sendMona(wallet, chainId, value) {
    const monaContractAddress = getMonaContractAddressByChainId(chainId);
    const contract = await getMonaTokenContract(monaContractAddress);
    try {
      const allowance = await contract.methods.allowance(wallet, address).call({from: wallet});
      const jsAllowedValue = parseFloat(ethersUtils.formatEther(allowance));
      if (jsAllowedValue < 10000000000) {
        await contract.methods.approve(address, convertToWei(20000000000))
          .send({from: wallet});
      }
      const res = await contract.methods
        .transfer(address, convertToWei(value))
        .send({from: wallet});
    } catch (e){
      console.log({e});
      throw e;
    }
  }
};

export default new DressedActions();
