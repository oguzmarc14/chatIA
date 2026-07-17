import { Router } from "express";

export const legalRouter = Router();

const styles = `
  body{font-family:Arial,sans-serif;line-height:1.65;color:#1f2937;max-width:860px;margin:0 auto;padding:32px 20px}
  h1,h2{color:#111827}h1{font-size:2rem}h2{margin-top:2rem;font-size:1.25rem}
  a{color:#2563eb}li{margin:.45rem 0}.muted{color:#6b7280}
`;

function page(title: string, content: string): string {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | ChatIA</title><style>${styles}</style></head><body><main>${content}</main></body></html>`;
}

legalRouter.get("/privacy", (_request, response) => {
  response.type("html").send(page("Política de privacidad", `
    <h1>Política de privacidad de ChatIA</h1>
    <p class="muted">Última actualización: 17 de julio de 2026</p>
    <p>Marco Webs Studio opera ChatIA, una solución de atención y perfilamiento comercial mediante WhatsApp. Esta política explica cómo tratamos la información cuando una persona conversa con un negocio que utiliza ChatIA.</p>
    <h2>Información que podemos tratar</h2>
    <ul><li>Nombre, número de WhatsApp e identificadores técnicos proporcionados por WhatsApp Business Platform.</li><li>Mensajes, solicitudes y archivos que la persona envía voluntariamente al negocio.</li><li>Preferencias comerciales, productos o servicios de interés, presupuesto, zona, forma de pago y otra información compartida durante la conversación.</li><li>Resúmenes, clasificaciones y estados de seguimiento generados para ayudar al negocio a atender al prospecto.</li><li>Datos técnicos necesarios para seguridad, diagnóstico y funcionamiento del servicio.</li></ul>
    <h2>Finalidades</h2>
    <p>Utilizamos la información para responder mensajes, proporcionar información solicitada, perfilar necesidades comerciales, dar seguimiento, transferir la conversación a un asesor, mantener la seguridad y mejorar el funcionamiento de ChatIA.</p>
    <h2>Responsabilidad de cada negocio</h2>
    <p>El negocio con el que conversa la persona es responsable de sus propios productos, servicios y decisiones comerciales. Marco Webs Studio procesa información para prestar la tecnología contratada y siguiendo la configuración autorizada por dicho negocio.</p>
    <h2>Proveedores y divulgación</h2>
    <p>Podemos utilizar proveedores de infraestructura, mensajería e inteligencia artificial, incluidos Meta WhatsApp Business Platform y servicios de alojamiento. Solo compartimos la información necesaria para operar ChatIA, cumplir obligaciones legales, proteger la seguridad o atender instrucciones del negocio correspondiente. No vendemos datos personales.</p>
    <h2>Conservación y seguridad</h2>
    <p>Conservamos la información durante el tiempo necesario para prestar el servicio, cumplir obligaciones legales o atender las instrucciones del negocio. Aplicamos medidas técnicas y organizativas razonables, aunque ningún sistema ofrece seguridad absoluta.</p>
    <h2>Derechos y eliminación</h2>
    <p>Las personas pueden solicitar acceso, corrección o eliminación de sus datos escribiendo a <a href="mailto:oguzmarc14@gmail.com">oguzmarc14@gmail.com</a>. También pueden consultar nuestras <a href="/data-deletion">instrucciones de eliminación de datos</a>.</p>
    <h2>Menores de edad y cambios</h2>
    <p>ChatIA no está dirigido intencionalmente a menores de edad. Podemos actualizar esta política y publicaremos aquí la fecha de la versión vigente.</p>
    <h2>Contacto</h2><p>Marco Webs Studio<br><a href="mailto:oguzmarc14@gmail.com">oguzmarc14@gmail.com</a></p>
  `));
});

legalRouter.get("/data-deletion", (_request, response) => {
  response.type("html").send(page("Eliminación de datos", `
    <h1>Solicitud de eliminación de datos</h1>
    <p>Para solicitar la eliminación de información tratada por ChatIA, envía un correo a <a href="mailto:oguzmarc14@gmail.com?subject=Solicitud%20de%20eliminación%20de%20datos%20ChatIA">oguzmarc14@gmail.com</a> con el asunto <strong>Solicitud de eliminación de datos ChatIA</strong>.</p>
    <h2>Incluye en la solicitud</h2>
    <ul><li>Nombre completo.</li><li>Número de WhatsApp con código de país.</li><li>Nombre del negocio con el que conversaste.</li><li>Descripción breve de la información que deseas eliminar.</li></ul>
    <p>Podremos solicitar información adicional únicamente para verificar la identidad y evitar eliminaciones no autorizadas. Confirmaremos la recepción y atenderemos la solicitud dentro del plazo legal aplicable, salvo información que debamos conservar por obligación legal o para prevenir fraude y abuso.</p>
    <p><a href="/privacy">Consultar la política de privacidad</a></p>
  `));
});

legalRouter.get("/terms", (_request, response) => {
  response.type("html").send(page("Condiciones del servicio", `
    <h1>Condiciones del servicio de ChatIA</h1>
    <p class="muted">Última actualización: 17 de julio de 2026</p>
    <p>ChatIA es una herramienta tecnológica de Marco Webs Studio que ayuda a negocios a atender y perfilar conversaciones comerciales mediante WhatsApp.</p>
    <h2>Uso del servicio</h2><p>Las personas deben utilizar el servicio de forma lícita y no enviar contenido fraudulento, abusivo, malicioso o que vulnere derechos de terceros. Las respuestas automáticas son informativas y pueden requerir confirmación de un asesor humano.</p>
    <h2>Productos y decisiones comerciales</h2><p>Cada negocio es responsable de sus productos, precios, disponibilidad, promociones, asesoría y acuerdos con sus clientes. Marco Webs Studio no es parte de las operaciones comerciales celebradas entre el negocio y sus clientes.</p>
    <h2>Disponibilidad y cambios</h2><p>Podemos realizar mantenimiento, mejoras o cambios razonables en ChatIA. El servicio también depende de proveedores externos, incluida WhatsApp Business Platform.</p>
    <h2>Privacidad y contacto</h2><p>El tratamiento de información se describe en nuestra <a href="/privacy">Política de privacidad</a>. Para consultas escribe a <a href="mailto:oguzmarc14@gmail.com">oguzmarc14@gmail.com</a>.</p>
  `));
});
