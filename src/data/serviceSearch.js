// Search is pure so input rendering never depends on the shape of the results.
export const normalizeSearch = value => value.trim().toLowerCase().replace(/\s+/g, ' ');
export function searchServices(categories, query) {
  const normalized = normalizeSearch(query);
  if (!normalized) return null;
  // Common misspelling explicitly supported by the service catalog.
  const q = normalized === 'sco' ? 'seo' : normalized;
  const matches = new Map();
  for (const cat of categories) {
    const categoryText = [cat.name, cat.shortName, cat.description, cat.tagline, ...(cat.keywords || [])].join(' ').toLowerCase();
    for (const sub of cat.subServices) {
      const text = [sub.title, sub.shortDesc, sub.tech, ...(sub.keywords || []), ...(sub.deliverables || [])].join(' ').toLowerCase();
      if (!categoryText.includes(q) && !text.includes(q)) continue;
      const existing = matches.get(sub.id);
      if (existing) { existing.categoryIds.push(cat.id); continue; }
      matches.set(sub.id, { ...sub, categoryName: cat.name, categoryId: cat.id, categoryIds: [cat.id] });
    }
  }
  const rank = item => { const title = item.title.toLowerCase(); return title === q ? 3 : title.startsWith(q) ? 2 : title.includes(q) ? 1 : 0; };
  return [...matches.values()].sort((a,b) => rank(b) - rank(a));
}
