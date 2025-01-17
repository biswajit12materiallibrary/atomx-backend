import mongoose from "mongoose";

export class ConnectDatabase {
  constructor(private uriString: any) {
    this.uriString = uriString;
  }
  public async connectDB() {
    try {
      await mongoose.set("strictQuery", true);
      const conn = await mongoose.connect(this.uriString, {
        serverSelectionTimeoutMS: 5000,
      });

      console.log(`MongoDB Connected`);
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
      process.exit(1);
    }
  }
}
