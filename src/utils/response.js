export const success=(res,data,message ='Success')=>{
    res.status(200).json({message,data});
};
export const error=(res,message='Error',status=500)=>{
    res.status(status).json({error:message});
};
