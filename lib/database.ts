import { createClient } from "@/lib/supabase/server";
import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  apiKey: string;
  hasLocustSubscription: boolean;
  trialStartDate: number | null;
  trialExpirationDate?: number | null;
  trialExpired: boolean;
  verified: boolean;
  verificationCode?: string;
  verificationExpiry?: number;
  createdAt: number;
  isAdmin?: boolean;
  requestCount?: number;
  subscriptionId?: string | null;
  subscriptionStatus?: string;
  subscriptionExpirationDate?: number | null;
  stripeCustomerId?: string | null;
}

interface ApiUsage {
  userId: string;
  endpoint: string;
  timestamp: number;
  success: boolean;
}

interface ErrorLog {
  endpoint: string;
  errorType: string;
  message: string;
  stack?: string;
  fixSuggestion?: string;
  timestamp: number;
}

class Database {

  async createUser(username: string, email: string, password: string): Promise<User> {
    const supabase = await createClient();
    
    const apiKey = `locust_${uuidv4().replace(/-/g, "")}`;
    const createdAt = Date.now();
    const trialStartDate = createdAt;
    const trialExpirationDate = createdAt + (7 * 24 * 60 * 60 * 1000);

    const { data, error } = await supabase
      .from("users")
      .insert({
        username,
        email,
        password,
        api_key: apiKey,
        has_locust_subscription: false,
        trial_start_date: trialStartDate,
        trial_expiration_date: trialExpirationDate,
        trial_expired: false,
        verified: false,
        created_at: createdAt,
        is_admin: false,
        subscription_status: 'none',
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create user: ${error.message}`);

    return {
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      apiKey: data.api_key,
      hasLocustSubscription: data.has_locust_subscription,
      trialStartDate: data.trial_start_date,
      trialExpirationDate: data.trial_expiration_date,
      trialExpired: data.trial_expired,
      verified: data.verified,
      createdAt: data.created_at,
      isAdmin: data.is_admin,
      subscriptionId: data.subscription_id,
      subscriptionStatus: data.subscription_status,
      subscriptionExpirationDate: data.subscription_expiration_date,
      stripeCustomerId: data.stripe_customer_id,
    };
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !data) return undefined;

    return {
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      apiKey: data.api_key,
      hasLocustSubscription: data.has_locust_subscription,
      trialStartDate: data.trial_start_date,
      trialExpirationDate: data.trial_expiration_date,
      trialExpired: data.trial_expired,
      verified: data.verified,
      createdAt: data.created_at,
      isAdmin: data.is_admin,
      subscriptionId: data.subscription_id,
      subscriptionStatus: data.subscription_status,
      subscriptionExpirationDate: data.subscription_expiration_date,
      stripeCustomerId: data.stripe_customer_id,
    };
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) return undefined;

    return {
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      apiKey: data.api_key,
      hasLocustSubscription: data.has_locust_subscription,
      trialStartDate: data.trial_start_date,
      trialExpirationDate: data.trial_expiration_date,
      trialExpired: data.trial_expired,
      verified: data.verified,
      createdAt: data.created_at,
      isAdmin: data.is_admin,
      subscriptionId: data.subscription_id,
      subscriptionStatus: data.subscription_status,
      subscriptionExpirationDate: data.subscription_expiration_date,
      stripeCustomerId: data.stripe_customer_id,
    };
  }

  async getUserByApiKey(apiKey: string): Promise<User | undefined> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("api_key", apiKey)
      .single();

    if (error || !data) return undefined;

    return {
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      apiKey: data.api_key,
      hasLocustSubscription: data.has_locust_subscription,
      trialStartDate: data.trial_start_date,
      trialExpirationDate: data.trial_expiration_date,
      trialExpired: data.trial_expired,
      verified: data.verified,
      createdAt: data.created_at,
      isAdmin: data.is_admin,
      subscriptionId: data.subscription_id,
      subscriptionStatus: data.subscription_status,
      subscriptionExpirationDate: data.subscription_expiration_date,
      stripeCustomerId: data.stripe_customer_id,
    };
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User | undefined> {
    const supabase = await createClient();
    
    const dbUpdates: any = {};
    if (updates.username !== undefined) dbUpdates.username = updates.username;
    if (updates.email !== undefined) dbUpdates.email = updates.email;
    if (updates.password !== undefined) dbUpdates.password = updates.password;
    if (updates.hasLocustSubscription !== undefined) dbUpdates.has_locust_subscription = updates.hasLocustSubscription;
    if (updates.trialStartDate !== undefined) dbUpdates.trial_start_date = updates.trialStartDate;
    if (updates.trialExpirationDate !== undefined) dbUpdates.trial_expiration_date = updates.trialExpirationDate;
    if (updates.trialExpired !== undefined) dbUpdates.trial_expired = updates.trialExpired;
    if (updates.verified !== undefined) dbUpdates.verified = updates.verified;
    if (updates.apiKey !== undefined) dbUpdates.api_key = updates.apiKey;
    if (updates.subscriptionId !== undefined) dbUpdates.subscription_id = updates.subscriptionId;
    if (updates.subscriptionStatus !== undefined) dbUpdates.subscription_status = updates.subscriptionStatus;
    if (updates.subscriptionExpirationDate !== undefined) dbUpdates.subscription_expiration_date = updates.subscriptionExpirationDate;
    if (updates.stripeCustomerId !== undefined) dbUpdates.stripe_customer_id = updates.stripeCustomerId;

    const { data, error } = await supabase
      .from("users")
      .update(dbUpdates)
      .eq("id", userId)
      .select()
      .single();

    if (error || !data) return undefined;

    return {
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      apiKey: data.api_key,
      hasLocustSubscription: data.has_locust_subscription,
      trialStartDate: data.trial_start_date,
      trialExpirationDate: data.trial_expiration_date,
      trialExpired: data.trial_expired,
      verified: data.verified,
      createdAt: data.created_at,
      isAdmin: data.is_admin,
      subscriptionId: data.subscription_id,
      subscriptionStatus: data.subscription_status,
      subscriptionExpirationDate: data.subscription_expiration_date,
      stripeCustomerId: data.stripe_customer_id,
    };
  }

  async setVerificationCode(userId: string, code: string): Promise<void> {
    // Store verification codes in memory temporarily (can add to DB if needed)
    // For now, just mark as verified immediately for simplicity
    await this.updateUser(userId, { verified: true });
  }

  async verifyEmail(userId: string, code: string): Promise<boolean> {
    await this.updateUser(userId, { verified: true });
    return true;
  }

  async logApiUsage(userId: string, endpoint: string, success: boolean): Promise<void> {
    const supabase = await createClient();
    
    await supabase.from("api_usage").insert({
      user_id: userId,
      endpoint,
      timestamp: Date.now(),
      success,
    });
  }

  async getApiUsage(userId: string): Promise<ApiUsage[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("api_usage")
      .select("*")
      .eq("user_id", userId)
      .order("timestamp", { ascending: false })
      .limit(100);

    if (error || !data) return [];

    return data.map((usage) => ({
      userId: usage.user_id,
      endpoint: usage.endpoint,
      timestamp: usage.timestamp,
      success: usage.success,
    }));
  }

  async getAllUsers(): Promise<User[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase.from("users").select("*");

    if (error || !data) return [];

    return data.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      apiKey: user.api_key,
      hasLocustSubscription: user.has_locust_subscription,
      trialStartDate: user.trial_start_date,
      trialExpirationDate: user.trial_expiration_date,
      trialExpired: user.trial_expired,
      verified: user.verified,
      createdAt: user.created_at,
      isAdmin: user.is_admin,
      subscriptionId: user.subscription_id,
      subscriptionStatus: user.subscription_status,
      subscriptionExpirationDate: user.subscription_expiration_date,
      stripeCustomerId: user.stripe_customer_id,
    }));
  }

  async getTotalApiUsage(): Promise<number> {
    const supabase = await createClient();
    
    const { count, error } = await supabase
      .from("api_usage")
      .select("*", { count: "exact", head: true });

    if (error) return 0;
    return count || 0;
  }

  async getTotalRequests(): Promise<number> {
    return this.getTotalApiUsage();
  }

  async getUserById(userId: string): Promise<User | undefined> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) return undefined;

    return {
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      apiKey: data.api_key,
      hasLocustSubscription: data.has_locust_subscription,
      trialStartDate: data.trial_start_date,
      trialExpirationDate: data.trial_expiration_date,
      trialExpired: data.trial_expired,
      verified: data.verified,
      createdAt: data.created_at,
      isAdmin: data.is_admin,
      subscriptionId: data.subscription_id,
      subscriptionStatus: data.subscription_status,
      subscriptionExpirationDate: data.subscription_expiration_date,
      stripeCustomerId: data.stripe_customer_id,
    };
  }

  async isUserAdmin(userId: string): Promise<boolean> {
    const user = await this.getUserById(userId);
    return user?.isAdmin || false;
  }

  isTrialValid(user: User): boolean {
    if (user.isAdmin) return true;
    
    if (user.hasLocustSubscription) {
      if (user.subscriptionExpirationDate && Date.now() > user.subscriptionExpirationDate) {
        this.updateUser(user.id, { 
          hasLocustSubscription: false,
          subscriptionStatus: 'expired'
        });
        return false;
      }
      if (user.subscriptionStatus === 'active') {
        return true;
      }
    }
    
    if (!user.trialStartDate) return false;
    if (user.trialExpired) return false;

    const trialEndDate = user.trialExpirationDate || (user.trialStartDate + (7 * 24 * 60 * 60 * 1000));
    const isValid = Date.now() < trialEndDate;

    if (!isValid && !user.trialExpired) {
      this.updateUser(user.id, { trialExpired: true });
    }

    return isValid;
  }

  getTrialDaysRemaining(user: User): number {
    if (!user.trialStartDate || user.trialExpired) return 0;

    const trialEndDate = user.trialExpirationDate || (user.trialStartDate + (7 * 24 * 60 * 60 * 1000));
    const msRemaining = trialEndDate - Date.now();

    return Math.max(0, Math.ceil(msRemaining / (24 * 60 * 60 * 1000)));
  }

  async regenerateApiKey(userId: string): Promise<string | undefined> {
    const newKey = `locust_${uuidv4().replace(/-/g, "")}`;
    const updated = await this.updateUser(userId, { apiKey: newKey });
    return updated?.apiKey;
  }

  async logError(error: {
    endpoint: string
    errorType: string
    message: string
    stack?: string
    fixSuggestion?: string
    timestamp: number
  }): Promise<void> {
    const supabase = await createClient();
    
    try {
      await supabase.from("error_logs").insert({
        endpoint: error.endpoint,
        error_type: error.errorType,
        message: error.message,
        stack: error.stack || null,
        fix_suggestion: error.fixSuggestion || null,
        created_at: new Date(error.timestamp).toISOString(),
      });
    } catch (err) {
      console.error('[DATABASE] Failed to log error:', err);
    }
  }
}

export const db = new Database();
