export default function titleCase(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
