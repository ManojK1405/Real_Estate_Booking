import express from 'express';
import app from './app.js';

app.get('/owner',(req,res)=>{
    res.send("Manoj Kalasgonda Here.");
})
app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
})

