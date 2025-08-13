export const apiUrl = import.meta.env.VITE_API_BASE_URL;
export const token = import.meta.env.VITE_API_TOKEN;

export const getData = async (path: string) => {
  const response = await fetch(`${apiUrl}/${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();
  return data;
};

export const getSingleData = async (path: string, id: string) => {
  const response = await fetch(`${apiUrl}/${path}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();
  return data;
};
