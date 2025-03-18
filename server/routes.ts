import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Education resources routes
  app.get("/api/education", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const resources = await storage.getEducationResources(req.user.id);
    res.json(resources);
  });

  app.post("/api/education", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const resource = await storage.createEducationResource({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(resource);
  });

  // Family tasks routes
  app.get("/api/family-tasks", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const tasks = await storage.getFamilyTasks(req.user.id);
    res.json(tasks);
  });

  app.post("/api/family-tasks", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const task = await storage.createFamilyTask({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(task);
  });

  app.patch("/api/family-tasks/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const task = await storage.updateFamilyTask(parseInt(req.params.id), req.body);
    res.json(task);
  });

  // Wellbeing logs routes
  app.get("/api/wellbeing", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const logs = await storage.getWellbeingLogs(req.user.id);
    res.json(logs);
  });

  app.post("/api/wellbeing", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const log = await storage.createWellbeingLog({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(log);
  });

  const httpServer = createServer(app);
  return httpServer;
}
