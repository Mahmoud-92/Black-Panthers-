const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/ProductsModel.js');

router.get(
    '/',                 //http://www.myapp.com/product/
    (req, res) => {

        ProductsModel
        .find({ coveredRegions: 'California' })
        .then(
            (dbDocuments) => {
                res.send(dbDocuments)
            }
        )
        .catch(
            (error) => {
                console.log(error)
            }
        )

    }
);

router.post(
    '/',             // //http://www.myapp.com/product/
    (req, res) => {

        // Capture the data in the BODY section
        const formData = {
            coveredRegions: req.body.coveredRegions,
            whyFlex: req.body.whyFlex,
            letsDrive: req.body.letsDrive,
            rewards: req.body.rewards
        }

        // Instantiate an instance of the ProductsModel constructor
        const newProductModel = new ProductsModel(formData);

        // Using newProductModel object to save to the database 
        newProductModel
        .save()
        // If Promise resolves...
        .then(
            (dbDocument) => {
                res.send(dbDocument)
            }
        )
        // If Promise rejects...
        .catch(
            (error) => {
                console.log(error)
            }
        )
    }
);

router.post(
    '/update',
    (req, res) => {

        ProductsModel
        .findOneAndUpdate(
            {
                'rewards': req.body.model
            },
            {
                $set: {
                    drivers : req.body.price
                }
            }
        )
        .then(
            (dbDocument) => {
                res.send(dbDocument)
            }
        )
        .catch(
            (error) => {
                console.log(error)
            }
        )
    }
)


module.exports = router;
