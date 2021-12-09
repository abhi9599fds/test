import sequelize_dist from "sequelize";
import { sequelize } from "./dBConnection.js";

const { DataTypes } = sequelize_dist


const ProductModel = sequelize.define("product" , {
    c_name : {type : DataTypes.STRING , allowNull:false},
    c_batch_no : {type :DataTypes.STRING(10), allowNull:false},
    d_expiry_date : {type : DataTypes.DATEONLY , allowNull:false},
    n_balance_qty : {type : DataTypes.INTEGER , allowNull:false},
    c_packaging : {type : DataTypes.STRING , allowNull:false},
    c_unique_code : {type : DataTypes.STRING , allowNull:false},
    c_schemes : {type : DataTypes.STRING , allowNull:true},
    n_mrp : {type : DataTypes.FLOAT , allowNull:false},
    c_manufacturer : {type : DataTypes.STRING(400) , allowNull:false},
    hsn_code : {type : DataTypes.STRING , allowNull:false},
},{
    createdAt :false,
    updatedAt :false
})

export {
    ProductModel
}