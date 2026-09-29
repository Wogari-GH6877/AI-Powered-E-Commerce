
import api from "./Axios";

export const paymentServices = {
    createPayment: (address) =>
        api.post("/api/payment/create", { address }),

    verifyPayment: (txRef) =>
        api.get(`/api/payment/verify/${encodeURIComponent(txRef)}`),
};



// import api from "./Axios";

// export const paymentServices = {
//   // createPayment: (address) => api.post("/api/payment/create", { address }),
//     createPayment: (address) => api.post("/api/payment/chapa", { address }),


//   verifyPayment: (txRef) => api.get(`/api/payment/verify/${encodeURIComponent(txRef)}`),
// };
