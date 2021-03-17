const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

router.post(
    '/create',          
    (req, res) => {

        // 1) Capture user account details (e.g, first name, last name, etc.)
        const formData = {
            email:req.body.email,
            username:req.body.username,
            password:req.body.password,
            passwordConf:req.body.passwordConf
        };

        // 2) Create newUsersModel for saving the collection
        const newUsersModel = new UserModel(formData)

        // 3) Check that no other document has the same email
        UserModel
        .findOne({ email: formData.email })
        .then(
            (dbDocument) => {
                // 3.1) If email exists
                if(dbDocument) {
                    // Then reject registration
                    res.send("Sorry. An account with thay email already exists");
                }
                // 3.2) If email does not exists
                else {
                    // 4) We will save user to collection
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
                    )
                }
            }
        )

    }
)

router.put(
    '/update',          
    (req, res) => {

        // 1) Capture user account details (e.g, first name, last name, etc.)
        const formData = {
            email:req.body.email,
            username:req.body.username,
            password:req.body.password,
            passwordConf:req.body.passwordConf
        };
       // 2) Create newUsersModel for saving the collection
       const newUsersModel = new UserModel(formData)

       // 3) Check that no other document has the same email
       UserModel
       .findOne({ email: formData.email })
       .then(
           (dbDocument) => {
               // 3.1) If email exists
               if(dbDocument) {
                   // Then reject registration
                   res.send("Sorry. An account with thay email already exists");
               }
               // 3.2) If email does not exists
               else {
                   // 4) We will save user to collection
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
                   )
               }
           }
       )

   }
) 

module.exports = router;