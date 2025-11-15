/* DTO imports */
import { CreateWasteDto } from "./dtos/create-wt.dto";
import { FilterWastesDto } from "./dtos/filter-wt.dto";
/* Enum imports */
import { ControllersRoutePathPrefixesEnum } from "src/common/enums/controllers-route-path-prefixes.enum";
/* Nest.js imports */
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
/* Pipe imports */
import { CustomValidationPipe } from "src/common/pipes/custom-validation.pipe";
/* Response imports */
import { FindAllWastesResponse } from "./responses/find-all-wt.response";
/* Service imports */
import { WastesService } from "./providers/wt.service";
/* WastesController */
@Controller(`${ControllersRoutePathPrefixesEnum.WASTE}`)
export class WastesController {
  constructor(private wastesService: WastesService) {}
  @Post()
  create(
    @Body(CustomValidationPipe) createWasteDto: CreateWasteDto,
  ): Promise<string | undefined> {
    return this.wastesService.create(createWasteDto);
  }
  @Get()
  findByFilter(
    @Query(CustomValidationPipe) filterWastesDto: FilterWastesDto,
  ): Promise<FindAllWastesResponse[]> {
    return this.wastesService.findByFilter(filterWastesDto);
  }
  @Get()
  findAll(): Promise<FindAllWastesResponse[]> {
    return this.wastesService.findAll();
  }
}
