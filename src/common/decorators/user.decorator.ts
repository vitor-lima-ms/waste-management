/* Nest.js imports */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
/* User */
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
