import { Request, Response } from "express";

export default module.exports = function () {
  return function (req: Request, res: Response, next: () => void) {
    const { value1, value2 } = req.body;
    if (isNaN(Number(value1)) || isNaN(Number(value2))) {
      res.status(400);
      res.send("Bad request");
      return;
    }
    // Implement the middleware function based on the options object
    next();
  };
};
