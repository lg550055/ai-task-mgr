const express = require('express');
const router = express.Router();
require('dotenv').config();

// OpenAI integration
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Fallback suggestions in case OpenAI API fails
const fallbackSuggestions = [
  {
    name: 'Review weekly goals',
    description: 'Evaluate what you accomplished this week and plan next steps',
    due_date: new Date().toISOString().split('T')[0]
  },
  {
    name: 'Clean up email inbox',
    description: 'Archive or delete unnecessary emails',
    due_date: new Date().toISOString().split('T')[0]
  },
];

router.post('/suggest', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that suggests tasks a user might want to add to a to-do list.' },
        { role: 'user', content: 'Suggest 2 useful tasks for today.' },
      ],
    });

    const suggestions = completion.choices[0].message.content
      .split(/\n|\*/)
      .map(t => t.trim())
      .filter(Boolean)
      .map(line => {
        const match = line.match(/^(\d+\.\s*)?(.*)/);
        return { name: match?.[2] || line };
      });

    res.json(suggestions);
  } catch (err) {
    console.error('OpenAI Error:', err);
    // Fall back to static suggestions
    res.status(200).json(fallbackSuggestions);
  }
});

module.exports = router;