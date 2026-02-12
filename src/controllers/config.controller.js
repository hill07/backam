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

export const setCredits = async (req, res) => {
  try {
    const { email, version, credits } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "email is required"
      });
    }

    // Upsert: update if exists, create if not
    const config = await Config.findOneAndUpdate(
      { email },
      {
        email,
        version,
        cr: credits,
        // Ensure default fields are set on creation if needed, 
        // though schema defaults handle isProUser: true, cr: 0 (overridden by credits)
        $setOnInsert: { isProUser: true }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      "__cr": config.cr
    });

  } catch (error) {
    console.error("setCredits error:", error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
};
