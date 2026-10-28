import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get('authorization')
    if (process.env.SANITY_REVALIDATE_SECRET && secret !== `Bearer ${process.env.SANITY_REVALIDATE_SECRET}`) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    const body = await req.json()
    const slug = body?.slug?.current

    // Revalidate home page and project page
    revalidatePath('/')
    if (slug) {
      revalidatePath(`/projects/${slug}`)
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
