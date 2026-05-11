import mongoose from "mongoose"

const customerSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    company: {
      type: String,
    }
  
})

const customerModel = mongoose.model('customers',customerSchema)

export default customerModel