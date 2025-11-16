/* Enum imports */
import { ClassValidatorDecoratorsNamesEnum } from "src/common/utils/messages/enums/class-validator-decorators-names.enum";
import { WasteEntityPropertiesPtBrNamesEnum } from "../enums/wt-entity-properties-ptbr-names.enum";
import { WastesTypesEnum } from "../enums/wastes-types.enum";
/* Other libraries imports */
import { IsDateString, IsEnum, IsNotEmpty, IsUUID } from "class-validator";
/* Util imports */
import { MessagesUtilsClass } from "src/common/utils/messages/messages-utils.class";
/* CreateWasteDto */
export class CreateWasteDto {
  @IsDateString(
    {
      strict: true,
      strictSeparator: true,
    },
    {
      message: MessagesUtilsClass.generateClassValidatorErrorMessage(
        WasteEntityPropertiesPtBrNamesEnum.DATETIME,
        ClassValidatorDecoratorsNamesEnum.IS_DATE_STRING,
      ),
    },
  )
  wtDatetime: string;
  @IsUUID("all", {
    message: MessagesUtilsClass.generateClassValidatorErrorMessage(
      WasteEntityPropertiesPtBrNamesEnum.DISPOSAL_POINT_ID,
      ClassValidatorDecoratorsNamesEnum.IS_UUID,
    ),
  })
  wtDpId: string;
  @IsEnum(WastesTypesEnum, {
    message: MessagesUtilsClass.generateClassValidatorErrorMessage(
      WasteEntityPropertiesPtBrNamesEnum.TYPE,
      ClassValidatorDecoratorsNamesEnum.IS_ENUM,
      { enumValues: WastesTypesEnum },
    ),
  })
  wtType: WastesTypesEnum;
  @IsNotEmpty({
    message: MessagesUtilsClass.generateClassValidatorErrorMessage(
      WasteEntityPropertiesPtBrNamesEnum.USER_NAME,
      ClassValidatorDecoratorsNamesEnum.IS_NOT_EMPTY,
    ),
  })
  wtUserName: string;
}
