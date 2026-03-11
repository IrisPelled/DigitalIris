import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { getAllLeads, addLead } from "./store.js";

const app = express();
const PORT = process.env.PORT ?? 3001;
const SESSION_SECRET = process.env.SESSION_SECRET ?? "change-me-in-production";
// Default password for staff login; override with ADMIN_PASSWORD in server/.env
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

function requireAuth(req, res, next) {
  if (req.session?.admin) return next();
  return res.status(401).json({ error: "Unauthorized" });
}

app.post("/api/auth/login", (req, res) => {
  const { password } = req.body ?? {};
  if (password === ADMIN_PASSWORD) {
    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ error: "Login failed" });
      req.session.admin = true;
      return res.json({ ok: true });
    });
  } else {
    return res.status(401).json({ error: "Invalid password" });
  }
});

app.get("/api/auth/me", (req, res) => {
  if (req.session?.admin) return res.json({ ok: true });
  return res.status(401).json({ error: "Not authenticated" });
});

app.post("/api/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    return res.json({ ok: true });
  });
});

app.post("/api/leads", (req, res) => {
  try {
    const { fullName, phoneNumber, selectedBot } = req.body;
    if (!fullName || !phoneNumber || !selectedBot) {
      return res.status(400).json({ error: "fullName, phoneNumber, and selectedBot are required" });
    }
    const record = addLead({
      fullName: String(fullName).trim(),
      phoneNumber: String(phoneNumber).trim(),
      selectedBot: String(selectedBot).trim(),
    });
    return res.status(201).json(record);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to save lead" });
  }
});

app.get("/api/leads", (_req, res) => {
  try {
    const leads = getAllLeads();
    return res.json(leads);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to load leads" });
  }
});

function escapeCsvCell(s) {
  const str = String(s ?? "");
  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

app.get("/api/leads/export", (req, res) => {
  try {
    const format = (req.query.format ?? "json").toString().toLowerCase();
    const leads = getAllLeads();
    if (format === "csv") {
      const header = "id,fullName,phoneNumber,selectedBot,timestamp";
      const rows = leads.map(
        (l) =>
          [l.id, l.fullName, l.phoneNumber, l.selectedBot, l.timestamp]
            .map(escapeCsvCell)
            .join(",")
      );
      const csv = [header, ...rows].join("\n");
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", 'attachment; filename="leads.csv"');
      return res.send(csv);
    }
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", 'attachment; filename="leads.json"');
    return res.json(leads);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Export failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
