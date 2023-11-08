export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getPaginationLastId = (pagination: string) => {
  const pagination_last_id = pagination.split("&").find((item) => {
    return item.includes("pagination_last_id");
  });

  return pagination_last_id ? Number(pagination_last_id.split("=")[1]) : null;
};
