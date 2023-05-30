import { rest } from 'msw';
// import { mock_checkout_token } from '../mockData';

export const handlers = [
  rest.get('https://64351490537112453fcd07e0.mockapi.io/api/v1/lane', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        countries: {
          BD: 'Bangladesh',
          IN: 'India',
        },
      })
    );
  }),

  rest.get('https://64351490537112453fcd07e0.mockapi.io/api/v1/datatable', (req, res, ctx) => {
    return res(
      ctx.json({
        subdivisions: {
          '05': 'Bagerhat',
          '01': 'Bandarban',
          '06': "Cox's Bazar",
        },
      })
    );
  }),

  rest.get('https://64351490537112453fcd07e0.mockapi.io/api/v1/users', (req, res, ctx) => {
    return res(
      ctx.json({
        users: [
          {
            id: 1,
            name: 'Bagerhat',
          },
          {
            id: 2,
            name: 'Bandarban',
          },
          {
            id: 3,
            name: "Cox's Bazar",
          },
        ],
      })
    );
  }),

  rest.get('https://api.chec.io/v1/checkouts/chkt_nwarr02343/helper/shipping_options', (req, res, ctx) => {
    const query = req.url.searchParams;
    const country = query.get('country');
    if (country === 'IN') {
      return res(
        ctx.json([
          {
            id: 'ship_NqKE50BV3wdgBL',
            description: 'Delivary',
            price: {
              raw: 0,
              formatted: '0.00',
              formatted_with_symbol: '₹0.00',
              formatted_with_code: '0.00 INR',
            },
            countries: ['IN'],
          },
        ])
      );
    }
    return res(
      ctx.json([
        {
          id: 'ship_1234563wdgBL',
          description: 'International',
          price: {
            raw: 10,
            formatted: '10.00',
            formatted_with_symbol: '₹10.00',
            formatted_with_code: '10.00 INR',
          },
          countries: ['BD'],
        },
      ])
    );
  }),
];
