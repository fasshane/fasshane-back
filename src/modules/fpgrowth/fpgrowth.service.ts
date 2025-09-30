import { Injectable } from '@nestjs/common';
import { FPGrowthRepository } from './fpgrowth.repository';
import { FPGrowthImplementation } from './algorithm/fpgrowth.algorithm';

@Injectable()
export class FPGrowthService {
  constructor(readonly fpgrowthRepository: FPGrowthRepository) { }
  async calculateRules() {
    const transactions = await this.fpgrowthRepository.loadTransactions();
    console.log('transactions:', transactions);

    const service = new FPGrowthImplementation(0.2, 0.6); // minSupport=20%, minConfidence=60%
    const rules = await service.mineRules(transactions);

    console.log("Association Rules:");
    for (const rule of rules) {
      console.log(
        `${rule.antecedent.join(", ")} => ${rule.consequent.join(", ")} | support=${rule.support.toFixed(
          2
        )}, confidence=${rule.confidence.toFixed(2)}, lift=${rule.lift.toFixed(2)}`
      );
    }
  }
}
