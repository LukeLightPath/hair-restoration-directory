import { NextRequest, NextResponse } from 'next/server'

/**
 * Analytics endpoint — temporarily disabled to reduce Disk IO on Nano instance.
 * Returns success without writing to the database.
 * Re-enable when upgrading compute or moving to external analytics.
 */
export async function POST(request: NextRequest) {
  return NextResponse.json({ success: true, skipped: 'disabled' })
}
