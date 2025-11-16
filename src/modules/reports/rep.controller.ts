/* Enum imports */
import { ControllersRoutePathPrefixesEnum } from "src/common/enums/controllers-route-path-prefixes.enum";
/* Nest.js imports */
import { Controller, Get } from "@nestjs/common";
/* Response imports */
import { ReportResponse } from "./responses/report.response";
/* Service imports */
import { ReportsService } from "./providers/rep.service";
/* ReportsController */
@Controller(`${ControllersRoutePathPrefixesEnum.REPORT}`)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Get(":month")
  getReports(): Promise<ReportResponse> {
    return this.reportsService.getReport();
  }
}
