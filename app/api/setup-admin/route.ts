import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ 
        error: 'Missing Supabase credentials' 
      }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if admin already exists
    const { data: existing } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'founder@xodevelopment.com')
      .single()

    if (existing) {
      return NextResponse.json({ 
        message: 'Admin user already exists',
        api_key: existing.api_key 
      })
    }

    // Create admin user with current schema
    const adminUser = {
      id: crypto.randomUUID(),
      email: 'founder@xodevelopment.com',
      username: 'founder',
      password: 'hashed_password_placeholder',
      api_key: 'locust_founder_admin_key',
      trial_start_date: Date.now(),
      trial_expired: false,
      has_locust_subscription: true,
      is_admin: true,
      verified: true,
      created_at: Date.now()
    }

    const { data, error } = await supabase
      .from('users')
      .insert(adminUser)
      .select()
      .single()

    if (error) {
      console.error('[v0] Error creating admin:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      message: 'Admin user created successfully',
      api_key: 'locust_founder_admin_key',
      user: data
    })

  } catch (error: any) {
    console.error('[v0] Setup admin error:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to setup admin' 
    }, { status: 500 })
  }
}
