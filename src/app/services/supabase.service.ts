import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public client: SupabaseClient;
  private supabaseUrl = 'https://pgfxwluwmdbfgzdfzreu.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZnh3bHV3bWRiZmd6ZGZ6cmV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMTkwMjUsImV4cCI6MjEwNjg5NTAyNX0.82Y7MfAFuII0P8d3svR6iBQk2C5IxKs140zVjaKzeds';

  constructor() {
    this.client = createClient(this.supabaseUrl, this.supabaseKey);
  }
}