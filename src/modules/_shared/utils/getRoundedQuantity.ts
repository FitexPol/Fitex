export function getRoundedQuantity(quantity: number): string {
  const rounded = quantity.toFixed(2);
  const splitted = rounded.split('.');

  return splitted[1] === '00' ? splitted[0] : rounded;
}
