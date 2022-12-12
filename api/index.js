const app = require('express')()

const JsSearch = require('js-search')
const cors = require('cors')

const breeds = require('./breeds.json')

const search = new JsSearch.Search('name')
search.addDocuments(breeds)
search.addIndex('name')

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
)

app.get('/api/breeds', (req, res)=>{
    const {query} = req
    console.log(query.search);
    if(query.search){
        res.send(search.search(query.search))
    }
    res.send(breeds)
})

app.get('/api/breeds/:id', (req, res )=> {
    const {params} = req
    res.send(breeds[params.id])
})

module.exports = app