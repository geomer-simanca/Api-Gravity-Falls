require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

// 🔹 URL y clave secreta de tu proyecto Supabase

// 🔹 Crear el cliente de conexión
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)



module.exports = supabase