import { Request, Response, NextFunction } from "express";
import UserSQL from "../modelsSQL/user.sql";
import { UserSQL as UserSQLType } from "../interfaces/modelsSQL.interface";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

interface JwtPayload {
    userId: string;
}

const secret = process.env.LOGIN_JWT_SECRET as string;

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, secret) as unknown as JwtPayload;
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await UserSQL.findByPk(decoded.userId) as UserSQLType | null;
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!user.isValidated) {
            return res.status(401).json({ code: "account_not_validated" });
        }
        
        req.user = {
            id: user.userId,
            role: user.role,
        };
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

export const authorizeAdminOrGestionnaire = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Access denied." });

    if (user.role !== "admin" && user.role !== "gestionnaire") {
        return res.status(403).json({ error: "Access denied." });
    }
    next();
};
