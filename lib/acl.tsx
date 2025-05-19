// lib/acl.ts
export type Role = 'CLIENT' | 'PROVIDER' | 'ADMIN';

export const routeAccess: Record<string, Role[]> = {
  '/profile': ['CLIENT', 'PROVIDER'],
  '/services/new': ['CLIENT' ,'PROVIDER'],
  '/services/mine': ['CLIENT' ,'PROVIDER'],
  '/services': ['CLIENT', 'PROVIDER', 'ADMIN'], // liste publique
  '/bookings/client': ['CLIENT', 'PROVIDER'],
  '/bookings/provider': ['CLIENT','PROVIDER'],
  '/bookings/new': ['CLIENT', 'PROVIDER'],
  '/admin': ['ADMIN'],

};
