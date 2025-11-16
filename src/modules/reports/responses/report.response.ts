/* Enum imports */
import { WastesTypesEnum } from "src/modules/wastes/enums/wastes-types.enum";
/* Response imports */
import { DisposalVariationComparedToLastMonthResponse } from "src/modules/wastes/responses/disposal-variation-compared-to-last-month.response";
import { FindOneDisposalPointResponse } from "src/modules/disposal-points/responses/find-one-dp.response";
/* ReportResponse */
export class ReportResponse {
  discardAverageOverPastNDays: { discardAverage: number; nDays: number };
  disposalVariationComparedToLastMonth: DisposalVariationComparedToLastMonthResponse;
  dpWithHighestNumberOfRecords: FindOneDisposalPointResponse;
  mostDiscardedWtType: WastesTypesEnum;
  totalDp: number;
  totalUs: number;
}
