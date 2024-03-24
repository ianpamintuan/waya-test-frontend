import { API_KEY, API_URL } from "./constants";

export const fetchRequest = async (url: string, options?: RequestInit) => {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      Authorization: API_KEY as string,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();

  return data;
};

export const formatDate = (str: string) =>
  new Date(str).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
