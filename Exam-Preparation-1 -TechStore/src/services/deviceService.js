import Device from "../models/Device.js";

//функцията за catalog paga-a която взима инфо за всичките и го дава
export const getAll = (filter = {}) => {
  let query = Device.find({});
  
  //Profile page
  if (filter.owner) {
    query = query.find({ owner: filter.owner });
  }
  //Profile page
  if (filter.preferredBy) {
    query = query.find({ preferredList: filter.preferredBy });
    // query = query.in('preferredList', filter.preferredBy);
  }

  return query;
};
//трите модел които се показват на hmoe page-a
export const getLatest = () => Device.find({}).sort({ _id: "desc" }).limit(3);

//взима един елемент по id  помага ни за view details
export const getOne = (deviceId) => Device.findById(deviceId);

export const create = (deviceData, userId) =>
  Device.create({ ...deviceData, owner: userId });

export const prefer = async (deviceId, userId) => {
  const device = await Device.findById(deviceId);

  if (device.owner.equals(userId)) {
    throw new Error("Cannot prefer own offer!");
  }

  if (device.preferredList.includes(userId)) {
    throw new Error("You already preferred this offer!");
  }

  device.preferredList.push(userId);

  return device.save();
};

export const remove = async (deviceId, userId) => {
  const device = await getOne(deviceId);

  if (!device.owner.equals(userId)) {
    throw new Error("Only owner can delete this offer!");
  }
  return Device.findByIdAndDelete(deviceId);
};

export const update = async (deviceId, userId, deviceData) => {
  const device = await getOne(deviceId);

  if (!device.owner.equals(userId)) {
    throw new Error("Only owner can edit this offer!");
  }
  return Device.findByIdAndUpdate(deviceId, deviceData, {
    runValidators: true,
  });
};

const deviceService = {
  getAll,
  getLatest,
  getOne,
  create,
  prefer,
  remove,
  update,
};

export default deviceService;
