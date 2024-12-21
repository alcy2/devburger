import { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles.css'
import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export function CheckoutForm() {
    const { cartProducts, clearCart } = useCart()
    const Navigate = useNavigate()

    const stripe = useStripe();
    const elements = useElements();
    const { state: { dpmCheckerLink }, } = useLocation()

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe ou Elements com falha, tente novamente')
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message);
            toast.error(error.message)
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {
                const products = cartProducts.map(product => {
                    return { id: product.id, quantity: product.quantity, price: product.price }
                })

                const { status } = await api.post("/orders",
                    {
                        products
                    },
                    {
                        //por padrão quando da erro, o axios não retorna status, então é preciso validar com ->
                        validateStatus: () => true,
                    },
                );
                console.log(status)

                if (status === 200 || status === 201) {
                    setTimeout(() => {
                        Navigate(`/complete?payment_intent_client_secret${paymentIntent.client_secret}`)
                    }, 3000);
                    clearCart()
                    toast.success('Pedido realizado com sucesso!✅')
                } else if (status === 409) {
                    toast.error('Falha ao realizar o seu pedido')
                } else {
                    throw new Error()
                }
            } catch (error) {
                toast.error('falha no sistema! tente novamente')
            }
        } else {
            Navigate(`/complete?payment_intent_client_secret${paymentIntent.client_secret}`)
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion"
    }

    return (
        <div className="container">
            <form id="payment-form" onSubmit={handleSubmit}>

                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit" className="button">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar Agora"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
            <div id="dpm-annotation">
                <p>
                    Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
                    <a
                        href={dpmCheckerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="dpm-integration-checker"
                    >
                        Ver métodos de pagamento
                    </a>
                </p>
            </div>
        </div>
    );
}