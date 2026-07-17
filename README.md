# chatIA

Asistente comercial reutilizable para atender, perfilar y dar seguimiento a prospectos mediante WhatsApp.

## Primer objetivo del MVP

1. Meta envía un mensaje entrante al webhook.
2. El servidor valida que la solicitud pertenece a Meta.
3. El sistema extrae el texto y el número del prospecto.
4. WhatsApp Cloud API envía una respuesta automática.

En esta primera versión la respuesta es fija. El siguiente paso será guardar la conversación y conectar el motor de IA.

## Requisitos

- Node.js 20 o superior.
- Una aplicación en Meta Developers con WhatsApp configurado.
- Un número de prueba o número empresarial agregado a WhatsApp Cloud API.

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

El servidor quedará disponible en `http://localhost:3000`.

## Variables necesarias

Edita `.env` y agrega:

- `WEBHOOK_VERIFY_TOKEN`: una frase privada elegida por nosotros; debe coincidir con la registrada en Meta.
- `WHATSAPP_ACCESS_TOKEN`: token de acceso de Cloud API.
- `WHATSAPP_PHONE_NUMBER_ID`: identificador del número configurado en Meta.
- `META_APP_SECRET`: secreto de la aplicación, usado para verificar la firma de los eventos.
- `META_GRAPH_API_VERSION`: versión activa mostrada en Meta Developers.

Nunca compartas el archivo `.env` ni subas sus valores a GitHub.

## Rutas

- `GET /`: comprueba que el servidor está encendido.
- `GET /webhook`: Meta utiliza esta ruta para verificar el webhook.
- `POST /webhook`: recibe eventos y mensajes de WhatsApp.

## Comprobaciones

```bash
npm run typecheck
npm test
npm run build
```

## Próximas etapas

- MongoDB: empresas, contactos, conversaciones y mensajes.
- Motor de IA con instrucciones diferentes para cada empresa.
- Perfilamiento y calificación de prospectos.
- Transferencia y notificaciones a asesores.
- Panel administrativo en React.
