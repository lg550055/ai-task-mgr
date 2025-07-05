const express = require('express');
const router = express.Router();

// OpenAI integration
const OpenAI = require('openai');
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// Fallback suggestions in case OpenAI API fails
const fallbackSuggestions = [
  { name: 'Review weekly goals', description: 'Evaluate what you accomplished this week and plan next steps.' },
  { name: 'Clean up email inbox', description: 'Archive or delete unnecessary emails.' },
];

router.post('/suggest', async (req, res) => {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that generates 2 practical tasks a user might want to add to a to-do list.' },
        { role: 'user', content: 'Suggest 2 useful tasks for today.' },
      ],
    });

    const suggestions = completion.data.choices[0].message.content
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