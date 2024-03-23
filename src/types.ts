export interface InvoiceItems {
  id: number;
  text: string;
  quantity: number;
  price: string;
}

export interface Invoice {
  id: number;
  ocr: number;
  created_at: string;
  due_date: string;
  customer_name: string;
  invoice_date: string;
  customer_address: string;
  customer_zip: string;
  customer_city: string;
  customer_country: string;
  delivery_name: string;
  delivery_address: string;
  delivery_zip: string;
  delivery_city: string;
  delivery_country: string;
  invoice_rows?: InvoiceItems[];
}

export interface InvoiceResponseData {
  data: Invoice[];
  pagination: {
    currentPage: number;
    pages: number;
    perPage: number;
  };
}
