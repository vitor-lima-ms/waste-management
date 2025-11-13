/* Decorator imports */
import { Roles } from "../decorators/roles.decorator";
/* Nest.js imports */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
/* Other libraries imports */
import { Request } from "express";
/* RolesGuard */
/*
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, ctx.getHandler());
    if (!roles) {
      return true;
    }
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req.user;
    return matchRoles(roles, user.roles);
  }
}
*/
