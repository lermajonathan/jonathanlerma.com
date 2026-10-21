const counts = new Intl.NumberFormat('en-US');

export function formatCount(value: number): string {
  return counts.format(value);
}

const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

/** "Six" for 6, "12" for 12 — for counts at the start of a heading. */
export function spellOut(value: number): string {
  return words[value] ?? String(value);
}
