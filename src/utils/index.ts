export function priceTransform (price : number) : string {
  return new Intl.NumberFormat('ru-RU').format(price)
}
