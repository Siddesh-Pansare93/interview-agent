import mongoose from 'mongoose'


const connectDb  = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/interview-agent`)
        console.log(`Connected to the Database at ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`ERROR in Connecting to The DB : ${error.message}`)
        throw new Error(error.message)
    }
}


export default connectDb