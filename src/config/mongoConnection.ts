import Mongoose from "mongoose";

class MongoConnection {
  static mongoOptions: Mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    autoIndex: true,
    poolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    validateOptions: true
  };

  static mongoInstance: any;
    
  static async connect(connectionString: string) {
    if(this.mongoInstance) return this.mongoInstance;
    
    try {
      this.mongoInstance = await Mongoose.connect(connectionString, this.mongoOptions);

      console.log('Successfully connected to mongo database.');
    } 
    catch (error) {
      console.log('Error connecting to database: ', error);

    }
  }
}

export { MongoConnection }