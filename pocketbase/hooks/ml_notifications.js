routerAdd('POST', '/backend/v1/mercadolivre/webhook', (e) => {
  // Retrieve Mercado Livre credentials securely from the Secrets Manager
  const clientId = $secrets.get('ML_CLIENT_ID')
  const clientSecret = $secrets.get('ML_CLIENT_SECRET')

  // Parse the standard Mercado Livre notification JSON payload
  const payload = e.requestInfo().body || {}
  const resource = payload.resource
  const userId = payload.user_id
  const topic = payload.topic

  // Log the payload to process the notification (e.g., calling ML API or saving to DB)
  console.log(
    'Mercado Livre Webhook Received:',
    JSON.stringify({
      topic,
      resource,
      user_id: userId,
      credentialsConfigured: !!clientId && !!clientSecret,
    }),
  )

  // Return an HTTP 200 status code to acknowledge the successful delivery to Mercado Livre
  return e.json(200, { message: 'Webhook processed successfully' })
})
