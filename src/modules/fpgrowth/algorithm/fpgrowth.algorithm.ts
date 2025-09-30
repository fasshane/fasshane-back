import { FPGrowth } from "node-fpgrowth";

// export interface FrequentItemSet {
//   items: string[];
//   support: number; // relative frequency (0–1)
// }

export interface AssociationRule {
  antecedent: string[];
  consequent: string[];
  support: number;     // P(A ∪ B)
  confidence: number;  // P(B|A)
  lift: number;        // confidence / P(B)
}

export class FPGrowthImplementation {
  constructor(
    private minSupport: number = 0.02,
    private minConfidence: number = 0.5
  ) {}

  async mineRules(transactions: string[][]): Promise<AssociationRule[]> {
    const fpg = new FPGrowth<string>(this.minSupport);

    // 1. Mine frequent item sets
    const itemsets = await fpg.exec(transactions);

    // Build a support map for quick lookup
    const supportMap = new Map<string, number>();
    for (const { items, support } of itemsets) {
      supportMap.set(items.sort().join(","), support);
    }

    // 2. Generate rules
    const rules: AssociationRule[] = [];
    const total = transactions.length;

    for (const { items, support } of itemsets) {
      if (items.length < 2) continue;

      const itemSupport = support / total; // convert absolute -> relative
      const subsets = this.getNonEmptySubsets(items);

      for (const antecedent of subsets) {
        if (antecedent.length === items.length) continue;

        const consequent = items.filter(i => !antecedent.includes(i));
        const antecedentKey = antecedent.slice().sort().join(",");
        const consequentKey = consequent.slice().sort().join(",");

        const antecedentSupport = (supportMap.get(antecedentKey) ?? 0) / total;
        const consequentSupport = (supportMap.get(consequentKey) ?? 0) / total;

        if (antecedentSupport === 0 || consequentSupport === 0) continue;

        const confidence = itemSupport / antecedentSupport;
        const lift = confidence / consequentSupport;

        if (confidence >= this.minConfidence) {
          rules.push({
            antecedent,
            consequent,
            support: itemSupport,
            confidence,
            lift,
          });
        }
      }
    }

    return rules;
  }

  private getNonEmptySubsets<T>(arr: T[]): T[][] {
    const res: T[][] = [];
    const n = arr.length;
    for (let i = 1; i < 1 << n; i++) {
      const subset: T[] = [];
      for (let j = 0; j < n; j++) {
        if (i & (1 << j)) subset.push(arr[j]);
      }
      res.push(subset);
    }
    return res;
  }
}