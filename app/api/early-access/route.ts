import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('early_access_emails')
      .insert({ email: email.toLowerCase().trim() })

    if (error) {
      // Unique constraint = already subscribed — treat as success
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Already subscribed!' })
      }
      console.error('early-access insert error:', error)
      return NextResponse.json({ error: 'Could not save email' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Subscribed!' })
  } catch (error) {
    console.error('early-access route error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
