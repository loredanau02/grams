import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const image = formData.get('image') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const metadataString = formData.get('metadata') as string

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    let metadata
    try {
      metadata = JSON.parse(metadataString || '{}')
    } catch {
      metadata = {}
    }

    const imageUrl = image ? '/placeholder-recipe.jpg' : 'https://source.unsplash.com/800x600/?food,recipe'

    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        imageUrl,
        cookingTime: metadata.cookingTime || '30 minutes',
        difficulty: metadata.difficulty || 'medium',
        cuisine: metadata.cuisine || 'International',
        servings: metadata.servings || 4,
        dietary: metadata.dietary || [],
        techniques: metadata.techniques || [],
        ingredients: metadata.ingredients || [],
        instructions: metadata.instructions || [],
        authorId: session.user.id,
        aiTips: metadata.aiTips || null,
        culturalStory: metadata.culturalStory || null
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
            bio: true
          }
        }
      }
    })

    return NextResponse.json({
      data: recipe,
      success: true
    })
  } catch (error) {
    console.error('Failed to create recipe:', error)
    return NextResponse.json(
      { error: 'Failed to create recipe', success: false },
      { status: 500 }
    )
  }
}