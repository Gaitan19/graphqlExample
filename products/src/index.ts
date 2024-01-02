import { AppDataSource } from "./data-source"
import * as express from "express"
import { categoryRouter } from "./routes/Category"
import { productRouter } from "./routes/Product"
import { invoiceRouter } from "./routes/Invoice"
import { invoiceDetailRouter } from "./routes/InvoiceDetails"

const app = express()

const port = 3000

AppDataSource.initialize().then(async () => {
    console.log("Inicializado")
}).catch(error => console.log(error))

app.use(express.json())

app.use('/categories', categoryRouter)
app.use('/products', productRouter)
app.use('/invoice', invoiceRouter)
app.use('/invoiceDetails', invoiceDetailRouter)

app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`)
})