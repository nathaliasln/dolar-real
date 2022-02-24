const convert = (cotacao, quantidade) => cotacao * quantidade

const toMoney = valor => parseFloat(valor).toFixed(3)

module.exports = {
    convert,
    toMoney
}