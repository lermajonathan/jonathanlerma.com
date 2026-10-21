import { LineChart } from '@pance/react';

// LineChart sizes itself to its container in the browser; rendered as static
// HTML it keeps its 600 px default and overflows a phone. Hydrate it.
const years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

export default function ShowcaseChart() {
  return (
    <LineChart
      title="Grants awarded per year"
      subtitle="Illustrative data — the real project is in discovery"
      labels={years}
      series={[
        { name: 'Pacific region', data: [120, 132, 150, 148, 96, 160, 188, 204, 221, 236] },
        { name: 'Andean region', data: [310, 322, 340, 351, 240, 360, 372, 390, 401, 418] },
      ]}
      height={200}
    />
  );
}
