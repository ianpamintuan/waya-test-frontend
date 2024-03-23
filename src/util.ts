import { API_KEY, API_URL } from "./constants";

export const fetchRequest = async (url: string) => {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      Authorization: API_KEY as string,
    },
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();

  return data;
};
