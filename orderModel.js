import sequelize_dist from "sequelize";
import { sequelize } from "./dBConnection.js";


const { DataTypes ,UUID , UUIDV4 } = sequelize_dist

const OrderModel = sequelize.define("order" , {
    id : { 
        primaryKey : true ,
        type: UUID, 
        defaultValue : UUIDV4
    },
    c_unique_code :{type : DataTypes.STRING , allowNull:false},
    c_name : {type : DataTypes.STRING , allowNull:false},
    quantity : {type: DataTypes.INTEGER,allowNull:false}
},{
    createdAt :true,
    updatedAt :false
})

export{
    OrderModel
}