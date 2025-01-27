import { type SchemaTypeDefinition } from 'sanity';
import chef from './chefs';
import food from './foods';

import orders from './orders';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [food, chef, orders],
};
