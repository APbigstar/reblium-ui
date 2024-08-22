import Stripe from 'stripe';

if (!process.env.PUBLIC_STRIPE_SECRET_API_KEY) {
  throw new Error('PUBLIC_STRIPE_SECRET_API_KEY is not set in the environment variables');
}

if (!process.env.PUBLIC_STRIPE_WEBHOOK_SECRET) {
  throw new Error('PUBLIC_STRIPE_WEBHOOK_SECRET is not set in the environment variables');
}

const stripe = new Stripe(process.env.PUBLIC_STRIPE_SECRET_API_KEY, {
  apiVersion: '2024-06-20'
});

export async function createCustomer(email) {
  try {
    const customer = await stripe.customers.create({ email });
    return customer;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    throw error;
  }
}

export async function createSubscription(customerId, productId, email) {
  const paymentBehavior = 'default_incomplete';
  const paymentSettings = {
    save_default_payment_method: 'on_subscription',
  };

  const expand = ['latest_invoice.payment_intent'];

  try {
    const subscriptionParams = {
      customer: customerId,
      items: [
        {
          price: productId,
        },
      ],
      expand,
      payment_behavior: paymentBehavior,
      payment_settings: paymentSettings,
      metadata: { email },
      coupon: "lNWcivga"
    };

    const subscription = await stripe.subscriptions.create(subscriptionParams);

    let clientSecret;
    if (subscription.pending_setup_intent) {
      clientSecret = subscription.pending_setup_intent;
    } else {
      const invoice = subscription.latest_invoice;
      const paymentIntent = invoice.payment_intent;
      clientSecret = paymentIntent.client_secret;
    }

    return {
      subscription_id: subscription.id,
      client_secret: clientSecret,
      status: subscription.latest_invoice.status,
      is_trial: false,
    };
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

export async function createPaymentIntent(amount, customerId, email) {
  try {
    return await stripe.paymentIntents.create({
      customer: customerId,
      setup_future_usage: 'off_session',
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        email,
      },
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

export async function retrievePaymentIntent(paymentIntentId) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Error retrieving PaymentIntent:', error);
    throw error;
  }
}

export function constructWebhookEvent(payload, signature) {
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, (process.env.PUBLIC_STRIPE_WEBHOOK_SECRET || ""));
  } catch (err) {
    throw new Error(`Webhook Error: ${err.message}`);
  }

  const data = event.data.object;
  const eventType = event.type;
  let result = {};

  if (eventType.includes('payment_intent') && !data.invoice) {
    if (eventType === 'payment_intent.payment_failed') {
      result = {
        type: eventType,
        id: data.id,
        status: data.status,
        complete: false,
      };
    } else if (eventType === 'payment_intent.succeeded') {
      result = {
        type: eventType,
        id: data.id,
        status: data.status,
        complete: true,
      };
    }
  } else if (eventType === 'invoice.created') {
    result = {
      type: eventType,
      id: data.subscription,
      invoice_id: data.id,
      paid: data.paid,
      status: data.status,
      amount: data.amount_due / 100,
      currency: data.currency,
    };
  } else if (eventType === 'invoice.paid') {
    result = {
      type: eventType,
      complete: true,
      id: data.subscription,
      invoice_id: data.id,
      paid: data.paid,
      status: data.status,
      amount: data.amount_due / 100,
      currency: data.currency,
    };
  } else if (['invoice.payment_action_required', 'invoice.payment_failed', 'invoice.updated'].includes(eventType)) {
    result = {
      type: eventType,
      id: data.subscription,
      invoice_id: data.id,
      paid: data.paid,
      status: data.status,
      amount: data.amount_due / 100,
      currency: data.currency,
    };
  } else if (eventType === 'customer.subscription.deleted') {
    result = {
      type: eventType,
      id: data.id,
      status: data.status,
    };
  } else if (eventType === 'customer.subscription.created') {
    result = {
      complete: ['active', 'trialing'].includes(data.status),
      type: eventType,
      id: data.id,
      status: data.status,
      trial: !!data.trial_end,
    };
  } else if (eventType === 'customer.subscription.updated') {
    result = {
      complete: ['active', 'trialing', 'past_due'].includes(data.status),
      type: eventType,
      id: data.id,
      status: data.status,
      expires_at: data.cancel_at,
      trial: !!data.trial_end,
    };
  } else {
    console.log(`Unhandled event type ${eventType}`);
    return null;
  }

  return result;
}

export async function updateSubscriptionEndPeriod(subscriptionId, cancelAtPeriodEnd) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: cancelAtPeriodEnd,
    });

    return subscription;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

export async function cancelSubscription(subscriptionId) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId);

    return subscription;
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }
}

export async function retrieveSubscription(subscriptionId) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['latest_invoice.payment_intent'],
    });
    return subscription;
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    throw error;
  }
}

export async function modifySubscription(subscriptionId, planProductId) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
      proration_behavior: 'create_prorations',
      items: [
        {
          id: subscription.items.data[0].id,
          price: planProductId,
        },
      ],
    });
    return updatedSubscription;
  } catch (error) {
    console.error('Error modifying subscription:', error);
    throw error;
  }
}

export default stripe;