export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'name', title: 'Item Name', type: 'string' },
              { name: 'quantity', title: 'Quantity', type: 'number' },
              { name: 'price', title: 'Price', type: 'number' },
            ],
          },
        ],
      },
      {
        name: 'total',
        title: 'Total Amount',
        type: 'number',
      },
      {
        name: 'customer',
        title: 'Customer Details',
        type: 'object',
        fields: [
          { name: 'firstName', title: 'First Name', type: 'string' },
          { name: 'lastName', title: 'Last Name', type: 'string' },
          { name: 'email', title: 'Email', type: 'string' },
          { name: 'phone', title: 'Phone Number', type: 'string' },
        ],
      },
      {
        name: 'address',
        title: 'Shipping Address',
        type: 'object',
        fields: [
          { name: 'country', title: 'Country', type: 'string' },
          { name: 'city', title: 'City', type: 'string' },
          { name: 'zipCode', title: 'Zip Code', type: 'string' },
          { name: 'address1', title: 'Address 1', type: 'string' },
          { name: 'address2', title: 'Address 2', type: 'string' },
        ],
      },
    ],
  };
  