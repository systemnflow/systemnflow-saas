async function includePartials() {
  const nodes = document.querySelectorAll('[data-include]');
  for (const node of nodes) {
    const url = node.getAttribute('data-include');
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status + ' ' + url);
      const html = await res.text();
      node.outerHTML = html; // swap placeholder with fetched HTML
    } catch (err) {
      console.error('Include failed:', err);
      node.outerHTML = '<!-- include failed: ' + url + ' -->';
    }
  }

  // set year after injection
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

document.addEventListener('DOMContentLoaded', includePartials);
