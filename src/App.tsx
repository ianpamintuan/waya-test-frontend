import { useEffect, useState } from "react";
import { Invoice, InvoiceResponseData } from "./types";
import { fetchRequest, formatDate } from "./util";
import Spinner from "./components/Spinner/Spinner";
import { ViewModal } from "./components/ViewModal";
import { EditModal } from "./components/EditModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [invoicesList, setInvoicesList] = useState<InvoiceResponseData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const fetchInvoices = async (page?: number) => {
    setIsLoading(true);
    const invoiceRequest = await fetchRequest(
      `invoices${page ? `?page=${page}` : ""}`
    );

    if (invoiceRequest?.data) {
      setInvoicesList(invoiceRequest);
    }

    setIsLoading(false);
  };

  const onUpdateSuccess = () => {
    setOpenEditModal(false);
    toast("Invoice is successfully updated!", { type: "success" });
    fetchInvoices();
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <>
      <header>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Invoice list
              </h1>
            </div>
          </div>
        </div>
      </header>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mx-auto max-w-screen-xl px-4 pb-8 sm:pb-6 sm:pb-12 lg:px-8">
          <div className="rounded-lg border border-gray-200">
            <div className="overflow-x-auto rounded-t-lg">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap p-2 font-medium text-gray-900 text-left">
                      Invoice #
                    </th>
                    <th className="whitespace-nowrap p-2 font-medium text-gray-900 text-left">
                      Invoice Date
                    </th>
                    <th className="whitespace-nowrap p-2 font-medium text-gray-900 text-left">
                      Due Date
                    </th>
                    <th className="whitespace-nowrap p-2 font-medium text-gray-900 text-left">
                      Customer Name
                    </th>
                    <th className="whitespace-nowrap p-2 font-medium text-gray-900 text-left">
                      Customer Address
                    </th>
                    <th className="whitespace-nowrap p-2 py-2 font-medium text-gray-900 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {invoicesList?.data?.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="whitespace-nowrap p-2 font-medium text-gray-900">
                        {invoice.id}
                      </td>
                      <td className="whitespace-nowrap p-2 text-gray-700">
                        {formatDate(invoice.invoice_date)}
                      </td>
                      <td className="whitespace-nowrap p-2 text-gray-700">
                        {formatDate(invoice.due_date)}
                      </td>
                      <td className="whitespace-nowrap p-2 text-gray-700">
                        {invoice.customer_name}
                      </td>
                      <td className="whitespace-nowrap p-2 text-gray-700">
                        {invoice.customer_address}, {invoice.customer_city},{" "}
                        {invoice.customer_country}
                      </td>
                      <td className="whitespace-nowrap p-2 text-gray-700">
                        <button
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setOpenViewModal(true);
                          }}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setOpenEditModal(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {invoicesList?.pagination && (
              <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                <ol className="flex justify-end gap-1 text-xs font-medium">
                  {[...Array(invoicesList.pagination.pages).keys()].map(
                    (index) => {
                      const page = index + 1;
                      return (
                        <li
                          key={index}
                          {...(invoicesList.pagination.currentPage === page && {
                            className:
                              "block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white",
                          })}
                        >
                          {invoicesList.pagination.currentPage !== page ? (
                            <a
                              href="#"
                              className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                              onClick={(e) => {
                                e.preventDefault();
                                fetchInvoices(page);
                              }}
                            >
                              {page}
                            </a>
                          ) : (
                            page
                          )}
                        </li>
                      );
                    }
                  )}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedInvoice && openViewModal && (
        <ViewModal
          selectedId={selectedInvoice.id}
          open={openViewModal}
          onClose={() => setOpenViewModal(false)}
        />
      )}

      {selectedInvoice && openEditModal && (
        <EditModal
          data={selectedInvoice}
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          onSuccess={onUpdateSuccess}
        />
      )}

      <ToastContainer />
    </>
  );
}

export default App;
