/* Enum imports */
import { DisposalPointEntityPropertiesDbNamesEnum } from "../enums/dp-entity-properties-db-names.enum";
import { DisposalPointEntityPropertiesNamesEnum } from "../enums/dp-entity-properties-names.enum";
import { SqlDataTypesEnum } from "src/modules/common/utils/db/enums/sql-data-types.enum";
/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* Response imports */
import { FindAllDisposalPointsResponse } from "../responses/find-all-dp.response";
/* Service imports */
import { DbUtilsService } from "src/modules/common/utils/db/providers/db-utils.service";
/* DisposalPointsHelper */
@Injectable()
export class DisposalPointsHelper {
  constructor(private dbUtils: DbUtilsService) {}
  checkIfDisposalPointWithSameUniquePropsExists(
    disposalPoints: FindAllDisposalPointsResponse[],
    dtoLatitude: number,
    dtoLongitude: number,
  ): boolean {
    for (let i = 0; i < disposalPoints.length; i++) {
      const latitude = disposalPoints[i].dpLatitude;
      const longitude = disposalPoints[i].dpLongitude;
      const latitudeEquals = dtoLatitude === latitude;
      const longitudeEquals = dtoLongitude === longitude;
      if (latitudeEquals && longitudeEquals) {
        return true;
      }
    }
    return false;
  }
  generateFindAllOrOneSelectColumns(): string {
    return `${DisposalPointEntityPropertiesDbNamesEnum.ACCEPTED_WASTE_CATEGORY} as ${this.dbUtils.generateColumnAliasForSelectQuery(DisposalPointEntityPropertiesNamesEnum.ACCEPTED_WASTE_CATEGORY)},
		\t\t${DisposalPointEntityPropertiesDbNamesEnum.ID} as ${this.dbUtils.generateColumnAliasForSelectQuery(DisposalPointEntityPropertiesNamesEnum.ID)},
		\t\t${DisposalPointEntityPropertiesDbNamesEnum.LATITUDE}${this.dbUtils.generatePostgreSqlDoubleColonOperator(SqlDataTypesEnum.FLOAT)} as ${this.dbUtils.generateColumnAliasForSelectQuery(DisposalPointEntityPropertiesNamesEnum.LATITUDE)},
		\t\t${DisposalPointEntityPropertiesDbNamesEnum.LOCALITY_NAME} as ${this.dbUtils.generateColumnAliasForSelectQuery(DisposalPointEntityPropertiesNamesEnum.LOCALITY_NAME)},
		\t\t${DisposalPointEntityPropertiesDbNamesEnum.LOCALITY_TYPE} as ${this.dbUtils.generateColumnAliasForSelectQuery(DisposalPointEntityPropertiesNamesEnum.LOCALITY_TYPE)},
		\t\t${DisposalPointEntityPropertiesDbNamesEnum.LONGITUDE}${this.dbUtils.generatePostgreSqlDoubleColonOperator(SqlDataTypesEnum.FLOAT)} as ${this.dbUtils.generateColumnAliasForSelectQuery(DisposalPointEntityPropertiesNamesEnum.LONGITUDE)},
		\t\t${DisposalPointEntityPropertiesDbNamesEnum.NEIGHBORHOOD} as ${this.dbUtils.generateColumnAliasForSelectQuery(DisposalPointEntityPropertiesNamesEnum.NEIGHBORHOOD)}`;
  }
}
