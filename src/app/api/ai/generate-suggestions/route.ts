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

    const { recipe } = await request.json()
    
    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe data required' },
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
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: `You are a professional chef assistant. Generate cooking tips and suggestions for this recipe:
            
            Title: ${recipe.title}
            Description: ${recipe.description}
            Cuisine: ${recipe.cuisine}
            Difficulty: ${recipe.difficulty}
            
            Provide practical tips in JSON format with this structure:
            {
              "tips": [3-4 specific cooking tips],
              "substitutions": [
                {
                  "ingredient": "original ingredient",
                  "substitute": "alternative",
                  "notes": "brief note about the substitution"
                }
              ],
              "pairings": [2-3 dishes or drinks that pair well]
            }
            
            Keep tips concise and practical. Focus on technique, temperature control, and common mistakes to avoid.`
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
    const suggestions = JSON.parse(data.content[0].text)

    return NextResponse.json(suggestions)
  } catch (error) {
    console.error('AI suggestions error:', error)
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    )
  }
}