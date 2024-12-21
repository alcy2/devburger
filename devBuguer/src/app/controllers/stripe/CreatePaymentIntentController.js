import Stripe from 'stripe';

import Yup from 'yup'
const stripe = new Stripe('pk_test_51QXTW9LIv69ipcLGKRfMJoTOuM7wAcNKtHY0Vx2g1y6xq4e1VGklmFgMayE2DjyKpAaiWgG6qSm7TwdVnZImm5jo00GXhvsgMe')

const claculateOrderAmount = (items) => {
    const total = items.reduce((acc, current) => {
        return current.price * current.quantity + acc
    }, 0);

    return total;
}

class CreatePaymentIntentController {
    async store(req, res) {
        const schema = Yup.object({
            products: Yup.array()
                .required()
                .of(
                    Yup.object({
                        id: Yup.number().required(),
                        quantity: Yup.number().required(),
                        price: Yup.number().required(),
                    }),
                ),
        });

        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            res.status(400).json({ error: err.errors });
        }

        const { products } = req.body

        const amount = claculateOrderAmount(products)

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'brl',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
        });
    }


}

export default new CreatePaymentIntentController();
