import React from "react";
import countries from "i18n-iso-countries";
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import { useFormContext } from "react-hook-form";

countries.registerLocale(enLocale);

export interface CountryDropdownProps {
  name: string;
}

export const CountryDropdown: React.FC<CountryDropdownProps> = ({ name }) => {
  const { register } = useFormContext();

  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  return (
    <select
      id={name}
      {...register(name, { required: true })}
      className="mt-1 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
    >
      {!!countryArr?.length &&
        countryArr.map(({ label, value }) => (
          <option key={value} value={label}>
            {label}
          </option>
        ))}
    </select>
  );
};

export default CountryDropdown;
