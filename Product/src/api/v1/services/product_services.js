const { ProductModel } = require('../../../Database/models')


async function CreateProduct({ name, desc, type, unit, price, available, suplier, banner }) {

    console.log("hello sir");
    try {
        const Product = new ProductModel({
            name,
            desc,
            type,
            unit,
            price,
            available,
            suplier,
            banner
        });
        const productResult = await Product.save();
        return productResult;
    } catch (error) {
        return error;
    }
}




//  list all the type of pruducts....
async function Products() {
    try {
        return await ProductModel.find({});
    } catch (error) {
        return error;
    }
}




async function FindById(id) {
    try {
        return await ProductModel.findById(id);
    } catch (error) {
        return error;
    }
}




async function FindByCategory(category) {

    try {
        const products = await ProductModel.find({ type: category });

        return products;
    } catch (error) {
        return error;
    }
}



async function FindSelectedProducts(selectedIds) {

    try {
        const products = await (await ProductModel.find().where('_id')).in(selectedIds.map(_id => _id))
        return products;
    } catch (error) {

    }
}





module.exports = {
    CreateProduct,
    Products,
    FindById,
    FindByCategory,
    FindSelectedProducts

};