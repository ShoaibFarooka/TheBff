"use client"
import Script from 'next/script'

// Test Key: rzp_test_tckRNwBEu1FKgQ
// XdvJLD8deBIZHevHQP5WMDit

const page = () => {

    const start = () => {
        const options = {
            "key": "rzp_test_tckRNwBEu1FKgQ",
            "subscription_id": "sub_OaoYvRq8Tj2Pip",
            "name": "My Billing Label",
            "description": "Auth txn for sub_OaoYvRq8Tj2Pip",
            "handler": function (response) {
                alert(response.razorpay_payment_id);
            },
            prefill: {
                "name": "Affan",
                "email": "siddiquiaffan201@gmail.com",
                "contact": "8450943144"
            }
        }

        const win = window as any

        var rzp1 = new win.Razorpay(options);
        rzp1.open();
    }

    return (
        <div className='py-24 flex items-center justify-center'>
            <button onClick={start} className='bg-white px-10 py-3 rounded-md'>Pay</button>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        </div>
    )
}

export default page