require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const LTI = require('ims-lti');


const axios = require('axios'); // NEW



const app = express();
// LTI launch requests are URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json()); // NEW

// --- CONFIGURATION ---
// In a real application, you would pull these from a secure datastore
// based on the oauth_consumer_key sent in the request.
const consumer_key = 'AUTOLTI';
const consumer_secret = '123456';

const openai_api_key = process.env.OPENAI_API_KEY; // NEW 

// This is the URL of your main frontend application.
// For local testing, it might be running on a different port.
// For production, this would be your Vercel/Netlify URL.
const FRONTEND_APP_URL = 'http://localhost:5173'; // <-- IMPORTANT: CHANGE THIS TO YOUR FRONTEND'S URL

// --- THE LTI LAUNCH ROUTE (THE "BOUNCER") ---
app.post('/launch', (req, res) => {
  // 1. Create a provider object with the key and secret
  // The LTI library will use this to validate the signature.
  const provider = new LTI.Provider(consumer_key, consumer_secret);

  console.log('Received LTI launch request...');
  
  // 2. Validate the request
  provider.valid_request(req, (err, isValid) => {
    if (err || !isValid) {
      console.error('LTI signature validation failed:', err);
      return res.status(401).send('LTI signature validation failed. Please check your key and secret.');
    }

    // 3. HANDSHAKE SUCCESSFUL! The request is authentic.
    console.log('LTI Handshake successful!');
    
    // The validated LTI data is now available in `provider.body`
    // or often attached as `req.lti.body`. We can trust this data.
    const ltiData = provider.body;
    console.log('Validated LTI Data:', ltiData);

    // 4. Prepare the user data to be sent to the frontend.
    // We will encode it as a Base64 string to make it URL-safe.
    const userData = {
      userId: ltiData.user_id,
      fullName: ltiData.lis_person_name_full || ltiData.user_id,
      roles: ltiData.roles,
      courseId: ltiData.context_id
    };
    const userDataBuffer = Buffer.from(JSON.stringify(userData));
    const token = userDataBuffer.toString('base64');

    // 5. Redirect the user's browser to your frontend app,
    //    passing the user data as a token in the URL hash.
    const redirectUrl = `${FRONTEND_APP_URL}/#lti_token=${token}`;
    
    console.log(`Redirecting to: ${redirectUrl}`);
    res.redirect(redirectUrl);
  });
});

// NEW (BELOW)
app.post('/api/chat', async (req, res) => {
  console.log('Received request for AI chat (OpenAI)...');

  // CHANGED: Check for the OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not configured on the server.');
    return res.status(500).json({ error: 'AI service is not configured on the server.' });
  }

  const { model, systemPrompt, messages, temperature, maxTokens } = req.body;

  if (!messages || messages.length === 0) {
    return res.status(400).json({ error: 'No messages provided.' });
  }

  // CHANGED: Reformat the payload for OpenAI's API
  // OpenAI expects the system prompt as the first message in the `messages` array.
  const openAI_messages = [
    { role: 'system', content: systemPrompt },
    ...messages
  ];

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: model,
      messages: openAI_messages, // Use the reformatted messages array
      temperature: temperature,
      max_tokens: maxTokens,
    }, {
      headers: {
        // CHANGED: OpenAI uses a Bearer token for authorization
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // CHANGED: The response structure from OpenAI is different
    const reply = response.data.choices[0].message.content;
    
    // We keep our own response structure consistent for the frontend
    res.json({ reply: reply });

  } catch (error) {
    const errorMsg = error.response ? error.response.data : error.message;
    console.error('Error calling OpenAI API:', errorMsg);
    res.status(500).json({ error: 'Failed to get response from OpenAI.', details: errorMsg });
  }
});

// NEW (ABOVE)


// --- Server Setup ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`LTI Bouncer backend is running on http://localhost:${PORT}`);
  console.log(`Configure your LMS simulator to POST to http://localhost:${PORT}/launch`);
});