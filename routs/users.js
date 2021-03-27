const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const UserModel = require('../models/UserModel');
//const expressFormData = require("express-form-data");
require('dotenv').config();
const secret = process.env.SECRET;

router.post(
    '/create',
    (req, res) => {

        // 1) Capture user account details (e.g, first name, last name, etc.)
        const formData = {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            emiratesId: req.body.emiratesId,
            password: req.body.password,
            dob: req.body.dob,
            phonenum: req.body.phonenum,
            adress: req.body.adress,
            vehicleType: req.body.vehicleType
        };

        // 2) Create newUsersModel for saving the collection
        const newUsersModel = new UserModel(formData)

        // 3) Check that no other document has the same email
        UserModel
            .findOne({ email: formData.email })
            .then(
               async(dbDocument) => {
                    // 3.1) If email exists
                    if (dbDocument) {
                        // Then reject registration
                        res.send("Sorry. An account with thay email already exists");
                    }
                    // 3.2) If email does not exists
                    else {
                        // 4a) Upload their picture if file(s) were sent
                        if (Object.values(req.files).length > 0) {
                            const files = Object.values(req.files);

                            // Image
                            await cloudinary.uploader.upload(
                                files[0].path,
                                (cloudinaryErr,cloudinaryResult) => {
                                    if (cloudinaryErr) {
                                        console.log(cloudinaryErr)
                                    }
                                    // Add the URL of the picture to newUsersModel
                                    newUsersModel.avatar = cloudinaryResult.url;
                                }
                            )
                        }

                        // 4) Generate a salt
                        bcryptjs.genSalt(
                            (err, theSalt) => {
                                // 5) With the salt and user's password, encrypt
                                bcryptjs.hash(
                                    formData.password,
                                    theSalt,
                                    (err, theEncryption) => {
                                        // 6) Replace the password with the encryption
                                        newUsersModel.password = theEncryption;

                                        // 7) We will save user to collection
                                        newUsersModel
                                            .save()
                                            .then(
                                                (dbDocument) => {
                                                    res.send("Account created successfully!")
                                                }
                                            )
                                            .catch(
                                                (error) => {
                                                    console.log(error)
                                                }
                                            );
                                    }
                                )
                            }
                        )
                    }
                }
            )

    }
);

module.exports = router;