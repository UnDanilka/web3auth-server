import express from 'express'
import cors from 'cors'
import fse from 'fs-extra'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(bodyParser.json({ type: 'application/json' }))

app.get('/wallets', async (req, res) => {
    const wallets = await fse.readFileSync(`database.json`)
    res.send(wallets)
})

app.post('/add', async (req, res) => {
    const wallet = req.body
    const wallets = await fse.readFileSync(`database.json`)
    const parsedWallets = JSON.parse(wallets)
    parsedWallets.push(wallet)
    await fse.outputFile(`database.json`, JSON.stringify(parsedWallets));
    res.json(parsedWallets)
})

app.listen(4000, () => {
    console.log('listening on 4000')
})