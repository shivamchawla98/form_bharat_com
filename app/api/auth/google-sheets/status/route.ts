import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET — check whether the current user has Google connected
export async function GET(request: NextRequest) {
  const user = await verifyAuth(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { googleRefreshToken: true },
  })

  return NextResponse.json({ connected: !!dbUser?.googleRefreshToken })
}
