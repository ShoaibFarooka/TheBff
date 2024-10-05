
/*
*Cancellations*

- Cancellations must be made at least 24 hours in advance.
- If you cancel within 24 hours, a cancellation fee may apply.

*Refunds*

- If you are not satisfied with our services, you may request a refund within 7 days of your purchase.
- Refunds will be processed within 5-7 working days.
- The amount will be credited to the original payment method.

*Contact Us*

For any issues related to cancellations and refunds, please contact us at befitnessfrenzy@gmail.com or +91 8289031810.


 */

const CanecellationPolicy = () => {
    return (
        <main className="pt-28">
            <div className="container mx-auto px-4 text-neutral-200">
                <h1 className="text-3xl font-bold text-neutral-100">Cancellation Policy</h1>

                <br />
                <h3 className="text-2xl font-semibold">Cancellations</h3>
                <p className="text-neutral-200 mt-4">
                    - Cancellations must be made at least 24 hours in advance.
                    <br />
                    - If you cancel within 24 hours, a cancellation fee may apply.
                </p>

                <br />
                <h3 className="text-2xl font-semibold">Refunds</h3>
                <p className="text-neutral-200 mt-4">
                    - If you are not satisfied with our services, you may request a refund within 7 days of your purchase.
                    <br />
                    - Refunds will be processed within 5-7 working days.
                    <br />
                    - The amount will be credited to the original payment method.
                </p>

                <br />
                <h3 className="text-2xl font-semibold">Contact Us</h3>
                <p className="text-neutral-200 mt-4">
                    For any issues related to cancellations and refunds, please contact us at
                    <a href="mailto:befitnessfrenzy@gmail.com" target="_blank" className="text-blue-500 underline underline-offset-4 mx-2">
                        befitnessfrenzy@gmail.com
                    </a>
                    or <a href="tel:+918289031810" target="_blank" className="text-blue-500 underline underline-offset-4 ml-2">+91 8289031810</a>.
                </p>
            </div>
        </main>
    )
}

export default CanecellationPolicy