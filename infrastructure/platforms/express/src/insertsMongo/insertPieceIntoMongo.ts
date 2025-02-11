import "../modelsSQL/associations";
import PieceMongo from "../modelsMongo/piece.mongo";
import Piece from "../modelsSQL/piece.sql";
import { PieceSQL } from "../interfaces/modelsSQL.interface";

async function insertOrUpdatePieceInMongo(pieceSQL: PieceSQL): Promise<void> {
    const pieceMongo = await PieceMongo.findById(pieceSQL.pieceId).exec();

    const newPiece: { [key: string]: any } = {
        _id: pieceSQL.pieceId,
        nom: pieceSQL.nom,
        reference: pieceSQL.reference,
        quantiteEnStock: pieceSQL.quantiteEnStock,
        seuilCritique: pieceSQL.seuilCritique,
        categorie: pieceSQL.categorie,
    };

    if (pieceMongo) {
        const isSame = Object.keys(newPiece).every(key =>
            JSON.stringify(newPiece[key]) === JSON.stringify((pieceMongo as { [key: string]: any })[key])
        );

        if (!isSame) {
            await PieceMongo.findByIdAndUpdate(pieceSQL.pieceId, newPiece).exec();
        }
    } else {
        await PieceMongo.create(newPiece);
    }
}

async function insertPieceToMongo(): Promise<void> {
    const pieces = await Piece.findAll();

    for (const piece of pieces) {
        await insertOrUpdatePieceInMongo(piece as unknown as PieceSQL);
    }
}

export default insertPieceToMongo;
