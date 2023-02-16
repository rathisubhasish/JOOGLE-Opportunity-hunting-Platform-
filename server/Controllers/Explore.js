const explores = require('../DB/exploreCollection');

const Explore = async (_,res) => {
    try{
        await explores.find({},{_id:1,itemName: 1,organization:1,category: 1}).then((data)=>{
            res.status(200).json({
                data: data
            })
        });
    }
    catch(err)
    {
        res.status(503).json({
            message: "Unavailable, please try later"
        });
    }
    
};

module.exports = Explore;