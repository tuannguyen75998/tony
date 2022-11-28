const mongoose = require('mongoose')

const connectdb = async () =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/code')
        console.log('ket noi db thanhf cong');
    }
    catch(eer){
        console.log('ket noi DB that bai');
    }
}
module.exports= {connectdb}