export interface PaymentPayload {
  amount: number;
  description: string;
  currency?: string;
  callback_url: string;
  generationId?: string;
  templateId?: string;
}

export interface PaymentResult {
  paymentUrl: string;
  transactionId: number;
  token: string;
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
  custom_metadata?: {
    generationId?: string;
    templateId?: string;
    userId?: string;
  };
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

export interface FedapayTransaction {
  id: number;
  status: string;
  amount: number;
  description: string;
  currency: {
    iso: string;
  };
  custom_metadata?: {
    generationId?: string;
    templateId?: string;
    userId?: string;
  };
  [key: string]: any;
}
