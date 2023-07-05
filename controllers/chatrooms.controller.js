const ChatRoom  = require("../models/ChatRoom")
const BaseController = require("./base.controller");


const baseController = new BaseController(ChatRoom);

const getChatroom = async (req, res)=>{
    try{
        await baseController.getById({req, res})
    }catch(e){
        baseController.handleError(res, e)
    } 
}

const getAllChatrooms = async (req, res)=>{    
    try{
        await baseController.getAll({req, res})
    }catch(e){
        baseController.handleError(res, e)
    } 
}

const saveChatroom = async (req, res)=>{
    try{
        await baseController.save({req, res, hasValidations:false})
        
    }catch(e){
        baseController.handleError(res, e)
    } 
}

const updateChatroom = async (req, res)=>{
    try{
        await baseController.update({req, res, hasValidations:false})
        
    }catch(e){
        baseController.handleError(res, e)
    } 
}

const deleteChatroom = async (req, res)=>{
    try{
        await baseController.delete({req, res})
    }catch(e){
        baseController.handleError(res, e)
    } 
}

module.exports = {
    getChatroom,
    saveChatroom,
    getAllChatrooms,
    updateChatroom,
    deleteChatroom
}