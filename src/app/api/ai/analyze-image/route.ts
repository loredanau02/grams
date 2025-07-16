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

    const formData = await request.formData()
    const image = formData.get('image') as File
    const description = formData.get('description') as string

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    const bytes = await image.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: image.type,
                  data: base64,
                },
              },
              {
                type: 'text',
                text: `Analyze this food image for recipe posting. Please evaluate:

1. Image quality (rate 0-100)
2. Visual appeal for social media
3. Lighting and composition
4. What food items you can identify
5. Any suggestions for improvement

${description ? `Recipe context: ${description}` : ''}

Respond in this JSON format:
{
  "quality": {
    "score": number (0-100),
    "suggestions": ["array of specific improvement suggestions if score < 80"]
  },
  "detectedItems": ["array of food items you can identify"],
  "description": "brief description of what you see",
  "visualAppeal": {
    "lighting": "good|fair|poor",
    "composition": "good|fair|poor", 
    "freshness": "good|fair|poor"
  }
}`
              }
            ],
          },
        ],
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', error)
      throw new Error('AI service error')
    }

    const data = await response.json()
    const analysis = JSON.parse(data.content[0].text)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Image analysis error:', error)
    return NextResponse.json(
      {
        quality: {
          score: 75,
          suggestions: []
        },
        detectedItems: [],
        description: "Unable to analyze image at this time",
        visualAppeal: {
          lighting: "fair",
          composition: "fair",
          freshness: "fair"
        }
      },
      { status: 200 }
    )
  }
}