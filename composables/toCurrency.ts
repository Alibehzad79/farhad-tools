export const toCurrencyString = (number: any) => {
    return number.toLocaleString('fa-IR', { currency: 'IRT' }) ?? 0
}