import { SchemaModelBase } from "../../models/base/baseSchema";
import Mongoose from "mongoose";
import { InvalidReferenceError } from "../../common/errors";

export async function getValidReferences<T extends Mongoose.Document>(refs: string[], schemaModel: SchemaModelBase<T>, itemName: string): Promise<string[]> {
    const promises = Array.from(new Set(refs))
    .map((e: T | string) => {
        const id = e as string;

        return schemaModel.findById(id).orFail(new InvalidReferenceError(id, itemName)).exec();
    });

    const references = await Promise.all(promises);

    return references.map(e => e._id);
}