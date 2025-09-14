import { Need, Supplier } from './types';
import { A1, A2, A3, A4 } from './products';
import { randomUUID } from 'crypto';

const Si: Need = {
  id: randomUUID().toString(),
  products: [
    {
      id: randomUUID().toString(),
      quantity: 650,
      product: A1,
    },
    {
      id: randomUUID().toString(),
      quantity: 740,
      product: A2,
    },
    {
      id: randomUUID().toString(),
      quantity: 920,
      product: A3,
    },
    {
      id: randomUUID().toString(),
      quantity: 480,
      product: A4,
    },
  ],
};
const suppliers: Supplier[] = [
  {
    id: randomUUID().toString(),
    name: 'P1',
    deliveryCost: 5000,
    rate: 0.595,
    products: [
      {
        id: randomUUID().toString(),
        product: A1,
        price: 45,
        maxCount: 120,
        rate: 0.68,
      },
      {
        id: randomUUID().toString(),
        product: A2,
        price: 80,
        maxCount: 250,
        rate: 0.51,
      },
    ],
  },
  {
    id: randomUUID().toString(),
    name: 'P2',
    deliveryCost: 8000,
    rate: 0.725,
    products: [
      {
        id: randomUUID().toString(),
        product: A1,
        price: 50,
        maxCount: 200,
        rate: 0.71,
      },
      {
        id: randomUUID().toString(),
        product: A4,
        price: 85,
        maxCount: 110,
        rate: 0.74,
      },
    ],
  },
  {
    id: randomUUID().toString(),
    name: 'P3',
    deliveryCost: 6500,
    rate: 0.693,
    products: [
      {
        id: randomUUID().toString(),
        product: A2,
        price: 79,
        maxCount: 300,
        rate: 0.7,
      },
      {
        id: randomUUID().toString(),
        product: A3,
        price: 38,
        maxCount: 400,
        rate: 0.73,
      },
      {
        id: randomUUID().toString(),
        product: A4,
        price: 84,
        maxCount: 200,
        rate: 0.65,
      },
    ],
  },
  {
    id: randomUUID().toString(),
    name: 'P4',
    deliveryCost: 10_000,
    rate: 0.72,
    products: [
      {
        id: randomUUID().toString(),
        product: A2,
        price: 76,
        maxCount: 150,
        rate: 0.82,
      },
      {
        id: randomUUID().toString(),
        product: A3,
        price: 40,
        maxCount: 500,
        rate: 0.62,
      },
    ],
  },
  {
    id: randomUUID().toString(),
    name: 'P5',
    deliveryCost: 4000,
    rate: 0.6325,
    products: [
      {
        id: randomUUID().toString(),
        product: A1,
        price: 52,
        maxCount: 350,
        rate: 0.83,
      },
      {
        id: randomUUID().toString(),
        product: A2,
        price: 79,
        maxCount: 70,
        rate: 0.4,
      },
      {
        id: randomUUID().toString(),
        product: A3,
        price: 38,
        maxCount: 300,
        rate: 0.52,
      },
      {
        id: randomUUID().toString(),
        product: A4,
        price: 78,
        maxCount: 250,
        rate: 0.78,
      },
    ],
  },
  {
    id: randomUUID().toString(),
    name: 'P6',
    deliveryCost: 3500,
    rate: 0.94,
    products: [
      {
        id: randomUUID().toString(),
        product: A2,
        price: 71,
        maxCount: 200,
        rate: 0.97,
      },
      {
        id: randomUUID().toString(),
        product: A4,
        price: 78,
        maxCount: 50,
        rate: 0.91,
      },
    ],
  },
  {
    id: randomUUID().toString(),
    name: 'P7',
    deliveryCost: 4800,
    rate: 0.9,
    products: [
      {
        id: randomUUID().toString(),
        product: A1,
        price: 51,
        maxCount: 100,
        rate: 0.85,
      },
      {
        id: randomUUID().toString(),
        product: A2,
        price: 77,
        maxCount: 280,
        rate: 0.91,
      },
      {
        id: randomUUID().toString(),
        product: A3,
        price: 37,
        maxCount: 120,
        rate: 0.94,
      },
    ],
  },
  {
    id: randomUUID().toString(),
    name: 'P8',
    deliveryCost: 2500,
    rate: 0.685,
    products: [
      {
        id: randomUUID().toString(),
        product: A1,
        price: 54,
        maxCount: 90,
        rate: 0.76,
      },
      {
        id: randomUUID().toString(),
        product: A2,
        price: 74,
        maxCount: 220,
        rate: 0.59,
      },
      {
        id: randomUUID().toString(),
        product: A3,
        price: 39,
        maxCount: 260,
        rate: 0.74,
      },
      {
        id: randomUUID().toString(),
        product: A4,
        price: 80,
        maxCount: 80,
        rate: 0.65,
      },
    ],
  },
];

// ===================== MATRIX CONSOLE RENDER (self-contained) =====================
type MxAlign = 'left' | 'right';

// ── formatting helpers
const mxNf = new Intl.NumberFormat('uk-UA');
const mxFmtInt = (n: number) => mxNf.format(n);
const mxFmtIntOrDash = (n?: number) => (n ? mxFmtInt(n) : '—');
const mxFmtRate = (n: number) =>
  n.toLocaleString('uk-UA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });

const mxPad = (s: string, len: number, align: MxAlign = 'left') => {
  if (s.length >= len) return s;
  const k = len - s.length;
  return align === 'right' ? ' '.repeat(k) + s : s + ' '.repeat(k);
};
const mxBorder = (l: string, m: string, r: string, widths: number[]) =>
  l + widths.map((w) => '─'.repeat(w + 2)).join(m) + r;

function mxTable(
  title: string,
  headers: string[],
  rows: (string | number)[][],
  align: MxAlign[] = [],
) {
  const body = rows.map((r) => r.map((x) => String(x)));
  const widths = headers.map((h, j) =>
    Math.max(h.length, ...body.map((r) => r[j]?.length ?? 0)),
  );

  const top = mxBorder('┌', '┬', '┐', widths);
  const sep = mxBorder('├', '┼', '┤', widths);
  const bot = mxBorder('└', '┴', '┘', widths);

  const head =
    '│' +
    headers.map((h, j) => ' ' + mxPad(h, widths[j]) + ' ').join('│') +
    '│';
  const rowsStr = body
    .map(
      (r) =>
        '│' +
        r
          .map((c, j) => ' ' + mxPad(c, widths[j], align[j] ?? 'left') + ' ')
          .join('│') +
        '│',
    )
    .join('\n');

  console.log(`\n${title}\n${top}\n${head}\n${sep}\n${rowsStr}\n${bot}\n`);
}

// ── convenient accessors
const allProducts = [A1, A2, A3, A4];
const prodNames = allProducts.map((p) => p.name);

const priceBy = (s: Supplier, pId: string) =>
  s.products.find((pp) => pp.product.id === pId)?.price ?? 0;
const capBy = (s: Supplier, pId: string) =>
  s.products.find((pp) => pp.product.id === pId)?.maxCount ?? 0;
const rateBy = (s: Supplier, pId: string) =>
  s.products.find((pp) => pp.product.id === pId)?.rate ?? 0;

// ================= 0) МАТРИЦЯ ПОТРЕБИ (як перша таблиця) =================
{
  const needByProd = new Map(
    Si.products.map((p) => [p.product.id, p.quantity]),
  );
  const headers = ['tj', ...prodNames];
  const row: (string | number)[] = [
    '—',
    ...allProducts.map((p) => mxFmtIntOrDash(needByProd.get(p.id))),
  ];

  mxTable(
    'ПОТРЕБА (скільки треба замовити)',
    headers,
    [row],
    ['right', 'left', 'right', 'right', 'right', 'right'],
  );
}

// ================= 1) МАТРИЦЯ ЦІН (як перша картинка) =================
{
  const headers = ['tj', 'C', ...prodNames];
  const rows: (string | number)[][] = suppliers.map((s) => [
    mxFmtInt(s.deliveryCost),
    s.name,
    ...allProducts.map((p) => {
      const v = priceBy(s, p.id);
      return v ? mxFmtInt(v) : 0; // 0 якщо товар не постачається (як на скріні)
    }),
  ]);

  mxTable('МАТРИЦЯ ЦІН (tj — доставка, C — постачальник)', headers, rows, [
    'right',
    'left',
    'right',
    'right',
    'right',
    'right',
  ]);
}

// ================= 2) МАТРИЦЯ КІЛЬКОСТЕЙ (без C, Σ зверху) =================
{
  const headers = ['B', ...prodNames];

  // Рядки по постачальниках
  const rows: (string | number)[][] = suppliers.map((s) => [
    s.name,
    ...allProducts.map((p) => {
      const v = capBy(s, p.id);
      return v ? mxFmtInt(v) : 0;
    }),
  ]);

  // Σ по кожному товару
  const totals = allProducts.map((p) =>
    suppliers.reduce((sum, s) => sum + capBy(s, p.id), 0),
  );

  // Порахувати ширини колонок з урахуванням Σ
  const body = rows.map((r) => r.map(String));
  const widths = headers.map((h, j) =>
    Math.max(
      h.length,
      ...body.map((r) => r[j]?.length ?? 0),
      j === 0 ? 'Σ'.length : mxFmtInt(totals[j - 1]).length,
    ),
  );

  const top = mxBorder('┌', '┬', '┐', widths);
  const sep = mxBorder('├', '┼', '┤', widths);
  const bot = mxBorder('└', '┴', '┘', widths);

  const headerRow =
    '│' +
    headers.map((h, j) => ' ' + mxPad(h, widths[j]) + ' ').join('│') +
    '│';

  const bodyRows = body
    .map(
      (r) =>
        '│' +
        r
          .map(
            (c, j) =>
              ' ' + mxPad(c, widths[j], j === 0 ? 'left' : 'right') + ' ',
          )
          .join('│') +
        '│',
    )
    .join('\n');

  const sigmaRow =
    '│' +
    ['Σ', ...totals.map(mxFmtInt)]
      .map(
        (c, j) =>
          ' ' + mxPad(String(c), widths[j], j === 0 ? 'left' : 'right') + ' ',
      )
      .join('│') +
    '│';

  console.log('\nМАТРИЦЯ КІЛЬКОСТЕЙ (макс. к-ть постачальників) — Σ зверху');
  console.log(top);
  console.log(sigmaRow);
  console.log(sep);
  console.log(headerRow);
  console.log(sep);
  console.log(bodyRows);
  console.log(bot);
}

// ================= 3) МАТРИЦЯ РЕЙТИНГІВ (як третя картинка) =================
{
  const headers = ['R', ...prodNames, 'R (пост.)'];
  const rows: (string | number)[][] = suppliers.map((s) => [
    s.name,
    ...allProducts.map((p) => {
      const v = rateBy(s, p.id);
      return v ? mxFmtRate(v) : 0; // 0 якщо постачальник не має цього товару
    }),
    mxFmtRate(s.rate),
  ]);

  mxTable(
    'МАТРИЦЯ РЕЙТИНГІВ (товарні + загальний рейтинг постачальника)',
    headers,
    rows,
    ['left', 'right', 'right', 'right', 'right', 'right'],
  );
}
