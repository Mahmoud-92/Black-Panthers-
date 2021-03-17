const mongoose = require('mongoose');
const ProductsSchema = new mongoose.Schema(
    {
	
	coveredRegions: {type:String},
	whyFlex: {type:String},
	letsDrive: {type:String},
	rewards: {type:String}

    }

),

ProductsModel = mongoose.model('products', ProductsSchema);
module.exports = ProductsModel;
