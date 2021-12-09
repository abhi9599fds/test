import { Router } from "express";
import multer from "multer";
import fastCsv from "fast-csv";
import fs from "fs";
import { ProductModel } from "./productModel.js";
import { OrderModel } from "./orderModel.js"
import moment from "moment";
import pkg from "sequelize";

const {Op} = pkg;

const router = Router();
const uploader = multer({dest:"temp/csv/"});

router.post("/placeOrder",async(req,res) => {
    try{
        const order = {
            c_unique_code : req.body.c_unique_code,
            c_name : req.body.c_name,
            quantity : req.body.quantity
        }
        const data = await OrderModel.create(order);

        if(data?.id !== undefined && data?.id !== "" && data?.id !== null)
            return res.status(200).json({"order_id" : data.id});
        else
            res.status(404).json({"msg":"Failed to Insert"});
    }
    catch(err) {
        return res.status(404).json({"msg":"Failed to Insert"});
    }
})

router.post("/getMedicineDetails",async(req,res) =>{
    try{
        const data = await ProductModel.findOne({
            where : {
                id : req.body.id
            }
        });
        return res.status(200).json(data);
    }
    catch(err) {
        return res.status(404).json({"msg":"Not Found"});
    }
})

router.post("/searchMedicine" , async(req,res)=>{
    try{
        const data = await ProductModel.findAll({
            where : {
                c_name : {
                    [Op.like] : `%${req.body.requestParm}%`
                }
            }
        });
        return res.status(200).json(data);
    }
    catch(err) {
        return res.status(404).json({"msg":"Not Found"});
    }
})

router.post("/uploadCsv" ,uploader.single('file'),async(req,res)=>{
    let rows =[]
    await fastCsv.parseFile(req.file.path)
    .on("data",async (data)=>{
        const tempRow = {
            c_name : data[0],
            c_batch_no : data[1],
            d_expiry_date : moment(data[2],"DD/MM/YYYY").format("YYYY-MM-DD"),
            n_balance_qty: data[3],
            c_packaging: data[4],
            c_unique_code : data[5],
            c_schemes : data[6],
            n_mrp: data[7],
            c_manufacturer: data[8],
            hsn_code: data[9]
        }
        rows.push(tempRow);
        
    })
    .on("end",async()=>{
        fs.unlinkSync(req.file.path);
        await ProductModel.bulkCreate(rows.slice(1,),{individualHooks:true});
        return res.json(rows)
    });
})

export {
    router,
}