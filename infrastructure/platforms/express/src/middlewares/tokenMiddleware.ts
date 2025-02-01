import { Request, Response } from "express";
import UserSQL from "../modelsSQL/user.sql";
import { UserSQL as UserSQLType } from "../interfaces/modelsSQL.interface";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = async (req: AuthRequest, res: Response): Promise<Response | void> => {
    const header = req.header("Authorization") ?? req.header("authorization");
    if (!header) return res.status(401).json({ error: "Unauthorized" });

    const token = header.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Access denied." });

    try {
        const decoded = jwt.verify(token, process.env.LOGIN_JWT_KEY as string) as { id: number };
    if (!decoded) {
        return res.status(401).json({ error: "Access denied." });
    }

    const user = await UserSQL.findByPk(decoded.id) as UserSQLType | null;;
    if (!user) {
        return res.status(401).json({ error: "Access denied." });
    }

    res.status(200).json({ userId: user.userId, userRole: user.role });
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Unauthorized" });
    }
};
