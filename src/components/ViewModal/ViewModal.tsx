import React, { useEffect, useState } from "react";
import { Modal, ModalProps } from "../Modal";
import { fetchRequest, formatDate } from "../../util";
import { Invoice } from "../../types";
import Spinner from "../Spinner/Spinner";

interface Props extends ModalProps {
  selectedId: number;
}

export const ViewModal: React.FC<Props> = ({ selectedId, ...props }) => {
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInvoiceData = async (id: number) => {
    setIsLoading(true);

    const request = await fetchRequest(`invoices/${id}`);

    if (request?.data) {
      setInvoiceData(request.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedId) {
      fetchInvoiceData(selectedId);
    }
  }, [selectedId]);

  return (
    <Modal {...props}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className="mx-auto my-4">
            <h3 className="text-lg font-black text-gray-800 mb-8">
              Invoice #{selectedId}
            </h3>
            <div className="flow-root">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">OCR</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {invoiceData?.ocr}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Invoice Date</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {invoiceData?.invoice_date &&
                      formatDate(invoiceData.invoice_date)}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Due Date</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {invoiceData?.due_date && formatDate(invoiceData.due_date)}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Customer Name</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {invoiceData?.customer_name}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">
                    Customer Address
                  </dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {invoiceData?.customer_address},{" "}
                    {invoiceData?.customer_city},{" "}
                    {invoiceData?.customer_country}{" "}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Delivery Name</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {invoiceData?.delivery_name}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">
                    Delivery Address
                  </dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {invoiceData?.delivery_address},{" "}
                    {invoiceData?.delivery_city},{" "}
                    {invoiceData?.delivery_country}{" "}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Invoice Items</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    <ul>
                      {invoiceData?.invoice_rows?.map((item) => (
                        <li key={item.id}>
                          {item.quantity}x {item.text} - ${item.price}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ViewModal;
