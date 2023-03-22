const { postSuppliersService, getSuppliersService, updateSuppliersService, deleteSuppliersService } = require("../services/supplier.services");

module.exports.postSuppliers = async(req, res, next) => {
try{

    const supplier = await postSuppliersService(req.body);

    res.status(200).json({
        status: `success`,
        message: `new supplier created`,
        message: supplier
    })

}catch(err){
    res.status(400).json({
        status: `failed`,
        message: `supplier creation failed`,
        error: err.message
    })
}
}

module.exports.getSuppliers = async(req, res, next) => {
    try{
        const supplier = await getSuppliersService();

        res.status(200).json({
            status: `success`,
            message: `found all suppliers data`,
            data: supplier
        })
    
    }
    catch(err){
        res.status(400).json({
            status: `failed`,
            message: `could'nt get any suppliers`,
            error: err.message
        })
    }

}


module.exports.updateSuppliers = async(req, res, next) => {
    try{

        const supplierId = req.params.id;
        const updatedData = await updateSuppliersService(supplierId, req.body);

        res.status(200).json({
            status: `success`,
            message: `supplier data updated`,
            data: updatedData
        })

    }catch(err){
        res.status(400).json({
            status: `failed`,
            message: `could'nt update supplier data`,
            error: err.message
        })
    }
}


module.exports.deleteSuppliers = async(req, res, next) => {
    try{

        const supplier = await deleteSuppliersService(req.params.id);

        res.status(200).json({
            status: `success`,
            message: `supplier data has successfully deleted`,
            data: supplier
        })

    }
    catch(err){
        res.status(400).json({
            status: `failed`,
            message: `could'nt delete supplier data`,
            error: err.message
        })
    }
}