export type InspectAction = 'toggle' | 'close' | null;

/** What a key press should do to inspect mode. */
export function inspectKeyAction({
  key,
  inspecting,
  typing,
  modifier,
}: {
  key: string;
  inspecting: boolean;
  /** True when focus is in a text field, where "i" is just a letter. */
  typing: boolean;
  /** True when Cmd, Ctrl or Alt is held (browser shortcuts). */
  modifier: boolean;
}): InspectAction {
  if (typing || modifier) return null;
  if (key.toLowerCase() === 'i') return 'toggle';
  if (key === 'Escape' && inspecting) return 'close';
  return null;
}

export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}
