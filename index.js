import express from 'express'
import cors from 'cors'
import fse from 'fs-extra'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(bodyParser.json({ type: 'application/json' }))

app.get('/emails', async (req, res) => {
    const emails = await fse.readFileSync(`database.json`)
    res.send(emails)
})

app.post('/add', async (req, res) => {
    const email = req.body
    const emails = await fse.readFileSync(`database.json`)
    const parsedEmails = JSON.parse(emails)
    parsedEmails.push(email)
    await fse.outputFile(`database.json`, JSON.stringify(parsedEmails));
    res.json(parsedEmails)
})

app.listen(4000, () => {
    console.log('listening on 4000')
})