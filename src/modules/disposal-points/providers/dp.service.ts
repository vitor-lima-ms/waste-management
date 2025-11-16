/* DTO imports */
import { CreateDisposalPointDto } from "../dtos/create-dp.dto";
/* Entity imports */
import { DisposalPointEntity } from "../dp.entity";
import { CreateUpdateAndDeleteEnum } from "src/modules/common/utils/messages/enums/cud.enum";
import { EntitiesAliasesEnum } from "src/common/enums/entities-aliases.enum";
import { EntitiesPtBrNamesEnum } from "src/common/enums/entities-ptbr-names.enum";
import { HttpExceptionMessageContextsEnum } from "src/modules/common/utils/messages/enums/http-exception-message-contexts.enum";
/* Enum imports */
import { DisposalPointEntityPropertiesDbNamesEnum } from "../enums/dp-entity-properties-db-names.enum";
import { DisposalPointEntityPropertiesPtBrNamesEnum } from "../enums/dp-entity-properties-ptbr-names.enum";
import { SqlAggregateFunctionsEnum } from "src/modules/common/utils/db/enums/sql-aggregate-functions.enum";
import { SqlDataTypesEnum } from "src/modules/common/utils/db/enums/sql-data-types.enum";
/* Helper imports */
import { DisposalPointsHelper } from "./dp.helper";
/* Nest.js imports */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
/* Other libraries imports */
import { Repository } from "typeorm";
import { validate } from "uuid";
/* Response imports */
import { FindAllDisposalPointsResponse } from "../responses/find-all-dp.response";
import { FindOneDisposalPointResponse } from "../responses/find-one-dp.response";
/* Service imports */
import { DbUtilsService } from "src/modules/common/utils/db/providers/db-utils.service";
import { MessagesUtilsService } from "src/modules/common/utils/messages/providers/messages-utils.service";
import { StringUtilsService } from "src/modules/common/utils/string/providers/string-utils.service";
/* DisposalPointsService */
@Injectable()
export class DisposalPointsService {
  constructor(
    private dbUtils: DbUtilsService,
    private disposalPointsHelper: DisposalPointsHelper,
    @InjectRepository(DisposalPointEntity)
    private disposalPointsRepository: Repository<DisposalPointEntity>,
    private messagesUtils: MessagesUtilsService,
    private stringUtils: StringUtilsService,
  ) {}
  async create(
    createDisposalPointDto: CreateDisposalPointDto,
  ): Promise<string | undefined> {
    const allDisposalPoints = await this.findAll();
    const existingDisposalPointWithUniqueProps =
      this.disposalPointsHelper.checkIfDisposalPointWithSameUniquePropsExists(
        allDisposalPoints,
        createDisposalPointDto.dpLatitude,
        createDisposalPointDto.dpLongitude,
      );
    if (!existingDisposalPointWithUniqueProps) {
      await this.disposalPointsRepository
        .createQueryBuilder(EntitiesAliasesEnum.DISPOSAL_POINT)
        .insert()
        .values({
          dpAcceptedWasteCategory:
            createDisposalPointDto.dpAcceptedWasteCategory,
          dpLatitude: createDisposalPointDto.dpLatitude,
          dpLocalityName:
            this.stringUtils.trimAndRemoveExtraBlankSpacesBetweenChars(
              createDisposalPointDto.dpLocalityName,
            ),
          dpLocalityType: createDisposalPointDto.dpLocalityType,
          dpLongitude: createDisposalPointDto.dpLongitude,
          dpNeighborhood:
            this.stringUtils.trimAndRemoveExtraBlankSpacesBetweenChars(
              createDisposalPointDto.dpNeighborhood,
            ),
        })
        .execute();
      return this.messagesUtils.generateCudSuccessMessage(
        CreateUpdateAndDeleteEnum.CREATE,
        EntitiesPtBrNamesEnum.DISPOSAL_POINT,
      );
    }
    throw new HttpException(
      this.messagesUtils.generateHttpExceptionErrorMessage(
        EntitiesPtBrNamesEnum.DISPOSAL_POINT,
        HttpExceptionMessageContextsEnum.UNIQUE_ERROR,
        [
          DisposalPointEntityPropertiesPtBrNamesEnum.LATITUDE,
          DisposalPointEntityPropertiesPtBrNamesEnum.LONGITUDE,
        ],
      ),
      HttpStatus.BAD_REQUEST,
    );
  }
  async findAll(): Promise<FindAllDisposalPointsResponse[]> {
    return await this.disposalPointsRepository
      .createQueryBuilder(EntitiesAliasesEnum.DISPOSAL_POINT)
      .select(this.disposalPointsHelper.generateFindAllOrOneSelectColumns())
      .getRawMany<FindAllDisposalPointsResponse>();
  }
  async internalFindOneById(
    id: string,
  ): Promise<FindOneDisposalPointResponse | undefined> {
    const validUuid = validate(id);
    if (!validUuid) {
      throw new HttpException(
        this.messagesUtils.generateHttpExceptionErrorMessage(
          EntitiesPtBrNamesEnum.DISPOSAL_POINT,
          HttpExceptionMessageContextsEnum.UUID_ERROR,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.disposalPointsRepository
      .createQueryBuilder(EntitiesAliasesEnum.DISPOSAL_POINT)
      .select(this.disposalPointsHelper.generateFindAllOrOneSelectColumns())
      .where(`${DisposalPointEntityPropertiesDbNamesEnum.ID} = :id`, { id })
      .getRawOne<FindOneDisposalPointResponse>();
  }
  async internalTotalDp(): Promise<number> {
    const { count } = (await this.disposalPointsRepository
      .createQueryBuilder(EntitiesAliasesEnum.DISPOSAL_POINT)
      .select(
        `${this.dbUtils.generateAggregateFunction(SqlAggregateFunctionsEnum.COUNT, DisposalPointEntityPropertiesDbNamesEnum.ID)}${this.dbUtils.generatePostgreSqlDoubleColonOperator(SqlDataTypesEnum.INT)}`,
      )
      .getRawOne<{ count: number }>())!;
    return count;
  }
}
