import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

interface EmailRequest {
  email: string;
  tempPassword: string;
  fullName: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Welcome email function called')
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, tempPassword, fullName }: EmailRequest = await req.json()
    console.log('Received request for:', { email, fullName })

    // Create Supabase client with service role key
    const supabase = createClient(
      SUPABASE_URL!,
      SUPABASE_SERVICE_ROLE_KEY!
    )

    // Create user with temporary password
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: tempPassword,
      email_confirm: true
    })

    if (authError) {
      console.error('Error creating user:', authError)
      throw new Error(authError.message)
    }

    console.log('User created successfully:', authData)

    // Send welcome email with temporary password
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'PWA Burton <onboarding@resend.dev>',
        to: [email],
        subject: 'Welcome to PWA Burton - Your Temporary Password',
        html: `
          <h1>Welcome to PWA Burton, ${fullName}!</h1>
          <p>Your account has been created successfully. Here are your login credentials:</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Temporary Password:</strong> ${tempPassword}</p>
          <p>For security reasons, please change your password after your first login.</p>
          <p>Best regards,<br>PWA Burton Team</p>
        `,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('Error sending email:', error)
      throw new Error('Failed to send welcome email')
    }

    const data = await res.json()
    console.log('Email sent successfully:', data)

    return new Response(JSON.stringify({ message: 'Welcome email sent successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error in send-welcome-email function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}

serve(handler)