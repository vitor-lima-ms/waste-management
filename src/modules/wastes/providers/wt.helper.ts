/* DTO imports */
import { FilterWastesDto } from "../dtos/filter-wt.dto";
/* Entity imports */
import { DisposalPointEntity } from "src/modules/disposal-points/dp.entity";
/* Enum imports */
import { EntitiesAliasesEnum } from "src/common/enums/entities-aliases.enum";
import { DisposalPointEntityPropertiesDbNamesEnum } from "src/modules/disposal-points/enums/dp-entity-properties-db-names.enum";
import { DisposalPointEntityPropertiesNamesEnum } from "src/modules/disposal-points/enums/dp-entity-properties-names.enum";
import { SqlDataTypesEnum } from "src/modules/common/utils/db/enums/sql-data-types.enum";
import { WasteEntityPropertiesDbNamesEnum } from "../enums/wt-entity-properties-db-names.enum";
import { WasteEntityPropertiesNamesEnum } from "../enums/wt-entity-properties-names.enum";
/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* Service imports */
import { DbUtilsService } from "src/modules/common/utils/db/providers/db-utils.service";
import { StringUtilsService } from "src/modules/common/utils/string/providers/string-utils.service";
/* Type imports */
import { TypeOrmInnerJoinParametersObjectType } from "src/common/types/typeorm-inner-join-parameters-object";
/* WastesHelper */
@Injectable()
export class WastesHelper {
  constructor(
    private dbUtils: DbUtilsService,
    private stringUtils: StringUtilsService,
  ) {}
  generateFindAllOrOneSelectColumns(): string {
    return `${EntitiesAliasesEnum.DISPOSAL_POINT}.${DisposalPointEntityPropertiesDbNamesEnum.LOCALITY_NAME} as ${this.dbUtils.generateColumnAliasForSelectQuery(DisposalPointEntityPropertiesNamesEnum.LOCALITY_NAME)},
    \t\t${EntitiesAliasesEnum.WASTE}.${WasteEntityPropertiesDbNamesEnum.DATE} as ${this.dbUtils.generateColumnAliasForSelectQuery(WasteEntityPropertiesNamesEnum.DATE)},
    \t\t${EntitiesAliasesEnum.WASTE}.${WasteEntityPropertiesDbNamesEnum.DISPOSAL_POINT_ID} as ${this.dbUtils.generateColumnAliasForSelectQuery(WasteEntityPropertiesNamesEnum.DISPOSAL_POINT_ID)},
    \t\t${EntitiesAliasesEnum.WASTE}.${WasteEntityPropertiesDbNamesEnum.ID} as ${this.dbUtils.generateColumnAliasForSelectQuery(WasteEntityPropertiesNamesEnum.ID)},
    \t\t${EntitiesAliasesEnum.WASTE}.${WasteEntityPropertiesDbNamesEnum.TYPE} as ${this.dbUtils.generateColumnAliasForSelectQuery(WasteEntityPropertiesNamesEnum.TYPE)},
    \t\t${EntitiesAliasesEnum.WASTE}.${WasteEntityPropertiesDbNamesEnum.USER_NAME} as ${this.dbUtils.generateColumnAliasForSelectQuery(WasteEntityPropertiesNamesEnum.USER_NAME)}`;
  }
  generateInnerJoinWithDisposalPointEntity(): TypeOrmInnerJoinParametersObjectType {
    return {
      alias: EntitiesAliasesEnum.DISPOSAL_POINT,
      condition: `${EntitiesAliasesEnum.DISPOSAL_POINT}.${DisposalPointEntityPropertiesDbNamesEnum.ID} = ${EntitiesAliasesEnum.WASTE}.${WasteEntityPropertiesDbNamesEnum.DISPOSAL_POINT_ID}`,
      entity:
        this.dbUtils.generateEntityToStringForInnerJoinQuery(
          DisposalPointEntity,
        ),
    };
  }
  getFilterDtoProps(filterWasteDto: FilterWastesDto): Map<string, string> {
    const wtEntityPropertiesDbNamesMap = new Map(
      Object.entries(WasteEntityPropertiesDbNamesEnum),
    );
    // console.log("wtEntityPropertiesDbNamesMap: ", wtEntityPropertiesDbNamesMap);
    const wtEntityPropertiesNamesMap = new Map(
      Object.entries(WasteEntityPropertiesNamesEnum),
    );
    // console.log("wtEntityPropertiesNamesMap: ", wtEntityPropertiesNamesMap);
    // console.log("filterWasteDto: ", filterWasteDto);
    const notUndefinedDtoPropsArray = Object.entries(filterWasteDto).filter(
      (value) => value[1] !== undefined,
    ) as [string, string][];
    // console.log("notUndefinedDtoPropsArray: ", notUndefinedDtoPropsArray);
    const notUndefinedDtoPropsMap = new Map<string, string>();
    for (let i = 0; i < notUndefinedDtoPropsArray.length; i++) {
      const dtoKeyValuePairArray = notUndefinedDtoPropsArray[i];
      // console.log("dtoKeyValuePairArray: ", dtoKeyValuePairArray);
      wtEntityPropertiesNamesMap.forEach((value, key) => {
        if (value === dtoKeyValuePairArray[0]) {
          const possibleKeyForNewMap = wtEntityPropertiesDbNamesMap.get(key);
          if (possibleKeyForNewMap) {
            notUndefinedDtoPropsMap.set(
              possibleKeyForNewMap,
              dtoKeyValuePairArray[1],
            );
          }
        }
      });
    }
    // console.log("notUndefinedDtoPropsMap: ", notUndefinedDtoPropsMap);
    return notUndefinedDtoPropsMap;
  }
}
