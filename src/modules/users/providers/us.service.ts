/* DTO imports */
import { CreateUserDto } from "../dtos/create-us.dto";
import { UpdateUserEmailNameAndRoleDto } from "../dtos/update-us-email-name-and-role.dto";
/* Entity imports */
import { UserEntity } from "../us.entity";
/* Enum imports */
import { CreateUpdateAndDeleteEnum } from "src/modules/common/utils/messages/enums/cud.enum";
import { EntitiesAliasesEnum } from "src/common/enums/entities-aliases.enum";
import { EntitiesPtBrNamesEnum } from "src/common/enums/entities-ptbr-names.enum";
import { HttpExceptionMessageContextsEnum } from "src/modules/common/utils/messages/enums/http-exception-message-contexts.enum";
import { SqlAggregateFunctionsEnum } from "src/modules/common/utils/db/enums/sql-aggregate-functions.enum";
import { SqlDataTypesEnum } from "src/modules/common/utils/db/enums/sql-data-types.enum";
import { UserEntityPropertiesDbNamesEnum } from "../enums/us-entity-properties-db-names.enum";
import { UserEntityPropertiesPtBrNamesEnum } from "../enums/us-entity-properties-ptbr-names.enum";
/* Helper imports */
import { UsersHelper } from "./us.helper";
/* Nest.js imports */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
/* Other libraries imports */
import { Repository } from "typeorm";
/* Response imports */
import { FindAllUsersResponse } from "../responses/find-all-us.response";
import { FindOneUserResponse } from "../responses/find-one-us.response";
/* Service imports */
import { DbUtilsService } from "src/modules/common/utils/db/providers/db-utils.service";
import { MessagesUtilsService } from "src/modules/common/utils/messages/providers/messages-utils.service";
import { StringUtilsService } from "src/modules/common/utils/string/providers/string-utils.service";
/* UsersService */
@Injectable()
export class UsersService {
  constructor(
    private messagesUtils: MessagesUtilsService,
    private stringUtils: StringUtilsService,
    private usersHelper: UsersHelper,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<string | undefined> {
    const existingUser = await this.findOneByEmail(createUserDto.usEmail);
    if (!existingUser) {
      const passwordVerification =
        this.usersHelper.verifyIfConfirmPasswordEqualsToPassword(
          createUserDto.usConfirmPassword,
          createUserDto.usPassword,
        );
      if (!passwordVerification) {
        throw new HttpException(
          this.messagesUtils.generateHttpExceptionErrorMessage(
            EntitiesPtBrNamesEnum.USER,
            HttpExceptionMessageContextsEnum.CONFIRM_PASSWORD_ERROR,
          ),
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.usersRepository
        .createQueryBuilder(EntitiesAliasesEnum.USER)
        .insert()
        .values({
          usEmail: createUserDto.usEmail,
          usName: this.stringUtils.trimAndRemoveExtraBlankSpacesBetweenChars(
            createUserDto.usName,
          ),
          usPassword: createUserDto.usPassword,
          usRole: createUserDto.usRole,
        })
        .execute();
      return this.messagesUtils.generateCudSuccessMessage(
        CreateUpdateAndDeleteEnum.CREATE,
        EntitiesPtBrNamesEnum.USER,
      );
    }
    throw new HttpException(
      this.messagesUtils.generateHttpExceptionErrorMessage(
        EntitiesPtBrNamesEnum.USER,
        HttpExceptionMessageContextsEnum.UNIQUE_ERROR,
        [UserEntityPropertiesPtBrNamesEnum.EMAIL],
      ),
      HttpStatus.BAD_REQUEST,
    );
  }
  async delete(id: string): Promise<string | undefined> {
    const existingUser = await this.findOneById(id);
    if (!existingUser) {
      throw new HttpException(
        this.messagesUtils.generateHttpExceptionErrorMessage(
          EntitiesPtBrNamesEnum.USER,
          HttpExceptionMessageContextsEnum.NOT_FOUND,
        ),
        HttpStatus.NOT_FOUND,
      );
    }
    await this.usersRepository
      .createQueryBuilder(EntitiesAliasesEnum.USER)
      .delete()
      .where(`${UserEntityPropertiesDbNamesEnum.ID} = :id`, { id })
      .execute();
    return this.messagesUtils.generateCudSuccessMessage(
      CreateUpdateAndDeleteEnum.DELETE,
      EntitiesPtBrNamesEnum.USER,
    );
  }
  async findAll(): Promise<FindAllUsersResponse[]> {
    return await this.usersRepository
      .createQueryBuilder(EntitiesAliasesEnum.USER)
      .select(this.usersHelper.generateFindAllOrOneSelectColumns())
      .getRawMany<FindAllUsersResponse>();
  }
  async findOneById(id: string): Promise<FindOneUserResponse | undefined> {
    return await this.usersRepository
      .createQueryBuilder(EntitiesAliasesEnum.USER)
      .select(this.usersHelper.generateFindAllOrOneSelectColumns())
      .where(`${UserEntityPropertiesDbNamesEnum.ID} = :id`, { id })
      .getRawOne<FindOneUserResponse>();
  }
  async findOneByEmail(
    email: string,
  ): Promise<FindOneUserResponse | undefined> {
    return await this.usersRepository
      .createQueryBuilder(EntitiesAliasesEnum.USER)
      .select(this.usersHelper.generateFindAllOrOneSelectColumns())
      .where(`${UserEntityPropertiesDbNamesEnum.EMAIL} = :email`, { email })
      .getRawOne<FindOneUserResponse>();
  }
  async updateEmailNameAndRole(
    id: string,
    updateUserDto: UpdateUserEmailNameAndRoleDto,
  ): Promise<string | undefined> {
    const existingUserById = await this.findOneById(id);
    if (!existingUserById) {
      throw new HttpException(
        this.messagesUtils.generateHttpExceptionErrorMessage(
          EntitiesPtBrNamesEnum.USER,
          HttpExceptionMessageContextsEnum.NOT_FOUND,
        ),
        HttpStatus.NOT_FOUND,
      );
    }
    const existingUserByEmail = await this.usersRepository
      .createQueryBuilder(EntitiesAliasesEnum.USER)
      .select(this.usersHelper.generateFindAllOrOneSelectColumns())
      .where(`${UserEntityPropertiesDbNamesEnum.EMAIL} = :email`, {
        email: updateUserDto.usEmail,
      })
      .andWhere(`${UserEntityPropertiesDbNamesEnum.ID} <> :id`, { id })
      .getRawOne<FindOneUserResponse>();
    if (!existingUserByEmail) {
      await this.usersRepository
        .createQueryBuilder(EntitiesAliasesEnum.USER)
        .update()
        .set({
          usEmail: updateUserDto.usEmail,
          usName: this.stringUtils.trimAndRemoveExtraBlankSpacesBetweenChars(
            updateUserDto.usName,
          ),
          usRole: updateUserDto.usRole,
        })
        .where(`${UserEntityPropertiesDbNamesEnum.ID} = :id`, { id })
        .execute();
      return this.messagesUtils.generateCudSuccessMessage(
        CreateUpdateAndDeleteEnum.UPDATE,
        EntitiesPtBrNamesEnum.USER,
      );
    }
    throw new HttpException(
      this.messagesUtils.generateHttpExceptionErrorMessage(
        EntitiesPtBrNamesEnum.USER,
        HttpExceptionMessageContextsEnum.UNIQUE_ERROR,
        [UserEntityPropertiesPtBrNamesEnum.EMAIL],
      ),
      HttpStatus.BAD_REQUEST,
    );
  }
}
