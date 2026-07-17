import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  process.env.WEBHOOK_VERIFY_TOKEN = "token-de-prueba";
  process.env.WHATSAPP_ACCESS_TOKEN = "access-token-de-prueba";
  process.env.META_GRAPH_API_VERSION = "v23.0";
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("WhatsApp webhook", () => {
  it("responde el challenge cuando Meta envía el token correcto", async () => {
    const { app } = await import("../src/app.js");

    const response = await request(app).get("/webhook").query({
      "hub.mode": "subscribe",
      "hub.verify_token": "token-de-prueba",
      "hub.challenge": "123456",
    });

    expect(response.status).toBe(200);
    expect(response.text).toBe("123456");
  });

  it("rechaza la verificación si el token no coincide", async () => {
    const { app } = await import("../src/app.js");

    const response = await request(app).get("/webhook").query({
      "hub.mode": "subscribe",
      "hub.verify_token": "token-incorrecto",
      "hub.challenge": "123456",
    });

    expect(response.status).toBe(403);
  });

  it("recibe un texto y responde mediante Cloud API", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ messages: [{ id: "wamid.respuesta" }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const { app } = await import("../src/app.js");
    const response = await request(app)
      .post("/webhook")
      .send({
        object: "whatsapp_business_account",
        entry: [
          {
            changes: [
              {
                field: "messages",
                value: {
                  metadata: { phone_number_id: "123456789" },
                  messages: [
                    {
                      id: "wamid.mensaje",
                      from: "521234567890",
                      type: "text",
                      text: { body: "Hola" },
                    },
                  ],
                },
              },
            ],
          },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body.processedMessages).toBe(1);
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      "https://graph.facebook.com/v23.0/123456789/messages",
    );
  });
});

