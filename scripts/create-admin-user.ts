/**
 * One-time script to create admin user in Supabase
 * 
 * To run this script:
 * 1. Get your Supabase Service Role Key from: Dashboard > Settings > API > service_role key
 * 2. Create a temporary .env.setup file with: SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
 * 3. Run: npx tsx scripts/create-admin-user.ts
 * 
 * OR use the Supabase Dashboard method (recommended - see README-ADMIN-SETUP.md)
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zfmazqvccebisimswtez.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!serviceRoleKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY not found in environment variables')
  console.log('\n📝 To create the admin user:')
  console.log('1. Go to your Supabase Dashboard: https://supabase.com/dashboard')
  console.log('2. Select your project')
  console.log('3. Go to Authentication > Users')
  console.log('4. Click "Add User" or "Invite User"')
  console.log('5. Enter:')
  console.log('   Email: sankalpa@gmail.com')
  console.log('   Password: Sajan@sankalpa123')
  console.log('6. Click "Create User"')
  process.exit(1)
}

// Create admin client with service role key (has admin privileges)
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createAdminUser() {
  console.log('🚀 Creating admin user...')
  console.log('📧 Email: sankalpa@gmail.com')

  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: 'sankalpa@gmail.com',
      password: 'Sajan@sankalpa123',
      email_confirm: true, // Auto-confirm email
    })

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('✅ User already exists!')
        console.log('   You can use this account to login at /admin/login')
        return
      }
      throw error
    }

    if (data.user) {
      console.log('✅ Admin user created successfully!')
      console.log('   User ID:', data.user.id)
      console.log('   Email:', data.user.email)
      console.log('\n🎉 You can now login at: http://localhost:3000/admin/login')
      console.log('   Email: sankalpa@gmail.com')
      console.log('   Password: Sajan@sankalpa123')
    }
  } catch (error: any) {
    console.error('❌ Error creating user:', error.message)
    console.log('\n💡 Alternative: Create user via Supabase Dashboard')
    console.log('   1. Go to: https://supabase.com/dashboard/project/zfmazqvccebisimswtez/auth/users')
    console.log('   2. Click "Add User"')
    console.log('   3. Enter email and password')
    process.exit(1)
  }
}

createAdminUser()

