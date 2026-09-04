export default function handler(req,res){
  const present=(name)=>Boolean(process.env[name]);
  res.setHeader('Cache-Control','no-store');
  return res.status(200).json({
    stripeSecretKey:present('STRIPE_SECRET_KEY'),
    resendApiKey:present('RESEND_API_KEY'),
    supabaseUrl:present('SUPABASE_URL'),
    supabaseServiceRole:present('SUPABASE_SERVICE_ROLE_KEY'),
    checkedAt:new Date().toISOString()
  });
}
