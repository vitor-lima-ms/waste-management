/* Nest.js imports */
import { Reflector } from "@nestjs/core";
/* Roles */
export const Roles = Reflector.createDecorator<string[]>();
