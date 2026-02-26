import express from "express";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API Routes
  app.post("/api/submit-quote", (req, res) => {
    const { items, contactInfo } = req.body;
    
    console.log("Received Quote Request:");
    console.log("Contact:", contactInfo);
    console.log("Items:", items);

    // Here you would integrate with an email service like Nodemailer, SendGrid, or Resend.
    // For now, we simulate success.
    
    res.json({ success: true, message: "Orçamento recebido com sucesso!" });
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    // (Note: This part is theoretical for this dev environment, 
    // but good practice for full-stack structure)
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
