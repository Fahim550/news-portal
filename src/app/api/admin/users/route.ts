import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {
    // 1. Verify the current user is an admin
    const supabaseServer = await createClient()
    const { data: { user }, error: authError } = await supabaseServer.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify role (assuming admin or super admin can create users)
    const { data: profile } = await supabaseServer
      .from("profiles")
      .select("roles(name)")
      .eq("id", user.id)
      .single<any>()

    const roleName = profile?.roles?.name
    if (roleName !== "Super Admin" && roleName !== "Admin") {
      return NextResponse.json({ error: "Forbidden: Only admins can create users." }, { status: 403 })
    }

    const body = await req.json()
    const { email, password, firstName, lastName, roleId } = body

    if (!email || !password || !firstName || !lastName || !roleId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // 2. Create the auth user using the admin client
    let adminClient;
    try {
      adminClient = createAdminClient()
    } catch (e: any) {
      return NextResponse.json({ error: "Server misconfiguration: " + e.message }, { status: 500 })
    }

    const { data: authData, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto confirm email since it's created by admin
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
      }
    })

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    // 3. Update the profile with role and name
    // (A trigger in supabase might have already created a profile, so we use upsert or update)
    // Actually, looking at the schema, there's no trigger for creating a profile automatically.
    // So we need to create it.
    
    const { error: profileError } = await adminClient
      .from("profiles")
      .upsert({
        id: authData.user.id,
        first_name: firstName,
        last_name: lastName,
        role_id: roleId,
        updated_at: new Date().toISOString(),
      })

    if (profileError) {
      // Rollback auth user creation if profile fails
      await adminClient.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json({ error: "Failed to create user profile: " + profileError.message }, { status: 500 })
    }

    return NextResponse.json({ user: authData.user, message: "User created successfully" }, { status: 201 })
  } catch (error: any) {
    console.error("User creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
