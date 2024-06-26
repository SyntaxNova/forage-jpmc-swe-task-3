import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc:number,
  price_def:number,
  ratio:number,
  timestamp: Date,
  upper_bond:number,
  lower_bond: number,
  trigger_alert: number | undefined
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const upperBound = 1 + 0.05;
    const lowerBound = 1 - 0.05;
    const ratio = priceABC / priceDEF; 
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio, // Update this line to use the 'ratio' variable
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
       serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bond: upperBound,
      lower_bond: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound)? ratio : undefined,
    };
  }
}
