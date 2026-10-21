// Inspect mode: press I (or the Inspect button) to show the tokens behind the page.
import { inspectKeyAction, isTypingTarget } from '../lib/inspect';

const root = document.documentElement;
const buttons = document.querySelectorAll<HTMLButtonElement>('[data-inspect-toggle]');
const announcer = document.getElementById('inspect-live');
const isInspecting = () => root.hasAttribute('data-inspect');

function setInspecting(on: boolean) {
  root.toggleAttribute('data-inspect', on);
  buttons.forEach((button) => button.setAttribute('aria-pressed', String(on)));
  if (announcer) {
    announcer.textContent = on
      ? 'Inspect mode on. Elements now show the tokens they are built from.'
      : 'Inspect mode off.';
  }
}

buttons.forEach((button) => button.addEventListener('click', () => setInspecting(!isInspecting())));

window.addEventListener('keydown', (event) => {
  const action = inspectKeyAction({
    key: event.key,
    inspecting: isInspecting(),
    typing: isTypingTarget(event.target),
    modifier: event.metaKey || event.ctrlKey || event.altKey,
  });
  if (action === 'toggle') setInspecting(!isInspecting());
  if (action === 'close') setInspecting(false);
});
