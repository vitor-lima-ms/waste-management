/* Entity imports */
import { UserEntity } from "src/modules/users/us.entity";
/* Enum imports */
import { AbstractEntityPropertiesDbNamesEnum } from "../enums/abstract-entity-properties-db-names.enum";
import { DbConstraintsEnum } from "../enums/db-constraints.enum";
import { UserEntityPropertiesDbNamesEnum } from "src/modules/users/enums/us-entity-properties-db-names.enum";
import { UserEntityPropertiesNamesEnum } from "src/modules/users/enums/us-entity-properties-names.enum";
/* Other libraries imports */
import {
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
/* Util imports */
import { MessagesUtilsClass } from "../utils/messages/messages-utils.class";
/* AbstractEntity */
export abstract class AbstractEntity {
  @CreateDateColumn({
    name: AbstractEntityPropertiesDbNamesEnum.CREATED_AT,
    type: "timestamp with time zone",
  })
  createdAt: string;
  @JoinColumn({
    name: AbstractEntityPropertiesDbNamesEnum.CREATED_BY_ID,
    foreignKeyConstraintName: MessagesUtilsClass.generateDbConstraintsNames(
      DbConstraintsEnum.FK,
      [
        UserEntityPropertiesDbNamesEnum.ID,
        AbstractEntityPropertiesDbNamesEnum.CREATED_BY_ID,
      ],
    ),
    referencedColumnName: UserEntityPropertiesNamesEnum.ID,
  })
  @ManyToOne(() => UserEntity, { nullable: true })
  createdById: string;
  @UpdateDateColumn({
    name: AbstractEntityPropertiesDbNamesEnum.UPDATED_AT,
    type: "timestamp with time zone",
  })
  updatedAt: string;
  @JoinColumn({
    name: AbstractEntityPropertiesDbNamesEnum.UPDATED_BY_ID,
    foreignKeyConstraintName: MessagesUtilsClass.generateDbConstraintsNames(
      DbConstraintsEnum.FK,
      [
        UserEntityPropertiesDbNamesEnum.ID,
        AbstractEntityPropertiesDbNamesEnum.UPDATED_BY_ID,
      ],
    ),
    referencedColumnName: UserEntityPropertiesNamesEnum.ID,
  })
  @ManyToOne(() => UserEntity, { nullable: true })
  updatedById: string;
}
