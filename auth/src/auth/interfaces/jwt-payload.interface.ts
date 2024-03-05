export interface JwtPayload {
  email?: string;
  id: string;
  iat?: number;
  exp?: number;
}
