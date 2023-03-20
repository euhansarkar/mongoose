const { postBrandsService, getBrandsService, updateBrandsService, deleteBrandsService } = require("../services/brand.services")

module.exports.postBrands = async(req, res, next) => {
try{

    const brand = await postBrandsService(req.body);

    res.status(200).json({
        status: `success`,
        message: `new brand created`,
        message: brand
    })

}catch(err){
    res.status(400).json({
        status: `failed`,
        message: `brand creation failed`,
        error: err.message
    })
}
}

module.exports.getBrands = async(req, res, next) => {
    try{
        const brands = await getBrandsService();


        res.status(200).json({
            status: `success`,
            message: `found all brand data`,
            data: brands
        })
    
    }
    catch(err){
        res.status(400).json({
            status: `failed`,
            message: `could'nt get any brand`,
            error: err.message
        })
    }

}


module.exports.updateBrands = async(req, res, next) => {
    try{

        const brandId = req.params.id;
        const updatedData = await updateBrandsService(brandId, req.body);

        res.status(200).json({
            status: `success`,
            message: `brand data updated`,
            data: updatedData
        })

    }catch(err){
        res.status(400).json({
            status: `failed`,
            message: `could'nt update brand data`,
            error: err.message
        })
    }
}


module.exports.deleteBrands = async(req, res, next) => {
    try{

        const brand = await deleteBrandsService(req.params.id);

        res.status(200).json({
            status: `success`,
            message: `brand data has successfully deleted`,
            data: brand
        })

    }
    catch(err){
        res.status(400).json({
            status: `failed`,
            message: `could'nt delete brand data`,
            error: err.message
        })
    }
}