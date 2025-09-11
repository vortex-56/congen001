// pages/api/contact.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { nombre, telefono, email, mensaje } = req.body;

  // Validación básica
  if (!nombre || !email || !telefono) {
    return res.status(400).json({ message: 'Faltan campos requeridos.' });
  }

  // Formatear el mensaje para WhatsApp
  const textoMensaje = `*Nuevo mensaje del sitio web* 📩
-----------------------------
*Nombre:* ${nombre}
*Email:* ${email}
*Teléfono:* ${telefono}
*Mensaje:* ${mensaje || 'Sin mensaje'}
-----------------------------`;

  const numeroWsp = '51914109040'; // Número sin el '+'
  const urlWhatsApp = `https://wa.me/${numeroWsp}?text=${encodeURIComponent(textoMensaje)}`;

  // Devolver la URL de WhatsApp para que el frontend la abra
  return res.status(200).json({ 
    message: 'URL de WhatsApp generada', 
    whatsappUrl: urlWhatsApp 
  });
}
