import { verifyToken } from "../lib/utils";

const redirectUser = async (req) => {
  const token = req ? req.cookies?.token : null;
  const userId = await verifyToken(token);
  return {
    userId,
    token
  };
};

export default redirectUser;