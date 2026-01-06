import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'AEO.dev API',
    version: '1.0.0',
    documentation: 'https://aeo.dev',
  })
}

