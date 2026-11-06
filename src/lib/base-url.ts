const url = process.env.NEXT_PUBLIC_API_URL ?? "";

const BASE_URL = {
  DEPARTMENTS: `${url}/departments`,
};

export default BASE_URL;
