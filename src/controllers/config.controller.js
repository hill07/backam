import Config from "../models/config.js";

export const getConfig = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        error: "email is required"
      });
    }

    const config = await Config.findOne({ email });

    // ❌ Do NOT auto-create
    if (!config) {
      return res.status(404).json({
        "__cr": 0,
        "__to": email,
        "__isProUser": false
      });
    }

    return res.status(200).json({
      "__cr": config.cr,
      "__to": config.email,
      "__isProUser": config.isProUser
    });

  } catch (error) {
    console.error("getConfig error:", error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
};
