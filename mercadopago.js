require('dotenv').config();
const mercadopago = require('mercadopago');

const accessToken = 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398';
const integratorId = 'dev_24c65fb163bf11ea96500242ac130004';

mercadopago.configure({ access_token: accessToken, integrator_id: integratorId });

const buildPreference = (product) => {
  const {
    title, price, unit, img,
  } = product;

  const [, ...safeImg] = img;

  const preference = {
    items: [
      {
        id: 1234,
        title,
        picture_url: `${process.env.BASE_URL}${safeImg.join('')}`,
        description: 'Dispositivo móvil de Tienda e-commerce',
        unit_price: parseFloat(price),
        quantity: parseInt(unit, 10),
      },
    ],
    payer: {
      name: 'Lalo',
      surname: 'Landa',
      email: 'test_user_63274575@testuser.com',
      phone: {
        area_code: '11',
        number: 22223333,
      },
      address: {
        street_name: 'False',
        street_number: 123,
        zip_code: '1111',
      },
    },
    payment_methods: {
      excluded_payment_methods: [{ id: 'amex' }],
      excluded_payment_types: [{ id: 'atm' }],
      installments: 6,
    },
    external_reference: 'alanmatkorski@gmail.com',
    back_urls: {
      success: `${process.env.BASE_URL}/success`,
      pending: `${process.env.BASE_URL}/pending`,
      failure: `${process.env.BASE_URL}/failure`,
    },
    auto_return: 'approved',
    notification_url: `${process.env.BASE_URL}/ipn`,
  };

  return mercadopago.preferences.create(preference);
};

module.exports = buildPreference;
