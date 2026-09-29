

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

function Orders({ token }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingOrder, setUpdatingOrder] = useState(null)
  const [deletingOrder, setDeletingOrder] = useState(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)

      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.success) {
        setOrders(response.data.orders || [])
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingOrder(orderId)

      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        {
          orderId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, orderStatus: status }
              : order
          )
        )

        toast.success('Status updated')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setUpdatingOrder(null)
    }
  }

  const deleteOrder = async (orderId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this order? This action cannot be undone.'
    )

    if (!confirmed) return

    try {
      setDeletingOrder(orderId)

      /*
       * Change this endpoint if your backend uses another route.
       */
      const response = await axios.post(
        `${backendUrl}/api/order/delete`,
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.success) {
        setOrders((prev) =>
          prev.filter((order) => order._id !== orderId)
        )

        toast.success('Order deleted')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setDeletingOrder(null)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [token])

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700'

      case 'shipped':
        return 'bg-blue-50 text-blue-700'

      case 'processing':
        return 'bg-amber-50 text-amber-700'

      case 'cancelled':
        return 'bg-red-50 text-red-700'

      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const formatStatus = (status) => {
    if (!status) return 'Pending'

    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const getOrderNumber = (order, index) => {
    /*
     * The MongoDB _id itself is not user-friendly.
     *
     * We use the last 6 characters so the admin gets a short
     * reference instead of seeing the full MongoDB ObjectId.
     */
    if (order?._id) {
      return `#${order._id.slice(-6).toUpperCase()}`
    }

    return `#${String(index + 1).padStart(4, '0')}`
  }

  const getItemCount = (items = []) => {
    return items.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0
    )
  }

  return (
    <div className="w-full">
      {/* Small header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Orders
          </h1>

          <p className="mt-0.5 text-xs text-gray-500">
            {orders.length} total {orders.length === 1 ? 'order' : 'orders'}
          </p>
        </div>

        <button
          onClick={fetchOrders}
          disabled={loading}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="space-y-0">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex animate-pulse items-center gap-4 border-b border-gray-100 px-4 py-3"
              >
                <div className="h-9 w-9 rounded-lg bg-gray-200" />
                <div className="flex-1">
                  <div className="mb-2 h-3 w-32 rounded bg-gray-200" />
                  <div className="h-2.5 w-48 rounded bg-gray-100" />
                </div>
                <div className="h-7 w-20 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-12 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>

          <p className="text-sm font-medium text-gray-900">
            No orders yet
          </p>

          <p className="mt-1 text-xs text-gray-500">
            New customer orders will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* ================= DESKTOP ================= */}
          <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block">
            {/* Table header */}
            <div className="grid grid-cols-[1.2fr_1.5fr_2fr_0.8fr_1.1fr_100px] items-center gap-4 border-b border-gray-100 bg-gray-50/70 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              <span>Order</span>
              <span>Customer</span>
              <span>Products</span>
              <span>Amount</span>
              <span>Status</span>
              <span className="text-right">Action</span>
            </div>

            {/* Orders */}
            {orders.map((order, index) => {
              const itemCount = getItemCount(order.items)

              return (
                <div
                  key={order._id}
                  className="grid grid-cols-[1.2fr_1.5fr_2fr_0.8fr_1.1fr_100px] items-center gap-4 border-b border-gray-100 px-4 py-3 transition hover:bg-gray-50/60 last:border-b-0"
                >
                  {/* Order ID */}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {getOrderNumber(order, index)}
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : '—'}
                    </p>
                  </div>

                  {/* Customer */}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {order.userId?.name || 'Customer'}
                    </p>

                    {order.userId?.email && (
                      <p className="truncate text-[11px] text-gray-400">
                        {order.userId.email}
                      </p>
                    )}
                  </div>

                  {/* Products */}
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex -space-x-2">
                      {order.items?.slice(0, 3).map((item, itemIndex) => {
                        const image =
                          item.image &&
                          item.image !== 'product-image-unavailable'
                            ? item.image
                            : item.productId?.images?.[0]?.secure_url

                        return (
                          <div
                            key={`${order._id}-${itemIndex}`}
                            className="h-8 w-8 overflow-hidden rounded-md border-2 border-white bg-gray-100"
                          >
                            {image ? (
                              <img
                                src={image}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[9px] text-gray-400">
                                N/A
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-gray-700">
                        {order.items?.[0]?.name || 'No products'}
                        {order.items?.length > 1 &&
                          ` +${order.items.length - 1}`}
                      </p>

                      <p className="text-[10px] text-gray-400">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <p className="text-sm font-semibold text-gray-900">
                    {currency}
                    {Number(order.amount || 0).toFixed(2)}
                  </p>

                  {/* Status */}
                  <div>
                    <select
                      value={order.orderStatus || 'pending'}
                      disabled={updatingOrder === order._id}
                      onChange={(event) =>
                        updateStatus(
                          order._id,
                          event.target.value
                        )
                      }
                      className={`cursor-pointer rounded-full border-0 px-2.5 py-1.5 text-[11px] font-semibold outline-none ${getStatusClass(
                        order.orderStatus
                      )} disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      {[
                        'pending',
                        'processing',
                        'shipped',
                        'delivered',
                        'cancelled',
                      ].map((status) => (
                        <option key={status} value={status}>
                          {formatStatus(status)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Delete */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => deleteOrder(order._id)}
                      disabled={deletingOrder === order._id}
                      title="Delete order"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {deletingOrder === order._id ? (
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="30 20"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v12a1 1 0 01-1 1H8a1 1 0 01-1-1V7h10zM10 11v5M14 11v5"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ================= MOBILE ================= */}
          <div className="space-y-2 md:hidden">
            {orders.map((order, index) => {
              const itemCount = getItemCount(order.items)

              return (
                <div
                  key={order._id}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                >
                  {/* Top */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {getOrderNumber(order, index)}
                      </p>

                      <p className="text-[10px] text-gray-400">
                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleDateString()
                          : '—'}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-gray-900">
                      {currency}
                      {Number(order.amount || 0).toFixed(2)}
                    </p>
                  </div>

                  {/* Customer */}
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-800">
                      {order.userId?.name || 'Customer'}
                    </p>

                    {order.userId?.email && (
                      <p className="truncate text-[10px] text-gray-400">
                        {order.userId.email}
                      </p>
                    )}
                  </div>

                  {/* Products */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {order.items?.slice(0, 3).map((item, itemIndex) => {
                        const image =
                          item.image &&
                          item.image !== 'product-image-unavailable'
                            ? item.image
                            : item.productId?.images?.[0]?.secure_url

                        return (
                          <div
                            key={`${order._id}-${itemIndex}`}
                            className="h-8 w-8 overflow-hidden rounded-md border-2 border-white bg-gray-100"
                          >
                            {image && (
                              <img
                                src={image}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                        )
                      })}
                    </div>

                    <div>
                      <p className="max-w-[200px] truncate text-xs text-gray-700">
                        {order.items?.[0]?.name || 'No products'}
                        {order.items?.length > 1 &&
                          ` +${order.items.length - 1}`}
                      </p>

                      <p className="text-[10px] text-gray-400">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                    <select
                      value={order.orderStatus || 'pending'}
                      disabled={updatingOrder === order._id}
                      onChange={(event) =>
                        updateStatus(
                          order._id,
                          event.target.value
                        )
                      }
                      className={`rounded-full border-0 px-3 py-1.5 text-[11px] font-semibold outline-none ${getStatusClass(
                        order.orderStatus
                      )}`}
                    >
                      {[
                        'pending',
                        'processing',
                        'shipped',
                        'delivered',
                        'cancelled',
                      ].map((status) => (
                        <option key={status} value={status}>
                          {formatStatus(status)}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => deleteOrder(order._id)}
                      disabled={deletingOrder === order._id}
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-40"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v12a1 1 0 01-1 1H8a1 1 0 01-1-1V7h10zM10 11v5M14 11v5"
                        />
                      </svg>

                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default Orders


