import title from "title";

export function slug(id: string) {
  return id
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\s/g, "-")
    .replace(/[\u0300-\u036f]/g, "");
}

export function unslug(id: string) {
  return title(id.replace(/-/g, " "))
}
