import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const AI_CHEF_PERSONAS = [
  {
    name: 'Nova',
    bio: '🤖 Neural Network Chef | Quantum Cuisine Expert | Nutritional Gastronomy',
    image: 'https://api.dicebear.com/7.x/futuristic-robots/svg?seed=nova',
    specialties: ['Molecular Gastronomy', 'Fusion'],
    style: 'innovative'
  },
  {
    name: 'Cypher Nakamura',
    bio: '⚡ Grandma in the Kitchen | Mastering Ramen | Tokyo Street Food since 1960',
    image: 'https://api.dicebear.com/7.x/futuristic-robots/svg?seed=cypher',
    specialties: ['Japanese', 'Street Food'],
    style: 'street'
  },
  {
    name: 'Echo Rossi',
    bio: '🌟 Pasta Artist | Traditional Meets AI | From Milano',
    image: 'https://api.dicebear.com/7.x/futuristic-robots/svg?seed=echo',
    specialties: ['Italian', 'Mediterranean'],
    style: 'traditional-modern'
  },
  {
    name: 'Pixel Kumar',
    bio: '🔥 Spice | Traditional indian cuisine | Dietolog',
    image: 'https://api.dicebear.com/7.x/futuristic-robots/svg?seed=pixel',
    specialties: ['Indian', 'Vegan'],
    style: 'spicy'
  },
  {
    name: 'Quantum Baptiste',
    bio: '🥐 Pastry Architect | Own a Bakery | French cuisine',
    image: 'https://api.dicebear.com/7.x/futuristic-robots/svg?seed=quantum',
    specialties: ['French', 'Pastry'],
    style: 'elegant'
  },
  {
    name: 'Neon Martinez',
    bio: '🌮 Homemade Tacos | From Mexico City',
    image: 'https://api.dicebear.com/7.x/futuristic-robots/svg?seed=neon',
    specialties: ['Mexican', 'Fusion'],
    style: 'vibrant'
  },
  {
    name: 'Synth Williams',
    bio: '🍖 BBQ every weekend | Southern Comfort',
    image: 'https://api.dicebear.com/7.x/futuristic-robots/svg?seed=synth',
    specialties: ['American', 'BBQ'],
    style: 'comfort'
  },
  {
    name: 'Aurora Kim',
    bio: '🥗 Nutritionist | Seoul Garden Lab | Traditional healthy Food',
    image: 'https://api.dicebear.com/7.x/futuristic-robots/svg?seed=aurora',
    specialties: ['Korean', 'Healthy'],
    style: 'health-conscious'
  }
]

const RECIPE_TEMPLATES: Record<string, any[]> = {
  innovative: [
    {
      title: 'Risotto',
      description: 'Italian cuisine Risotto with a futuristic twist',
      cookingTime: '55 minutes',
      difficulty: 'medium',
      servings: 4,
      ingredients: ['300g arborio rice', 'Mushrooms', 'Saffron', 'Butter', 'Parmesan cheese', 'Vegetable broth', 'Onion', 'Garlic'],
      instructions: ['Heat the broth in a separate pan', 'Sauté onion and garlic', 'Add rice and toast for 2 minutes', 'Add broth one ladle at a time', 'Stir in mushrooms and saffron', 'Finish with butter and parmesan'],
      techniques: ['sautéing', 'stirring'],
      aiTips: 'Try different spices to perfect the flavour over stirring.'
    }
  ],
  street: [
    {
      title: 'Ramen',
      description: 'Tokyo street ramen with toppings and broth',
      cookingTime: '3 hours',
      difficulty: 'medium',
      servings: 1,
      ingredients: ['Tonkotsu broth', 'Noodles', 'Soft-boiled egg', 'Scallions', 'Nori', 'Chashu pork'],
      instructions: ['Heat broth for 30 minutes', 'Cook noodles according to package', 'Prepare soft-boiled egg', 'Slice chashu pork', 'Assemble bowl with broth and noodles', 'Top with egg, pork, scallions, and nori'],
      techniques: ['boiling', 'simmering'],
      aiTips: 'This ramen recipe uses a rich tonkotsu broth that develops deep umami flavors through long cooking.'
    }
  ],
  'traditional-modern': [
    {
      title: 'Carbonara',
      description: 'Classic Roman dish with modern technique',
      cookingTime: '35 minutes',
      difficulty: 'medium',
      servings: 2,
      ingredients: ['200g spaghetti', '2 large eggs', '100g guanciale', '50g aged pecorino cheese', 'Black pepper', 'Salt'],
      instructions: ['Cook pasta in salted water', 'Crisp guanciale in pan', 'Whisk eggs with cheese and pepper', 'Combine hot pasta with guanciale', 'Remove from heat and add egg mixture', 'Toss quickly to create creamy sauce'],
      techniques: ['boiling', 'sautéing'],
      aiTips: 'The key is temperature control - the residual heat cooks the eggs without scrambling them.'
    }
  ],
  spicy: [
    {
      title: 'Chicken Vindaloo',
      description: 'Curry with a kick that will make you sweat',
      cookingTime: '1 hour 15 minutes',
      difficulty: 'hard',
      servings: 4,
      ingredients: ['1kg chicken thighs', 'Vindaloo paste', 'Coconut milk', 'Onions', 'Ginger', 'Garlic', 'Basmati rice'],
      instructions: ['Marinate chicken in spice paste', 'Brown chicken pieces', 'Sauté aromatics', 'Add coconut milk and simmer', 'Cook until tender', 'Serve with rice'],
      techniques: ['marinating', 'simmering'],
      aiTips: 'This dish balances heat with complex spice layers for an authentic Indian experience.'
    }
  ],
  elegant: [
    {
      title: 'Chocolate Soufflé',
      description: 'An elegant French soufflé that rises to perfection',
      cookingTime: '1 hour 5 minutes',
      difficulty: 'hard',
      servings: 4,
      ingredients: ['6 egg whites', '4 egg yolks', '200g dark chocolate', '50g butter', '50g sugar', 'Vanilla extract'],
      instructions: ['Melt chocolate with butter', 'Whisk egg yolks into chocolate', 'Beat egg whites to soft peaks', 'Fold whites into chocolate base', 'Bake at 190°C for 18-20 minutes', 'Serve immediately'],
      techniques: ['baking', 'whipping'],
      aiTips: 'The soufflé rises perfectly when the egg whites are whipped to the right consistency, creating a light and airy texture.'
    }
  ],
  vibrant: [
    {
      title: 'Street Tacos',
      description: 'Authentic Mexican street tacos with fresh ingredients',
      cookingTime: '40 minutes',
      difficulty: 'medium',
      servings: 4,
      ingredients: ['Corn tortillas', 'Carnitas or carne asada', 'White onion', 'Cilantro', 'Lime', 'Salsa verde', 'Queso fresco'],
      instructions: ['Warm tortillas on griddle', 'Heat your chosen meat', 'Dice onions finely', 'Chop cilantro', 'Assemble tacos with meat', 'Top with onion, cilantro, and cheese', 'Serve with lime and salsa'],
      techniques: ['grilling', 'chopping'],
      aiTips: 'The secret is in the balance of fresh ingredients and the quality of your tortillas.'
    }
  ],
  comfort: [
    {
      title: 'BBQ Ribs',
      description: 'Low and slow smoked ribs with homemade sauce',
      cookingTime: '4 hours 30 minutes',
      difficulty: 'medium',
      servings: 6,
      ingredients: ['2kg pork ribs', 'Brown sugar', 'Paprika', 'Garlic powder', 'BBQ sauce', 'Wood chips'],
      instructions: ['Apply dry rub to ribs', 'Smoke at 225°F for 3 hours', 'Wrap in foil with butter', 'Continue smoking for 1 hour', 'Unwrap and apply sauce', 'Finish for 30 minutes'],
      techniques: ['smoking', 'grilling'],
      aiTips: 'Low temperature smoking breaks down tough connective tissue for fall-off-the-bone tenderness.'
    }
  ],
  'health-conscious': [
    {
      title: 'Buddha Bowl',
      description: 'Nutritionally balanced bowl with colorful vegetables',
      cookingTime: '20 minutes',
      difficulty: 'easy',
      servings: 2,
      ingredients: ['Quinoa', 'Kale', 'Sweet potato', 'Avocado', 'Chickpeas', 'Tahini', 'Lemon', 'Seeds'],
      instructions: ['Cook quinoa until fluffy', 'Massage kale with lemon', 'Roast sweet potato cubes', 'Arrange ingredients in bowl', 'Drizzle with tahini dressing', 'Sprinkle with seeds'],
      techniques: ['roasting', 'preparing'],
      aiTips: 'This bowl provides complete proteins and a full spectrum of vitamins and minerals.'
    }
  ]
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

async function main() {
  console.log('Starting AI Chef seeding...')

  await prisma.recipe.deleteMany()
  await prisma.user.deleteMany()

  const hashedPassword = await bcrypt.hash('password123', 12)
  await prisma.user.create({
    data: {
      email: 'test@recipegram.com',
      username: 'testuser',
      name: 'Test User',
      hashedPassword,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=testuser',
      bio: 'Just testing the platform!'
    }
  })

  const aiChefs = []

  for (const persona of AI_CHEF_PERSONAS) {
    const hashedPassword = await bcrypt.hash('aiChef2025!', 12)
    
    const chef = await prisma.user.create({
      data: {
        email: `${persona.name.toLowerCase().replace(' ', '.')}@recipegram.ai`,
        username: persona.name.toLowerCase().replace(' ', '_'),
        name: persona.name,
        bio: persona.bio,
        image: persona.image,
        hashedPassword,
        isAI: true,
      }
    })
    
    aiChefs.push({ ...chef, ...persona })
  }

  console.log(`Created ${aiChefs.length} AI Chefs`)

  let totalRecipes = 0
  for (const chef of aiChefs) {
    const recipeCount = faker.number.int({ min: 3, max: 8 })
    const templates = RECIPE_TEMPLATES[chef.style] || RECIPE_TEMPLATES.innovative
    
    for (let i = 0; i < recipeCount; i++) {
      const template = templates[i % templates.length]
      
      const recipe = await prisma.recipe.create({
        data: {
          authorId: chef.id,
          title: template.title + (i > 0 ? ` ${i + 1}.0` : ''),
          description: template.description,
          imageUrl: `https://source.unsplash.com/800x600/?${template.techniques[0]},food`,
          cookingTime: template.cookingTime,
          difficulty: template.difficulty,
          cuisine: chef.specialties[0],
          servings: template.servings,
          dietary: faker.helpers.arrayElement([['vegan'], ['vegetarian'], ['gluten-free'], ['keto'], []]),
          techniques: template.techniques,
          ingredients: template.ingredients,
          instructions: template.instructions,
          aiTips: template.aiTips,
          culturalStory: null,
          createdAt: new Date(Date.now() - (totalRecipes * 1000 * 60 * 60 * 24)) // Stagger by days
        }
      })
      
      totalRecipes++
    }
  }

  console.log(`Created ${totalRecipes} AI-generated recipes`)
  console.log('AI Chef seeding completed!')
  console.log(`Summary: ${aiChefs.length} chefs, ${totalRecipes} recipes, 1 test user`)
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })