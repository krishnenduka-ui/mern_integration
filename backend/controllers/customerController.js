import customerModel from "../models/customerModel.js";

export const createCustomer = async (req, res) => {
  try {
    const customer = await customerModel.create(req.body);

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await customerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    );

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    await customerModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Customer Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

