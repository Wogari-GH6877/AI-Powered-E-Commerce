
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { paymentServices } from "../Services/paymentServices";

export default function PaymentCallback() {
    const [searchParams] = useSearchParams();
    const { token } = useContext(AuthContext);
    const { setCartItems } = useContext(CartContext);

    const [message, setMessage] = useState("Confirming your payment...");
    const [order, setOrder] = useState(null);

    const txRef =
        searchParams.get("tx_ref") ||
        searchParams.get("trx_ref");

    useEffect(() => {
        let active = true;

        const verify = async () => {
            if (!token) {
                setMessage("Please log in to confirm your payment.");
                return;
            }

            if (!txRef) {
                setMessage("Payment could not be identified.");
                return;
            }

            try {
                console.log("Verifying payment:", txRef);

                const response =
                    await paymentServices.verifyPayment(txRef);

                if (!active) return;

                if (response.data.success && response.data.paid) {
                    setOrder(response.data.order);
                    setCartItems({});

                    localStorage.setItem(
                        "lastPaymentReceipt",
                        JSON.stringify(response.data.order)
                    );

                    setMessage(
                        "Payment successful. Your order is being processed."
                    );
                } else {
                    setMessage(
                        response.data.message ||
                        "Payment is still pending or failed."
                    );
                }
            } catch (error) {
                if (!active) return;

                console.error(
                    "Payment verification failed:",
                    error.response?.data || error.message
                );

                setMessage(
                    error.response?.data?.message ||
                    "Payment is still pending or failed."
                );
            }
        };

        verify();

        return () => {
            active = false;
        };
    }, [token, txRef, setCartItems]);

    return (
        <div className="min-h-[50vh] py-12 flex flex-col items-center gap-5 text-gray-700">

            <h1 className="text-xl font-medium text-center">
                {order ? "Payment receipt" : message}
            </h1>

            {order && (
                <div className="w-full max-w-2xl border border-gray-200 p-5 bg-white">

                    <div className="flex justify-between border-b pb-3 mb-3 text-sm">
                        <span>
                            Order #{order._id}
                        </span>

                        <span>
                            {new Date(
                                order.createdAt || Date.now()
                            ).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {(order.items || []).map((item, index) => (
                            <div
                                key={`${item.productId || item.name}-${index}`}
                                className="flex items-center gap-3"
                            >
                                {item.image &&
                                    item.image !== "product-image-unavailable" && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover"
                                        />
                                    )}

                                <div className="flex-1 text-sm">
                                    <p className="font-medium">
                                        {item.name}
                                    </p>

                                    <p>
                                        Size: {item.size} | Quantity:{" "}
                                        {item.quantity}
                                    </p>
                                </div>

                                <span>
                                    {order.currency}{" "}
                                    {item.price * item.quantity}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t mt-4 pt-4 flex justify-between font-medium">
                        <span>Total paid</span>

                        <span>
                            {order.currency} {order.amount}
                        </span>
                    </div>
                </div>
            )}

            {order && (
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="px-5 py-2 border rounded text-sm"
                    >
                        Print receipt
                    </button>

                    <Link
                        to="/order"
                        className="px-5 py-2 border rounded text-sm"
                    >
                        View my orders
                    </Link>
                </div>
            )}
        </div>
    );
}



// // import { useContext, useEffect, useState } from "react";
// // import { Link, useSearchParams } from "react-router-dom";
// // import { AuthContext } from "../Context/AuthContext";
// // import { CartContext } from "../Context/CartContext";
// // import { paymentServices } from "../Services/paymentServices";

// // export default function PaymentCallback() {
// //   const [searchParams] = useSearchParams();
// //   const { token } = useContext(AuthContext);
// //   const { setCartItems } = useContext(CartContext);
// //   const savedReceipt = localStorage.getItem("lastPaymentReceipt");
// //   const [message, setMessage] = useState("Confirming your payment...");
// //   const [order, setOrder] = useState(() => savedReceipt ? JSON.parse(savedReceipt) : null);
// //   const txRef = searchParams.get("tx_ref") || searchParams.get("trx_ref");

// //   useEffect(() => {
// //     let active = true;
// //     const verify = async () => {
// //       if (!token || !txRef) {
// //         setMessage("Payment could not be identified.");
// //         return;
// //       }
// //       try {
// //         const response = await paymentServices.verifyPayment(txRef);
// //         if (active && response.data.success && response.data.paid) {
// //           setCartItems({});
// //           setOrder(response.data.order);
// //           localStorage.setItem("lastPaymentReceipt", JSON.stringify(response.data.order));
// //           setMessage("Payment successful. Your order is being processed.");
// //         }
// //       } catch (error) {
// //         if (active) setMessage(error.response?.data?.message || "Payment is still pending or failed.");
// //       }
// //     };
// //     verify();
// //     return () => { active = false; };
// //   }, [token, txRef, setCartItems]);

// //   return <div className="min-h-[50vh] py-12 flex flex-col items-center gap-5 text-gray-700">
// //     <h1 className="text-xl font-medium text-center">{order ? "Payment receipt" : message}</h1>
// //     {order && <div className="w-full max-w-2xl border border-gray-200 p-5 bg-white">
// //       <div className="flex justify-between border-b pb-3 mb-3 text-sm">
// //         <span>Order #{order._id}</span>
// //         <span>{new Date(order.createdAt || Date.now()).toLocaleDateString()}</span>
// //       </div>
// //       <div className="space-y-3">
// //         {(order.items || []).map((item, index) => <div key={`${item.productId || item.name}-${index}`} className="flex items-center gap-3">
// //           {item.image && item.image !== "product-image-unavailable" && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />}
// //           <div className="flex-1 text-sm">
// //             <p className="font-medium">{item.name}</p>
// //             <p>Size: {item.size} | Quantity: {item.quantity}</p>
// //           </div>
// //           <span>{order.currency} {item.price * item.quantity}</span>
// //         </div>)}
// //       </div>
// //       <div className="border-t mt-4 pt-4 flex justify-between font-medium">
// //         <span>Total paid</span><span>{order.currency} {order.amount}</span>
// //       </div>
// //     </div>}
// //     {order && <div className="flex gap-3">
// //       <button type="button" onClick={() => window.print()} className="px-5 py-2 border rounded text-sm">Print receipt</button>
// //       <Link to="/order" className="px-5 py-2 border rounded text-sm">View my orders</Link>
// //     </div>}
// //   </div>;
// // }


// import React, { useEffect } from "react";
// import axios from "axios";

// export default function PaymentCallback() {
//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         const params = new URLSearchParams(window.location.search);
//         const txRef = params.get("tx_ref");

//         if (!txRef) {
//           console.log("No tx_ref found");
//           return;
//         }

//         console.log("Verifying:", txRef);

//         const response = await axios.get(
//           `http://localhost:3000/api/payment/chapa/verify/${txRef}`
//         );

//         console.log("Verification result:", response.data);

//       } catch (error) {
//         console.error(
//           "Payment verification failed:",
//           error.response?.data || error.message
//         );
//       }
//     };

//     verifyPayment();
//   }, []);

//   return <h2>Processing payment...</h2>;
// }