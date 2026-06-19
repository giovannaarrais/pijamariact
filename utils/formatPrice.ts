export const formatPrice = (price: number | string) => {
    const value = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(value) || price == null) {
        return null;
    }

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}