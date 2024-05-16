import { Request } from 'express';

export const extractTokenFromHeader = (
  request: Request,
): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};

export const requestInfoParser = (req) => {
  const method = req.method;
  const url = req.url;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const token = extractTokenFromHeader(req);

  return {
    method,
    url,
    ip,
    token,
  };
};
