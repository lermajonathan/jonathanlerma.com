import { useState } from 'react';
import { SegmentedControl, Button, Badge, Field, Input, SwitchRow, Progress, Alert, MetricCard } from '@pance/react';
import './ThemeLab.css';

// Aqua is Pance's own ramp; the others are mapped onto it by src/styles/brand-scope.css.
type Brand = 'aqua' | 'violet' | 'emerald' | 'rose' | 'amber';
const brands: { value: Brand; label: string }[] = [
  { value: 'aqua', label: 'Aqua' },
  { value: 'violet', label: 'Violet' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'rose', label: 'Rose' },
  { value: 'amber', label: 'Amber' },
];

const isDefault = (brand: Brand) => brand === 'aqua';
const scopeMarkup = (brand: Brand) =>
  isDefault(brand) ? '<div class="brand-scope">' : `<div class="brand-scope" data-brand="${brand}">`;

export default function ThemeLab() {
  const [brand, setBrand] = useState<Brand>('aqua');
  const [notify, setNotify] = useState(true);
  return (
    <div className="lab">
      <div className="lab-controls">
        <SegmentedControl label="Brand ramp" options={brands} value={brand} onChange={setBrand} />
        <code className="lab-code" aria-live="polite">
          {scopeMarkup(brand)}
        </code>
      </div>
      <div className="brand-scope lab-screen" data-brand={isDefault(brand) ? undefined : brand}>
        <div className="lab-col">
          <Field label="Project name" hint="Shown on the public dashboard." required>
            <Input defaultValue="Recovery map · Cali" />
          </Field>
          <div className="lab-row">
            <Button severity="primary">Publish</Button>
            <Button severity="primary" variant="outlined">
              Preview
            </Button>
            <Button severity="secondary" variant="text">
              Cancel
            </Button>
          </div>
          <div className="lab-row">
            <Badge severity="primary" dot>
              Live
            </Badge>
            <Badge severity="primary" variant="solid">
              New
            </Badge>
            <Badge severity="primary" variant="outlined">
              Beta
            </Badge>
          </div>
          <SwitchRow
            on={notify}
            onChange={setNotify}
            label="Email me when data updates"
            description="Weekly, at most."
          />
        </div>
        <div className="lab-col">
          <MetricCard
            label="Households reached"
            value="3,204"
            delta={12.5}
            trend={[2, 3, 3, 5, 6, 8, 9]}
            accent="primary"
          />
          <Progress value={72} label="Data collected" showValue severity="primary" />
          <Alert severity="primary" title="Same components, same code">
            Only the ramp behind the tokens changed. Contrast still passes: solid fills use step 700.
          </Alert>
        </div>
      </div>
    </div>
  );
}
