import api from "./Axios";

export const orderServices = {
  getUserOrders: (token) => api.get("/api/order/userorders"
    
  ),
};