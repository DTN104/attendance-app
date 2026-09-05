export function getInitials(name?: string) {
  if (!name) return '--';
  const words = name.trim().split(/\s+/);
  return `${words[0]?.[0] ?? ''}${words.at(-1)?.[0] ?? ''}`.toUpperCase();
}

export function getPreferredName(name?: string) {
  return name?.trim().split(/\s+/).at(-1) ?? 'bạn';
}
