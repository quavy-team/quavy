export function slug(id: string) {
  return id
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\s/g, "-")
    .replace(/[\u0300-\u036f]/g, "");
}
