const express= require('express');
const request = require('request-promise');


const app = express();
const PORT= process.env.PORT || 5000;
// New Change

// const baseUrl=`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());
app.get('/', (req,res) =>{
    res.send("Welcome To amazon Scarpper API");
});


const generateScrapeUrl= (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// Get Product  Details

app.get('/products/:productId',async (req,res)=>{
    const { productId } =req.params;
    const { api_key } = req.query;



    try{
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.in/dp/${productId}`)

        res.json(JSON.parse(response));

    } catch (e){
        
        res.json(e.message);
    }
})


app.get('/products/:productId/reviews',async (req,res)=>{
    const { productId } =req.params;
    const { api_key } = req.query;



    try{
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.in/product-reviews/${productId}`)
        res.json(JSON.parse(response));

    } catch (e){
        
        res.json(e.message);
    }
})


app.get('/products/:productId/offers',async (req,res)=>{
    const { productId } =req.params;
    const { api_key } = req.query;


    try{
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.in/dp/offer-listing/${productId}`)
        res.json(JSON.parse(response));

    } catch (e){
        
        res.json(e.message);
    }

})


app.get('/search/:searchQuery',async (req,res)=>{
    const { searchQuery } =req.params;
    const { api_key } = req.query;



    try{
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.in/k=${searchQuery}`)
        res.json(JSON.parse(response));

    } catch (e){
        
        res.json(e.message);
    }
})




app.listen(PORT, () => console.log(`server running on port ${PORT}`));