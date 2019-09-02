let Product = require('../models/product');
/*
 * GET /User route to retrieve all the Users.
 */
function getProducts(req, res) {
    try {
        //Query the DB and if no errors, send all the Users
        let query = Product.find({});
        query.exec((err, Product) => {
            if (err) res.send(err);
            //If no errors, send them back to the client
            res.json(Product);
        });
    } catch (e) {
        res.send({
            error: e,
        });
    }

}

let productbyid = async (req, res) => {
    try {
        console.log("req.params.id", req.params);

        if (req.params.id) {
            let productData = await Product.findOne({
                _id: req.params.id,
            }, {
                password: 0
            });
            if (productData) {
                res.send({
                    data: productData,
                });
            }
        } else {
            let productData = await Product.find();
            if (productData) {
                res.send({
                    data: productData,
                });
            }
        }
    } catch (e) {
        console.log("error", e);
        res.send({
            error: e,
        });
    }
}

let postProduct = async (req, res) => {
    try {
        let productData = await Product.findOne({
            name: req.body.name,
        });
        if (productData) {
            res.send({
                message: "Product already exist with this name",
            });
        } else {
            // create new user
            let newProduct = new Product(req.body);
            // saveing heres
            newProduct.save(
                (err, product) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({
                            message: "Product addded",
                            product
                        });
                    }
                }
            );
        }
    } catch (e) {
        console.log("error", e);
        res.send({
            error: e,
        });
    }

}

let editProduct = async (req, res) => {
    try {
        if (req.body._id) {
            const filter = {
                _id: req.body._id
            };
            const update = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            };
            let doc = await Product.findOneAndUpdate(filter, update);
            res.send({
                message: "Product updated!",
                product: req.body
            });
        } else {
            res.send({
                message: "Product id missing",
            });
        }
    } catch (e) {
        console.log("error", e);
        res.send({
            error: e,
        });
    }

}

let deleteProduct = async (req, res) => {
    try {
        let deleteProduct = await Product.deleteOne({
            _id: req.body._id
        });
        console.log("delete", deleteProduct);
        if (deleteProduct) {
            res.send({
                message: "Product deleted!",
            });
        }
    } catch (e) {
        console.log("error", e);
        res.send({
            error: e,
        });
    }

}

module.exports = {
    getProducts,
    postProduct,
    editProduct,
    deleteProduct,
    productbyid
};