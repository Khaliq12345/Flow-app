export interface PaymentPayload {
  amount: number;
  description: string;
  currency?: string;
  phone_country?: string;
  callback_url?: string;
}

export interface PaymentResult {
  paymentUrl: string;
  transactionId: number;
  token: string;
}

export interface UserFolder {
  id: string;
  email: string;
  fedapay_id?: string;
}

export interface CreateCustomerPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  phone_country: string;
}

export interface CreateTransactionPayload {
  description: string;
  amount: number;
  currency?: string;
  callback_url: string;
}

export interface FedapayCustomer {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: {
    number: string;
    country: string;
  };
}
