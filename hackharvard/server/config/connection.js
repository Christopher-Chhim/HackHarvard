import { Pinecone } from '@pinecone-database/pinecone';

// Create a serverless index
// "dimension" needs to match the dimensions of the vectors you upsert
const pc = new Pinecone({
    apiKey: 'YOUR_API_KEY' 
});

await pc.createIndex({ name: 'products', dimension: 1536,
    spec: { serverless: { cloud: 'aws', region: 'us-east-1', } } 
}) 

// Target the index
const index = pc.index('products');

// Mock vector and metadata objects (you would bring your own)
const records = [{ 
  id: 'some_id', 
  values: [0.010, 2.34, 7], 
  metadata: { id: 3056, description: 'Networked neural adapter' }, 
}]

// Upsert your vector(s)
await index.upsert(records);
