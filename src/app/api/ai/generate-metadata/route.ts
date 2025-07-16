import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const anthropicKey = process.env.ANTHROPIC_API_KEY
    if (!anthropicKey) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      )
    }

    const { title, description, imageAnalysis } = await request.json()
    
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 400,
        messages: [
          {
            role: 'user',
            content: `Analyze this recipe and generate metadata:
            Title: ${title}
            Description: ${description}
            
            ${imageAnalysis ? `Detected ingredients: ${imageAnalysis.detectedItems.join(', ')}` : ''}

        Generate metadata in this exact JSON format:
    {
      "title": "${title}",
      "cuisine": "specific cuisine type (e.g., Italian, Mexican, Thai)",
      "difficulty": "easy|medium|hard",
      "cookingTime": "X minutes/hours",
      "servings": number,
      "dietary": ["array of applicable tags like Vegetarian, Vegan, Gluten-Free, etc"],
      "techniques": ["array of cooking techniques used"]
    }
      Be specific and accurate based on the recipe description.`
          }
        ]
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', error)
      throw new Error('AI service error')
    }

    const data = await response.json()
    const metadata = JSON.parse(data.content[0].text)

    return NextResponse.json(metadata)
  } catch (error) {
    console.error('Metadata generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate metadata' },
      { status: 500 }
    )
  }
}