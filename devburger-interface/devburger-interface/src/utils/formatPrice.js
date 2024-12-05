export const formatPrice = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        //formata o valor ->
    }).format(value / 100);
}