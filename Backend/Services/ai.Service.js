import { GoogleGenAI } from "@google/genai";
import { searchProducts } from "./productSearch.Service.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const searchProductsTool = {
  name: "searchProducts",
  description:
    "Search the store catalog for active, in-stock products based on customer preferences such as category, subcategory, maximum price, size, or brand.",

  parameters: {
    type: "object",

    properties: {
      category: {
        type: "string",
        description:
          "Product category, for example Men or Women.",
      },

      subCategory: {
        type: "string",
        description:
          "Product subcategory, for example Topwear or Bottomwear.",
      },

      maxPrice: {
        type: "number",
        description:
          "Maximum acceptable selling price in ETB.",
      },

      size: {
        type: "string",
        description:
          "Preferred product size, for example S, M, L, or XL.",
      },

      brand: {
        type: "string",
        description:
          "Preferred product brand.",
      },
    },

    required: [],
  },
};

export const getChatFallbackResponse = () => {
  return "I'm here to help! ✨ You can ask me about products, sizes, shipping, returns, or order tracking.";
};

export const generateProductDescription = async ({
  name,
  category,
  subCategory,
  sizes,
  image,
}) => {
  const prompt = `
You are an e-commerce product description writer.

Create a professional product description using the
provided product information.

Product information:

Product name: ${name}
Category: ${category}
Subcategory: ${subCategory}
Available sizes: ${sizes.join(", ")}

Rules:

- Write 2 short paragraphs.
- Make the description attractive and suitable for an
  online clothing store.
- Use the provided metadata as the authoritative source
  for product facts.
- If an image is provided, use it to understand visible
  characteristics of the product.
- Do not invent material, brand, performance,
  or other properties that were not provided.
- Do not mention price or stock.
- Do not claim something is visible in the image if it
  cannot reasonably be determined.
`;

  let contents;

  if (image) {
    contents = [
      {
        text: prompt,
      },
      {
        inlineData: {
          mimeType: image.mimetype,
          data: image.buffer.toString("base64"),
        },
      },
    ];
  } else {
    contents = prompt;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini product description error:", error);
    return "I’m unable to generate a product description right now, but the product details are ready to use.";
  }
};

export const generateChatResponse = async (message, history = []) => {
  try {
    const conversation = [
      ...history
        .filter((item) => item && item.text)
        .map((item) => ({
          role: item.type === "user" ? "user" : "model",
          parts: [{ text: item.text }],
        })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: conversation,
      config: {
        tools: [
          {
            functionDeclarations: [searchProductsTool],
          },
        ],
      },
    });

    const functionCalls = response.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      const functionCall = functionCalls[0];

      if (functionCall.name === "searchProducts") {
        const products = await searchProducts(functionCall.args);

        const finalResponse = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: [
            ...conversation,
            {
              role: "model",
              parts: [
                {
                  functionCall: {
                    name: functionCall.name,
                    args: functionCall.args,
                  },
                },
              ],
            },
            {
              role: "user",
              parts: [
                {
                  text: `Here are the products returned from the store database:

${JSON.stringify(products)}

Use these results to answer the customer's request.
Do not invent products or information that is not in these results.`,
                },
              ],
            },
          ],
        });

        return finalResponse.text || getChatFallbackResponse();
      }
    }

    return response.text || getChatFallbackResponse();
  } catch (error) {
    console.error("Gemini chat error:", error);
    return getChatFallbackResponse();
  }
};
