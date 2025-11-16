/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* Response imports */
import { ReportResponse } from "../responses/report.response";
/* Service imports */
import { DisposalPointsService } from "src/modules/disposal-points/providers/dp.service";
import { WastesService } from "src/modules/wastes/providers/wt.service";
/* ReportsService */
@Injectable()
export class ReportsService {
  constructor(
    private disposalPointsService: DisposalPointsService,
    private wastesService: WastesService,
  ) {}
  async getReport(): Promise<ReportResponse> {
    const N_DAYS = 30;
    return {
      discardAverageOverPastNDays: {
        discardAverage:
          await this.wastesService.internalDiscardAverageOverPastNDays(N_DAYS),
        nDays: N_DAYS,
      },
      disposalVariationComparedToLastMonth:
        await this.wastesService.internalDisposalVariationComparedToLastMonth(),
      dpWithHighestNumberOfRecords:
        await this.wastesService.internalDpWithHighestNumberOfRecords(),
      mostDiscardedWtType:
        await this.wastesService.internalMostDiscardedWtType(),
      totalDp: await this.disposalPointsService.internalTotalDp(),
      totalUs: await this.wastesService.internalTotalUs(),
    };
  }
}
