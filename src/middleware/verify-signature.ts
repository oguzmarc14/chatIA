import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";

export function verifyMetaSignature(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (!env.META_APP_SECRET) {
    if (env.NODE_ENV === "production") {
      response.status(500).json({ error: "META_APP_SECRET no está configurado" });
      return;
    }

    next();
    return;
  }

  const receivedSignature = request.header("x-hub-signature-256");

  if (!receivedSignature || !request.rawBody) {
    response.status(401).json({ error: "Firma de Meta ausente" });
    return;
  }

  const expectedSignature = `sha256=${createHmac("sha256", env.META_APP_SECRET)
    .update(request.rawBody)
    .digest("hex")}`;
  const receivedBuffer = Buffer.from(receivedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    receivedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(receivedBuffer, expectedBuffer)
  ) {
    response.status(401).json({ error: "Firma de Meta inválida" });
    return;
  }

  next();
}

