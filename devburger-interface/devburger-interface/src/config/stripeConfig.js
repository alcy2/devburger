import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    'pk_test_51QXTW9LIv69ipcLGKRfMJoTOuM7wAcNKtHY0Vx2g1y6xq4e1VGklmFgMayE2DjyKpAaiWgG6qSm7TwdVnZImm5jo00GXhvsgMe'
);

export default stripePromise;