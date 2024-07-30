
/*
*Contact Us*

*Operating Address:*

Transfigure Fitness Solutions Private Limited  
M007 Logix Blossom Greens, Sector 143,  
Noida, UP, 201305

*Email:*

befitnessfrenzy@gmail.com

*Phone:*

+91 8289031810

We are here to assist you. Feel free to reach out to us for any queries or support.
*/

const ContactUs = () => {
    return (
        <main className="pt-28">
            <div className="container mx-auto px-4 text-neutral-200">
                <h1 className="text-3xl font-bold text-neutral-100">Contact Us</h1>

                <br />
                <h3 className="text-2xl font-semibold">Operating Address:</h3>
                <p className="text-neutral-200 mt-4">
                    Transfigure Fitness Solutions Private Limited
                    <br />
                    M007 Logix Blossom Greens, Sector 143,
                    <br />
                    Noida, UP, 201305
                </p>

                <br />
                <h3 className="text-2xl font-semibold">Email:</h3>
                <p className="text-neutral-200 mt-4">
                    <a href="mailto:befitnessfrenzy@gmail.com" target="_blank" className="text-blue-500 underline underline-offset-4 mx-2">
                        befitnessfrenzy@gmail.com
                    </a>
                </p>

                <br />
                <h3 className="text-2xl font-semibold">Phone:</h3>
                <p className="text-neutral-200 mt-4">
                    <a href="tel:+918289031810" target="_blank" className="text-blue-500 underline underline-offset-4 ml-2">+91 8289031810</a>
                </p>

                <br />
                <h3 className="text-2xl font-semibold">We are here to assist you. Feel free to reach out to us for any queries or support.</h3>
            </div>
        </main>
    )
}

export default ContactUs