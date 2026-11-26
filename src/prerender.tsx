import { renderToString } from 'react-dom/server';
import App from './App';

/**
 * Build-time entry (see scripts/prerender.mjs): renders the single page to HTML
 * so crawlers, link-preview bots and no-JS visitors get real content instead of
 * an empty <div id="root">. The client bundle still mounts over it normally.
 */
export function render(): string {
  return renderToString(<App />);
}
