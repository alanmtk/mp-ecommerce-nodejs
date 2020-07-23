const buildPreference = require('./mercadopago');

const home = (req, res) => {
  res.render('home');
};

const detail = (req, res) => {
  const { query } = req;
  buildPreference(query).then((response) => {
    const { init_point: initPoint } = response.body;
    res.render('detail', { ...query, initPoint });
  }).catch((error) => {
    console.log(error);
  });
};

const success = (req, res) => {
  res.render('mp-callback', { message: 'Gracias! Su pago ha sido procesado.', params: req.query });
};

const pending = (req, res) => {
  res.render('mp-callback', { message: 'Su pago se encuentra pendiente de aprobación, nos contactaremos a la brevedad.' });
};

const failure = (req, res) => {
  res.render('mp-callback', { message: 'Su pago ha sido rechazado, vuelva a intentar.' });
};

const ipn = (req, res) => {
  console.log('----------- IPN -----------');
  console.log(req.query);
  console.log(req.body);
  console.log('----------- IPN -----------');

  res.sendStatus(200);
};

module.exports = {
  home, detail, success, pending, failure, ipn,
};
