import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Modal, ModalProps } from "../Modal";
import { Invoice } from "../../types";
import { CountryDropdown } from "../CountryDropdown";
import { InputWrapper } from "../InputWrapper";
import { fetchRequest } from "../../util";

interface Props extends ModalProps {
  data: Invoice;
}

interface FormInputs {
  customerName: string;
  customerAddress: string;
  customerZip: string;
  customerCity: string;
  customerCountry: string;
  deliveryName: string;
  deliveryAddress: string;
  deliveryZip: string;
  deliveryCity: string;
  deliveryCountry: string;
  dueDate: string;
}

export const EditModal: React.FC<Props> = ({ data, ...props }) => {
  const formInstance = useForm<FormInputs>({
    defaultValues: {
      customerName: data?.customer_name,
      dueDate: data?.due_date,
      customerAddress: data?.customer_address,
      customerCity: data?.customer_city,
      customerZip: data?.customer_zip,
      customerCountry: data?.customer_country,
      deliveryName: data?.delivery_name,
      deliveryAddress: data?.delivery_address,
      deliveryCity: data?.delivery_city,
      deliveryZip: data?.delivery_zip,
      deliveryCountry: data?.delivery_country,
    },
  });
  const {
    register,
    handleSubmit,
  } = formInstance;

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const request = await fetchRequest(`invoices/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: formData.customerName,
        due_date: formData.dueDate,
        customer_address: formData.customerAddress,
        customer_city: formData.customerCity,
        customer_country: formData.customerCountry,
        customer_zip: formData.customerZip,
        delivery_name: formData.deliveryName,
        delivery_address: formData.deliveryAddress,
        delivery_city: formData.deliveryCity,
        delivery_country: formData.deliveryCountry,
        delivery_zip: formData.deliveryZip,
      }),
    });

    if (request) {
      // Success here
    }
  };

  return (
    <Modal {...props}>
      {
        <div>
          <div className="mx-auto my-4">
            <h3 className="text-lg font-black text-gray-800 mb-4">
              Invoice #{data.id}
            </h3>
            <FormProvider {...formInstance}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4 grid grid-cols-6 gap-3"
                noValidate
              >
                <InputWrapper
                  className="col-span-6 sm:col-span-3"
                  label="Customer Name"
                  name="customerName"
                >
                  <input
                    id="customerName"
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    {...register("customerName", { required: true })}
                  />
                </InputWrapper>

                <InputWrapper
                  className="col-span-6 sm:col-span-3"
                  label="Due Date"
                  name="dueDate"
                >
                  <input
                    id="dueDate"
                    type="date"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    {...register("dueDate", { required: true })}
                    min={new Date().toISOString().split("T")[0]} // Disable past dates
                  />
                </InputWrapper>

                <InputWrapper
                  className="col-span-6 sm:col-span-3"
                  label="Customer Address"
                  name="customerAddress"
                >
                  <input
                    id="customerAddress"
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    {...register("customerAddress", { required: true })}
                  />
                </InputWrapper>

                <InputWrapper
                  className="col-span-6 sm:col-span-3"
                  label="Customer City"
                  name="customerCity"
                >
                  <input
                    id="customerCity"
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    {...register("customerCity", { required: true })}
                  />
                </InputWrapper>

                <InputWrapper
                  className="col-span-6 sm:col-span-3"
                  label="Customer Country"
                  name="customerCountry"
                >
                  <CountryDropdown name="customerCountry" />
                </InputWrapper>

                <InputWrapper
                  className="col-span-6 sm:col-span-3"
                  label="Customer Zip"
                  name="customerZip"
                >
                  <input
                    id="customerZip"
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    {...register("customerZip", {
                      required: true,
                      pattern: /^\d+(-\d+)?$/,
                    })}
                  />
                </InputWrapper>

                <InputWrapper
                  className="col-span-6 sm:col-span-3"
                  label="Delivery Name"
                  name="deliveryName"
                >
                  <input
                    id="deliveryName"
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    {...register("deliveryName", { required: true })}
                  />
                </InputWrapper>

                <div className="col-span-6 sm:col-span-3" />

                <InputWrapper
                  className="col-span-6 sm:col-span-3"
                  label="Delivery Address"
                  name="deliveryAddress"
                >
                  <input
                    id="deliveryAddress"
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    {...register("deliveryAddress", { required: true })}
                  />
                </InputWrapper>

                <InputWrapper
                  className="col-span-6 sm:col-span-3"
                  label="Delivery City"
                  name="deliveryCity"
                >
                  <input
                    id="deliveryCity"
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    {...register("deliveryCity", { required: true })}
                  />
                </InputWrapper>

                <InputWrapper
                  className="col-span-6 sm:col-span-3"
                  label="Delivery Country"
                  name="deliveryCountry"
                >
                  <CountryDropdown name="deliveryCountry" />
                </InputWrapper>

                <InputWrapper
                  className="col-span-6 sm:col-span-3"
                  label="Delivery Zip"
                  name="deliveryZip"
                >
                  <input
                    id="deliveryZip"
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    {...register("deliveryZip", {
                      required: true,
                      pattern: /^\d+(-\d+)?$/,
                    })}
                  />
                </InputWrapper>

                <input type="submit" />
              </form>
            </FormProvider>
          </div>
        </div>
      }
    </Modal>
  );
};

export default EditModal;
