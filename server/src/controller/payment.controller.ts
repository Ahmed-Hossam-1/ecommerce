import { ExpressHandler } from '../types/typeDao';
import { Stripe } from 'stripe';

export const createPayment: ExpressHandler<
  { amount: number | undefined },
  { clientSecret: string | null }
> = async (req, res) => {
  try {
    // stripe
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key is not defined.');
    }
    const stripe = new Stripe(stripeSecretKey);

    const { amount } = req.body;
    if (!amount) {
      res.status(400).send({ error: 'Amount is required.' });
    }

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).send({ error: 'Valid amount is required.' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.status(201).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error.' });
  }
};
