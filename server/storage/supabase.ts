import { createClient } from '@supabase/supabase-js';
import type { IStorage } from '../storage';
import type { User, InsertUser, EducationResource, FamilyTask, WellbeingLog } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_HOST_URL_COMBINENATION_PLATFORM!,
  process.env.SUPABASE_ANON_KEY_COMBINENATION_PLATFORM!,
  {
    auth: {
      persistSession: false // Since we're using our own session management
    }
  }
);

// Log connection status
supabase.from('users').select('id').limit(1)
  .then(() => console.log('Supabase connected successfully'))
  .catch(err => console.error('Supabase connection error:', err));

export class SupabaseStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    // We still use MemoryStore for sessions as Supabase doesn't handle sessions
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24 hours
    });

    // Verify database connection on startup
    this.verifyConnection();
  }

  private async verifyConnection() {
    try {
      const { error } = await supabase.from('users').select('id').limit(1);
      if (error) throw error;
      console.log('Successfully connected to Supabase');
    } catch (error) {
      console.error('Failed to connect to Supabase:', error);
      throw new Error('Could not connect to Supabase database');
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('username', username)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // Ignore not found error
    return data;
  }

  async createUser(user: InsertUser): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getEducationResources(userId: number): Promise<EducationResource[]> {
    const { data, error } = await supabase
      .from('education_resources')
      .select()
      .eq('userId', userId);

    if (error) throw error;
    return data;
  }

  async createEducationResource(resource: Omit<EducationResource, "id">): Promise<EducationResource> {
    const { data, error } = await supabase
      .from('education_resources')
      .insert([resource])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getFamilyTasks(userId: number): Promise<FamilyTask[]> {
    const { data, error } = await supabase
      .from('family_tasks')
      .select()
      .eq('userId', userId);

    if (error) throw error;
    return data;
  }

  async createFamilyTask(task: Omit<FamilyTask, "id">): Promise<FamilyTask> {
    const { data, error } = await supabase
      .from('family_tasks')
      .insert([task])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateFamilyTask(id: number, task: Partial<FamilyTask>): Promise<FamilyTask> {
    const { data, error } = await supabase
      .from('family_tasks')
      .update(task)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getWellbeingLogs(userId: number): Promise<WellbeingLog[]> {
    const { data, error } = await supabase
      .from('wellbeing_logs')
      .select()
      .eq('userId', userId)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data;
  }

  async createWellbeingLog(log: Omit<WellbeingLog, "id">): Promise<WellbeingLog> {
    const { data, error } = await supabase
      .from('wellbeing_logs')
      .insert([log])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}