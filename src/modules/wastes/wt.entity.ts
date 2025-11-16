/* Entity imports */
import { AbstractEntity } from "src/common/entities/abstract.entity";
import { DisposalPointEntity } from "../disposal-points/dp.entity";
/* Enum imports */
import { DbConstraintsEnum } from "src/common/enums/db-constraints.enum";
import { WasteEntityPropertiesDbNamesEnum } from "./enums/wt-entity-properties-db-names.enum";
import { WastesTypesEnum } from "./enums/wastes-types.enum";
/* Utils imports */
import { MessagesUtilsClass } from "src/common/utils/messages/messages-utils.class";
/* Other libraries imports */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
/* WasteEntity */
@Entity({ name: "Waste" })
export class WasteEntity extends AbstractEntity {
  @Column({
    name: WasteEntityPropertiesDbNamesEnum.DATETIME,
    type: "timestamp with time zone",
  })
  wtDatetime: string;
  @JoinColumn({
    name: WasteEntityPropertiesDbNamesEnum.DISPOSAL_POINT_ID,
    foreignKeyConstraintName: MessagesUtilsClass.generateDbConstraintsNames(
      DbConstraintsEnum.FK,
      [WasteEntityPropertiesDbNamesEnum.DISPOSAL_POINT_ID],
    ),
  })
  @ManyToOne(() => DisposalPointEntity)
  wtDpId: string;
  @PrimaryGeneratedColumn("uuid", {
    name: WasteEntityPropertiesDbNamesEnum.ID,
    primaryKeyConstraintName: MessagesUtilsClass.generateDbConstraintsNames(
      DbConstraintsEnum.PK,
      [WasteEntityPropertiesDbNamesEnum.ID],
    ),
  })
  wtId: string;
  @Column({
    enum: WastesTypesEnum,
    name: WasteEntityPropertiesDbNamesEnum.TYPE,
    type: "enum",
  })
  wtType: WastesTypesEnum;
  @Column({ name: WasteEntityPropertiesDbNamesEnum.USER_NAME })
  wtUserName: string;
}
