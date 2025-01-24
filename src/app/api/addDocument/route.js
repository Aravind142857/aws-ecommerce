import { opensearchClient } from "../lib/opensearchClient";

export default async function handler(req, res) {
    const { name, price, img, rating, votes, category } = req.body;

    try {
        await opensearchClient.index({
            index: 'products',
            body: { name, price, img, rating, votes, category },
        });
        res.status(200).json({ message: 'Document added successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding document' });
    }
}c