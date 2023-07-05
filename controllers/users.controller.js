const User  = require("../models/User")
const BaseController = require("./base.controller");


const baseController = new BaseController(User);

const getUser = async (req, res)=>{
    try{
        await baseController.getById({req, res})
    }catch(e){
        baseController.handleError(res, e)
    } 
}

const getAllUsers = async (req, res)=>{    
    try{
        await baseController.getAll({req, res})
    }catch(e){
        baseController.handleError(res, e)
    } 
}

const saveUser = async (req, res)=>{
    try{
        await baseController.saveAndEncryptPassword({req, res, hasValidations:true})
        
    }catch(e){
        baseController.handleError(res, e)
    } 
}

const updateUser = async (req, res)=>{
    try{
        await baseController.update({req, res, hasValidations:true})
        
    }catch(e){
        baseController.handleError(res, e)
    } 
}

const deleteUser = async (req, res)=>{
    try{
        await baseController.delete({req, res})
    }catch(e){
        baseController.handleError(res, e)
    } 
}

module.exports = {
    getUser,
    saveUser,
    getAllUsers,
    updateUser,
    deleteUser
}