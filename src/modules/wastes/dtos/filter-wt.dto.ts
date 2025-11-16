/* Enum imports */
import { ClassValidatorDecoratorsNamesEnum } from "src/common/utils/messages/enums/class-validator-decorators-names.enum";
import { WasteEntityPropertiesPtBrNamesEnum } from "../enums/wt-entity-properties-ptbr-names.enum";
import { WastesTypesEnum } from "../enums/wastes-types.enum";
/* Other libraries imports */
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from "class-validator";
/* Util imports */
import { MessagesUtilsClass } from "src/common/utils/messages/messages-utils.class";
/* FilterWasteDto */
export class FilterWastesDto {
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
  @IsOptional()
  wtDatetime?: string;
  @IsOptional()
  @IsUUID("all", {
    message: MessagesUtilsClass.generateClassValidatorErrorMessage(
      WasteEntityPropertiesPtBrNamesEnum.DISPOSAL_POINT_ID,
      ClassValidatorDecoratorsNamesEnum.IS_UUID,
    ),
  })
  wtDpId?: string;
  @IsEnum(WastesTypesEnum, {
    message: MessagesUtilsClass.generateClassValidatorErrorMessage(
      WasteEntityPropertiesPtBrNamesEnum.TYPE,
      ClassValidatorDecoratorsNamesEnum.IS_ENUM,
      { enumValues: WastesTypesEnum },
    ),
  })
  @IsOptional()
  wtType?: WastesTypesEnum;
  @IsOptional()
  wtUserName?: string;
}
