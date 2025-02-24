import deviceService from "../services/deviceService.js";

export const isOwner = async (req, res, next) => {
  const deviceId = req.params.deviceId;
  const device = await deviceService.getOne(deviceId);

  if (!device.owner.equals(req.user.id)) {
    res.setError("You are not owner of this offer!");
    return res.redirect(`/devices/${deviceId}/details`);
  }

  req.device = device;

  next();
};
