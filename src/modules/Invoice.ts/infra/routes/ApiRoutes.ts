export const InvoiceApiRoute = {
  findAll: () => "/invoice/list",
  createOne: () => "/invoice",
  download: (id: string) => `/invoice/${id}/document`,
  delete: (id: string) => `/invoice/${id}`,
};
