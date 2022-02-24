export const getChainId = (state) => state.global.get('chainId');
export const getIsInitialized = (state) => state.global.get('isInitialized');
export const getExchangeRateETH = (state) => state.global.get('exchangeRateETH');
export const getMinBidIncrement = (state) => state.global.get('minBidIncrement');
export const getBidWithdrawalLockTime = (state) => state.global.get('bidWithdrawalLockTime');
export const getMonaPerEth = (state) => state.global.get('monaPerEth');
export const getAllUsers = (state) => state.global.get('allUsers');