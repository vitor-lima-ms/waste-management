/* Entity imports */
import { WasteEntity } from "../wt.entity";
/* Enum imports */
import { WasteEntityPropertiesNamesEnum } from "../enums/wt-entity-properties-names.enum";
/* Nest.js imports */
import { PickType } from "@nestjs/swagger";
/* FindAllWastesWithoutInnerJoinWithDpResponse */
export class FindAllWastesWithoutInnerJoinWithDpResponse extends PickType(
  WasteEntity,
  [
    WasteEntityPropertiesNamesEnum.DATETIME,
    WasteEntityPropertiesNamesEnum.DISPOSAL_POINT_ID,
    WasteEntityPropertiesNamesEnum.ID,
    WasteEntityPropertiesNamesEnum.TYPE,
    WasteEntityPropertiesNamesEnum.USER_NAME,
  ] as const,
) {}
