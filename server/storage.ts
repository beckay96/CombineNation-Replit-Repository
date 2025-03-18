import { User, InsertUser, EducationResource, FamilyTask, WellbeingLog } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { SupabaseStorage } from "./storage/supabase";

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

// Keep MemStorage as a fallback implementation
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

/**
 * Storage factory that creates the appropriate storage implementation based on environment variables.
 * Required environment variables:
 * - STORAGE_TYPE: 'supabase' | 'memory' (default: 'memory')
 * For Supabase storage:
 * - SUPABASE_URL: Supabase project URL
 * - SUPABASE_ANON_KEY: Supabase anonymous key
 */
function createStorage(): IStorage {
  const storageType = process.env.STORAGE_TYPE || 'memory';

  switch (storageType) {
    case 'supabase':
      if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
        console.warn('Supabase credentials not found, falling back to memory storage');
        return new MemStorage();
      }
      return new SupabaseStorage();

    case 'memory':
      return new MemStorage();

    default:
      console.warn(`Unknown storage type "${storageType}", falling back to memory storage`);
      return new MemStorage();
  }
}

export const storage: IStorage = createStorage();