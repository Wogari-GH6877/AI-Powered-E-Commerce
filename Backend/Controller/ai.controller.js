import { generateProductDescription ,generateChatResponse} from "../Services/ai.Service.js";

export const generateProductDescriptionController = async (req, res) => {
  try {

    const {
      name,
      category,
      subCategory,
      sizes
    } = req.body;

    // Parse sizes because FormData sends it as a string
    let parsedSizes;

    try {
      parsedSizes = JSON.parse(sizes);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid sizes format."
      });
    }

    // Validate metadata
    if (
      typeof name !== "string" ||
      typeof category !== "string" ||
      typeof subCategory !== "string" ||
      !Array.isArray(parsedSizes) ||
      parsedSizes.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product information."
      });
    }

    const description = await generateProductDescription({
      name,
      category,
      subCategory,
      sizes: parsedSizes,
      image: req.file
    });

    return res.json({
      success: true,
      description
    });

  } catch (error) {

    console.error(
      "AI description generation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate product description."
    });
  }
};


export const generateChatResponseController = async (req, res) => {
  try {
    const { message, history } = req.body;

    // Validate current message
    if (
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Message is required."
      });
    }

    // Validate conversation history
    if (!Array.isArray(history)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation history."
      });
    }

    const response = await generateChatResponse(
      message.trim(),
      history
    );

    return res.json({
      success: true,
      response
    });
  } catch (error) {
    console.error("AI chat error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response."
    });
  }
};

