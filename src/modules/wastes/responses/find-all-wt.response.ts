/* Entity imports */
import { DisposalPointEntity } from "src/modules/disposal-points/dp.entity";
import { WasteEntity } from "../wt.entity";
/* Enum imports */
import { DisposalPointEntityPropertiesNamesEnum } from "src/modules/disposal-points/enums/dp-entity-properties-names.enum";
import { WasteEntityPropertiesNamesEnum } from "../enums/wt-entity-properties-names.enum";
/* Nest.js imports */
import { IntersectionType, PickType } from "@nestjs/swagger";
/* FindAllWastesResponse */
export class FindAllWastesResponse extends PickType(
  IntersectionType(DisposalPointEntity, WasteEntity),
  [
    DisposalPointEntityPropertiesNamesEnum.LOCALITY_NAME,
    WasteEntityPropertiesNamesEnum.DATETIME,
    WasteEntityPropertiesNamesEnum.DISPOSAL_POINT_ID,
    WasteEntityPropertiesNamesEnum.ID,
    WasteEntityPropertiesNamesEnum.TYPE,
    WasteEntityPropertiesNamesEnum.USER_NAME,
  ] as const,
) {}
