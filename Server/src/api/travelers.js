const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

require('dotenv').config();

const db = monk(process.env.MONGO_URI);

const travelers = db.get('travelers');

const schema = Joi.object({
    'name' : Joi.string().trim().required(),
    'lastName': Joi.string().trim().required(),
    'country' : Joi.string().trim(),
    'gender' : Joi.string().trim(),
    'age' : Joi.number().required(), 
});

const router = express.Router();

//Get All Persons
router.get('/', async (req, res, next) => {
    try {
        const items = await travelers.find({});
        res.json(items);
    } catch (error) {
        next(error);
    }
});

//Get One Person By Id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await travelers.findOne({
            '_id' : id,
        });
        if(!item) {
            return next();
        }
        res.json(item);
    } catch (error) {
        next(error);
    }
});

//Create a person
router.post('/', async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        const inserted = await travelers.insert(value);
        res.json(inserted);
    } catch (error) {
        next(error);
    }
});

//Update a person
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const value = await schema.validateAsync(req.body);
        const item = await travelers.findOne({
            '_id': id,
        });
        if(!item){
            return next();
        }
        await travelers.update({
            '_id': id,
        }, {
            $set: value,
        });   
        res.json(value); 
    } catch (error) {
        next(error);
    }
});

//Deleting one person
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await travelers.remove({
            '_id' : id,
        });    
        res.json({
            message: 'Succesfully deleted',
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;