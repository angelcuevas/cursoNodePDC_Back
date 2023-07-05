const { validationResult } = require('express-validator');
const PasswordHandler = require('../classes/PasswordHandler');

class BaseController {

    constructor(MyClass){
        this.MyClass = MyClass; 
    }

    async getAll({req, res}){
        const instances = await this.MyClass.find({})
        res.status(200).json({
            payload: instances
        })
    }

    async getById({req, res}){
        const id = req.params.id; 
        const instances = await this.MyClass.findOne({_id: id})
        res.status(200).json({
            payload: instances
        })
    }

    async save({req, res, hasValidations = false }){
        if(hasValidations){
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({
                    message: result
                })
            }
        }

        const instance = new this.MyClass(req.body);

        await instance.save();
        res.status(200).json({
            message:'Ok',
            payload: instance
        })  
    }

    async saveAndEncryptPassword({req, res, hasValidations = false }){
        if(hasValidations){
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({
                    message: result
                })
            }
        }

        const passwordHandler = new PasswordHandler()
        const instance = new this.MyClass(req.body);
        instance.password = await passwordHandler.hashPassword(instance.password)

        await instance.save();
        res.status(200).json({
            message:'Ok',
            payload: instance
        })  
    }

    async update({ req, res, hasValidations = false }) {
        if (hasValidations) {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({
                    message: result
                })
            }
        }

        const instance = await this.MyClass.findOneAndUpdate({ _id: req.body.Id }, req.body, { new: true })
        if(!instance){
            return res.status(404).json({
                message: 'Theres no object with that Id'
            })
        }
        res.status(200).json({
            message: 'Ok',
            payload: instance
        })
    }

    async delete({req, res}){
        const id = req.params.id; 
        const data = await this.MyClass.deleteOne({_id:id})
        if(data.deletedCount == 0){
            return res.status(404).json({
                message: 'Theres no object with that Id'
            })
            return
        }
        res.status(200).json({
            message:'Ok'
        })
    }

    handleError(res,e){
        return res.status(500).json({
            message:'There has been an error' + e
        })
    }
}

module.exports = BaseController;