import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get current user from Supabase auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Fetch user's API key from database
    const { data: userData, error: dbError } = await supabase
      .from("users")
      .select("api_key, has_locust_subscription, trial_start_date, trial_expired")
      .eq("email", user.email)
      .single()

    if (dbError || !userData) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      apiKey: userData.api_key,
      hasLocustSubscription: userData.has_locust_subscription,
      trialStartDate: userData.trial_start_date,
      trialExpired: userData.trial_expired
    })
  } catch (error) {
    console.error("[v0] Error fetching API key:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
