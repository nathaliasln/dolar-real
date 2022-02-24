const express = require('express')
const app = express()
const path = require('path')
const apiBCB = require ('./lib/api-bcb')

const convert = require('./lib/convert')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req, res) => {
    const cotacao = await apiBCB.getCotacao('')
    console.log('cotacao',cotacao)
    res.render('home', 
        {cotacao
    })
})

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query
    
    if (cotacao && quantidade) {

        const conversao = convert.convert(quantidade, cotacao)
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    }
    else {
        res.render('cotacao',{
            error : 'Valores Inválidos'
        })

    }
})

app.listen(port, err => {
    if (err) console.log(`Error ${err}`)
    else `Server running at port ${port}`
})