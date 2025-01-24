import { opensearchClient } from '../lib/opensearchClient';
export default async function handler(req, res) {
    try {
        await opensearchClient.indices.create({
            index: 'products',
            body: {
                mappings: {
                    properties: {
                        name: {type: 'text'},
                        price: {type: 'text'},
                        img: {type: 'text'},
                        rating: {type: 'float'},
                        votes: {type: 'text'},
                        category: {type: 'text'},
                    },
                },
            },
        });
        res.status(200).json({ message: 'Index created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating index' });
    }
}