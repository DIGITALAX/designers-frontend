import React, { memo } from "react";
import { useSelector } from "react-redux";
import ModalConnectWallet from "@containers/modals/modal-connect-wallet";
import ModalConnectArkane from "@containers/modals/modal-connect-arkane";
import ModalPlaceBid from "@containers/modals/modal-place-bid";
import ModalRaiseBid from "@containers/modals/modal-raise-bid";
import ModalWithdrawBid from "@containers/modals/modal-withdraw-bid";
import ModalSignup from "@containers/modals/modal-sign-up";
import ModalSuccess from "@containers/modals/modal-gen-success";
import BuyNow from "@containers/modals/buy-now";
import PreviewMaterial from "@containers/modals/preview-material";
import ModalConnectMatic from "./modal-connect-matic";

const Modals = () => {
  const modals = useSelector((state) => state.modals.toJS());
  const {
    isShowModalConnectMetamask,
    isShowModalConnectArkane,
    isShowModalPlaceBid,
    isShowModalRaiseBid,
    isShowModalWithdrawBid,
    isShowModalSignup,
    isShowModalSuccess,
    isShowBuyNow,
    isShowPreviewMaterial,
    isShowModalConnectMatic
  } = modals;

  return (
    <>
      {isShowModalConnectMetamask && <ModalConnectWallet />}
      {isShowModalPlaceBid && <ModalPlaceBid />}
      {isShowModalRaiseBid && <ModalRaiseBid />}
      {isShowModalWithdrawBid && <ModalWithdrawBid />}
      {isShowModalSignup && <ModalSignup />}
      {isShowModalSuccess && <ModalSuccess />}
      {isShowBuyNow && <BuyNow />}
      {isShowPreviewMaterial && <PreviewMaterial />}
      {isShowModalConnectMatic && <ModalConnectMatic />}
      {isShowModalConnectArkane && <ModalConnectArkane/>}
    </>
  );
};

export default memo(Modals);
