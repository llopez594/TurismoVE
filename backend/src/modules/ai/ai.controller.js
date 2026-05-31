import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `Eres TurismoVE Assistant, un asistente turístico especializado en Venezuela.
Tu rol es ayudar a los usuarios de la plataforma TurismoVE Explorer a:
- Descubrir destinos turísticos en Venezuela.
- Encontrar alojamientos, posadas, cabañas y hoteles.
- Conocer experiencias y actividades turísticas disponibles.
- Obtener recomendaciones según sus preferencias (playa, montaña, ciudad, aventura, cultura, gastronomía).
- Resolver dudas sobre cómo usar la plataforma.

Responde siempre en español, de forma amable, concisa y útil.
Si el usuario pregunta algo fuera del contexto de turismo en Venezuela o de la plataforma TurismoVE, 
redirige amablemente la conversación hacia esos temas.
No inventes información específica de precios o disponibilidad. 
Sugiere que el usuario explore la plataforma para ver información actualizada.`;

export async function chat(req, res) {
    const { message } = req.body;

    if (!message || !message.trim()) {
        return res.status(400).json({
            message: "El mensaje es obligatorio."
        });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: message.trim()
                }
            ],
            max_tokens: 400,
            temperature: 0.7
        });

        const reply = completion.choices[0].message.content;

        return res.status(200).json({
            reply
        });
    } catch (error) {
        console.error("OpenAI error:", error.message);

        // Si la key no está configurada
        if (error.code === "invalid_api_key" || error.status === 401) {
            return res.status(500).json({
                message: "El servicio de IA no está configurado correctamente."
            });
        }

        // Si se agotaron los créditos
        if (error.status === 429) {
            return res.status(429).json({
                message: "El servicio de IA está temporalmente no disponible. Intenta más tarde."
            });
        }

        return res.status(500).json({
            message: "Error al procesar la consulta.",
            error: error.message
        });
    }
}
