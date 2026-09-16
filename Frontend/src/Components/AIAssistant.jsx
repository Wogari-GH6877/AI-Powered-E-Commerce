import React, { useState, useRef, useEffect } from "react";
import api from "../Services/Axios";
import ReactMarkdown from "react-markdown";
import {
  Sparkles,
  X,
  Send,
  ShoppingBag,
  Ruler,
  RefreshCcw,
  Truck,
  MessageCircle,
  Bot,
  User,
  Minimize2,
} from "lucide-react";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hi there! 👋",
    },
    {
      id: 2,
      type: "bot",
      text: "I'm your wak-e-commerce shopping assistant. I can help you find products, choose your size, track orders, and answer questions.",
    },
  ]);

  const messagesEndRef = useRef(null);

  // ==============================
  // AUTO SCROLL
  // ==============================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  // ==============================
  // AI RESPONSE
  // ==============================

  const getAIResponse = (message) => {
    const text = message.toLowerCase();

    if (
      text.includes("product") ||
      text.includes("find") ||
      text.includes("recommend") ||
      text.includes("dress") ||
      text.includes("shirt")
    ) {
      return "Of course! ✨ Tell me what you're looking for, your preferred color, size, and budget. I'll help you find the perfect item.";
    }

    if (
      text.includes("size") ||
      text.includes("sizing") ||
      text.includes("fit")
    ) {
      return "I'd be happy to help with sizing 📏. Tell me your usual size and whether you prefer a relaxed or fitted style.";
    }

    if (
      text.includes("return") ||
      text.includes("refund") ||
      text.includes("exchange")
    ) {
      return "No problem! 🔄 Our store currently supports a 7-day return policy. Items should be unused and in their original condition.";
    }

    if (
      text.includes("shipping") ||
      text.includes("delivery")
    ) {
      return "🚚 We offer delivery on all orders. Orders over $100 qualify for free express delivery.";
    }

    if (
      text.includes("track") ||
      text.includes("order")
    ) {
      return "I'd be happy to help track your order 📦. Please provide your order number.";
    }

    if (
      text.includes("price") ||
      text.includes("cheap") ||
      text.includes("budget")
    ) {
      return "Absolutely! 💰 Tell me your budget and what type of clothing you're looking for, and I'll suggest suitable products.";
    }

    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {
      return "Hello! 👋 Welcome to FOREVER. What are you shopping for today?";
    }

    return "I'm here to help! ✨ You can ask me about products, sizes, shipping, returns, or order tracking.";
  };



  const sendMessage = async (message = input) => {
  const trimmedMessage = message.trim();

  if (!trimmedMessage || isTyping) return;

  const userMessage = {
    id: Date.now(),
    type: "user",
    text: trimmedMessage,
  };

  const updatedMessages = [...messages, userMessage];

setMessages(updatedMessages);
  // console.log(messages)
  // setMessages((prev) => [...prev, userMessage]);
  // console.log(messages)
  setInput("");
  setIsTyping(true);

  try {
    const response = await api.post(
       "/api/ai/chat",
      {
        message: trimmedMessage,
        history:updatedMessages
      }
    );

    if (response.data.success) {
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: response.data.response,
      };

      setMessages((prev) => [...prev, botMessage]);
    } else {
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: response.data.message || "Sorry, something went wrong.",
      };

      setMessages((prev) => [...prev, botMessage]);
    }

  } catch (error) {

    console.error("AI chat error:", error);

    const botMessage = {
      id: Date.now() + 1,
      type: "bot",
      text:
        error.response?.data?.message ||
        "Sorry, I couldn't connect to the shopping assistant.",
    };

    setMessages((prev) => [...prev, botMessage]);

  } finally {
    setIsTyping(false);
  }
};
  
  // QUICK ACTION
  // ==============================

  const quickAction = (message) => {
    sendMessage(message);
  };

  return (
    <>
      {/* =====================================================
          AI CHAT WINDOW
      ===================================================== */}

      {isOpen && (
        <div
          className="
            fixed
            bottom-24
            right-4
            sm:right-6
            z-[999]
            w-[calc(100%-32px)]
            sm:w-[380px]
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-2xl
          "
        >

          {/* ================= HEADER ================= */}

          <div
            className="
              flex
              items-center
              gap-3
              bg-black
              px-4
              py-4
              text-white
            "
          >

            {/* AI Icon */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white/10
                ring-1
                ring-white/20
              "
            >
              <Sparkles size={18} />
            </div>


            {/* Title */}

            <div className="flex-1">

              <h3 className="text-sm font-semibold">
                Wak-E-Commerce AI
              </h3>

              <div className="mt-0.5 flex items-center gap-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                <span className="text-[10px] text-gray-300">
                  Online · Shopping Assistant
                </span>

              </div>

            </div>


            {/* Minimize */}

            <button
              onClick={() => setIsOpen(false)}
              className="
                rounded-full
                p-2
                text-gray-300
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              <Minimize2 size={17} />
            </button>

          </div>


          {/* ================= WELCOME ================= */}

          <div
            className="
              border-b
              border-gray-100
              bg-gradient-to-r
              from-[#faf9ff]
              to-[#fff7fb]
              px-4
              py-3
            "
          >

            <div className="flex items-center gap-2">

              <Bot
                size={15}
                className="text-purple-500"
              />

              <p className="text-[10px] text-gray-500">
                Ask me anything about your shopping experience.
              </p>

            </div>

          </div>


          {/* ================= MESSAGES ================= */}

          <div
            className="
              h-[330px]
              overflow-y-auto
              bg-white
              px-4
              py-4
              scrollbar-thin
            "
          >

            {messages.map((message) => (

              <div
                key={message.id}
                className={`
                  mb-4
                  flex
                  items-end
                  gap-2
                  ${
                    message.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }
                `}
              >

                {/* Bot Avatar */}

                {message.type === "bot" && (

                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-purple-50
                      text-purple-600
                    "
                  >
                    <Sparkles size={13} />
                  </div>

                )}


                {/* Message */}

                <div
                  className={`
                    max-w-[78%]
                    rounded-2xl
                    px-3.5
                    py-2.5
                    text-[11px]
                    leading-5
                    ${
                      message.type === "user"
                        ? `
                          rounded-br-md
                          bg-black
                          text-white
                        `
                        : `
                          rounded-bl-md
                          bg-gray-100
                          text-gray-700
                        `
                    }
                  `}
                >
                  <ReactMarkdown>
                    {message.text}
                  </ReactMarkdown>
                </div>


                {/* User Avatar */}

                {message.type === "user" && (

                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-black
                      text-white
                    "
                  >
                    <User size={13} />
                  </div>

                )}

              </div>

            ))}


            {/* ================= TYPING ================= */}

            {isTyping && (

              <div className="mb-4 flex items-end gap-2">

                <div
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-purple-50
                    text-purple-600
                  "
                >
                  <Sparkles size={13} />
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-1
                    rounded-2xl
                    rounded-bl-md
                    bg-gray-100
                    px-4
                    py-3
                  "
                >

                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />

                </div>

              </div>

            )}

            <div ref={messagesEndRef} />

          </div>


          {/* ================= QUICK ACTIONS ================= */}

          <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">

            <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-gray-400">
              Quick help
            </p>

            <div className="grid grid-cols-2 gap-2">

              <button
                onClick={() =>
                  quickAction("Find products for me")
                }
                className="ai-quick-button"
              >
                <ShoppingBag size={13} />
                Find products
              </button>


              <button
                onClick={() =>
                  quickAction("Help me with sizing")
                }
                className="ai-quick-button"
              >
                <Ruler size={13} />
                Sizing help
              </button>


              <button
                onClick={() =>
                  quickAction("How do returns work?")
                }
                className="ai-quick-button"
              >
                <RefreshCcw size={13} />
                Returns
              </button>


              <button
                onClick={() =>
                  quickAction("How long is delivery?")
                }
                className="ai-quick-button"
              >
                <Truck size={13} />
                Delivery
              </button>

            </div>

          </div>


          {/* ================= INPUT ================= */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="
              flex
              items-center
              gap-2
              border-t
              border-gray-100
              bg-white
              p-3
            "
          >

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products..."
              className="
                min-w-0
                flex-1
                rounded-full
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                text-[11px]
                text-gray-700
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-gray-400
                focus:bg-white
              "
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-black
                text-white
                transition
                hover:bg-gray-800
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <Send size={15} />
            </button>

          </form>


          {/* ================= FOOTER ================= */}

          <div className="border-t border-gray-100 bg-white py-2 text-center">

            <p className="text-[8px] text-gray-400">
              AI shopping assistant · Your conversations are private
            </p>

          </div>

        </div>
      )}


      {/* =====================================================
          FLOATING AI BUTTON
      ===================================================== */}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open AI shopping assistant"
        className="
          fixed
          bottom-5
          right-4
          sm:right-6
          z-[1000]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-black
          text-white
          shadow-xl
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-2xl
        "
      >

        {isOpen ? (
          <X size={22} />
        ) : (
          <Sparkles size={23} />
        )}

        {/* Online indicator */}

        {!isOpen && (

          <span
            className="
              absolute
              right-0
              top-0
              h-3
              w-3
              rounded-full
              border-2
              border-white
              bg-green-500
            "
          />

        )}

      </button>

    </>
  );
};

export default AIAssistant;