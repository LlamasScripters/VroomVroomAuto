import { Request, Response, NextFunction } from "express";
import UserSQL from "../modelsSQL/user.sql";
import { UserSQL as UserSQLType } from "../interfaces/modelsSQL.interface";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const header = req.header("Authorization") ?? req.header("authorization");
    if (!header) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = header.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.LOGIN_JWT_KEY as string) as { id: number };

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await UserSQL.findByPk(decoded.id) as UserSQLType | null;
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!user.isValidated) {
            return res.status(401).json({ code: "account_not_validated" });
        }

        req.user = user;
        next();
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ code: "token_expired" });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ code: "invalid_token" });
        }
        console.error(err);
        return res.status(401).json({ error: "Unauthorized" });
    }
};

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Access denied." });

    if (user.role !== "admin") {
    return res.status(403).json({ error: "Access denied." });
    }

    next();
};

export const authorizeUser = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Access denied." });

    if (user.role !== "user") {
    return res.status(403).json({ error: "Access denied." });
    }
    next();
};

export const authorizeGestionnaire = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Access denied." });

    if (user.role !== "gestionnaire") {
        return res.status(403).json({ error: "Access denied." });
    }
    next();
};
