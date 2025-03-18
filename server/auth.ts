import { createClient } from "@supabase/supabase-js";
import { Express } from "express";
import session from "express-session";
import { storage } from "./storage";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      [key: string]: any;
    }
  }
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SUPABASE_SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));

  app.post("/api/register", async (req, res) => {
    const { email, password } = req.body;
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(201).send("User registered:", req.body.email);
  });

  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    req.session.user = data.user;
    res.status(200).json(data.user);
  });

  app.post("/api/logout", async (req, res) => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    req.session.destroy(() => res.sendStatus(200));
  });

  app.get("/api/user", (req, res) => {
    if (!req.session.user) return res.sendStatus(401);
    res.json(req.session.user);
  });
}