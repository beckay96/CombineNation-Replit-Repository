import { User, InsertUser, EducationResource, FamilyTask, WellbeingLog } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Education resources
  getEducationResources(userId: number): Promise<EducationResource[]>;
  createEducationResource(resource: Omit<EducationResource, "id">): Promise<EducationResource>;
  
  // Family tasks
  getFamilyTasks(userId: number): Promise<FamilyTask[]>;
  createFamilyTask(task: Omit<FamilyTask, "id">): Promise<FamilyTask>;
  updateFamilyTask(id: number, task: Partial<FamilyTask>): Promise<FamilyTask>;
  
  // Wellbeing logs
  getWellbeingLogs(userId: number): Promise<WellbeingLog[]>;
  createWellbeingLog(log: Omit<WellbeingLog, "id">): Promise<WellbeingLog>;

  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private educationResources: Map<number, EducationResource>;
  private familyTasks: Map<number, FamilyTask>;
  private wellbeingLogs: Map<number, WellbeingLog>;
  public sessionStore: session.Store;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.educationResources = new Map();
    this.familyTasks = new Map();
    this.wellbeingLogs = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user = { ...insertUser, id, role: "user" };
    this.users.set(id, user);
    return user;
  }

  async getEducationResources(userId: number): Promise<EducationResource[]> {
    return Array.from(this.educationResources.values()).filter(
      (resource) => resource.userId === userId,
    );
  }

  async createEducationResource(
    resource: Omit<EducationResource, "id">,
  ): Promise<EducationResource> {
    const id = this.currentId++;
    const newResource = { ...resource, id };
    this.educationResources.set(id, newResource);
    return newResource;
  }

  async getFamilyTasks(userId: number): Promise<FamilyTask[]> {
    return Array.from(this.familyTasks.values()).filter(
      (task) => task.userId === userId,
    );
  }

  async createFamilyTask(task: Omit<FamilyTask, "id">): Promise<FamilyTask> {
    const id = this.currentId++;
    const newTask = { ...task, id };
    this.familyTasks.set(id, newTask);
    return newTask;
  }

  async updateFamilyTask(
    id: number,
    task: Partial<FamilyTask>,
  ): Promise<FamilyTask> {
    const existingTask = this.familyTasks.get(id);
    if (!existingTask) {
      throw new Error("Task not found");
    }
    const updatedTask = { ...existingTask, ...task };
    this.familyTasks.set(id, updatedTask);
    return updatedTask;
  }

  async getWellbeingLogs(userId: number): Promise<WellbeingLog[]> {
    return Array.from(this.wellbeingLogs.values()).filter(
      (log) => log.userId === userId,
    );
  }

  async createWellbeingLog(log: Omit<WellbeingLog, "id">): Promise<WellbeingLog> {
    const id = this.currentId++;
    const newLog = { ...log, id };
    this.wellbeingLogs.set(id, newLog);
    return newLog;
  }
}

export const storage = new MemStorage();
