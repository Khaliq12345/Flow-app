import { FedaPay } from "fedapay";

export const useFedapay = () => {
  const config = useRuntimeConfig();
  FedaPay.setApiKey(config.fedapayToken);
  FedaPay.setEnvironment(config.fedapayMode);
  return FedaPay;
};
