// import { SelectCountry } from "../SelectDropdown/Country"
import { useState } from 'react'
import { deliveryInputStyle, deliveryLabelStyle } from '../../resources/inputStyles'

interface DeliveryAddressProps {
    onDeliveryLocationChange: (location: string) => void; // Callback function to pass location to parent
}

export const DeliveryAddress = ({ onDeliveryLocationChange }: DeliveryAddressProps) => {
    const [deliveryLocation, setDeliveryLocation] = useState("");
    
    // Function to handle input change and pass location to parent
    const handleDeliveryLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const location = e.target.value;
        setDeliveryLocation(location);
        onDeliveryLocationChange(location); // Pass location to parent component
    };
    

    return (
        <section className="pb-8">
            <h2 className="font-medium font-outfit text-[1.25rem] sm:text-[1.8rem] md:text-[2.2rem] my-6">
                Add your delivery address
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
                {/* <div className="sm:grid grid-cols-[1fr_1fr] gap-4">
                    <div className="mb-6">
                        <label htmlFor="firstName" className={deliveryLabelStyle}>First name</label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            className={deliveryInputStyle}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className={deliveryLabelStyle}>Last name</label>
                        <input
                            id='lastName'
                            type="text"
                            name="lastName"
                            className={deliveryInputStyle}
                        />
                    </div>
                </div> */}
                <div className="mb-6">
                    <label htmlFor="deliveryAddress" className={deliveryLabelStyle}>Delivery address</label>
                    <input
                        id="deliveryAddress"
                        type="text"
                        name="deliveryAddress"
                        value={deliveryLocation}
                        onChange={handleDeliveryLocationChange}
                        className={deliveryInputStyle}
                    />
                </div>
                {/* <div className="sm:grid grid-cols-[1fr_1fr] gap-4">
                    <div>
                        <label htmlFor="country" className={deliveryLabelStyle}>Country</label>
                        <SelectCountry />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="city" className={deliveryLabelStyle}>City</label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            className={deliveryInputStyle}
                        />
                    </div>

                </div>
                <div className="mb-6">
                    <label htmlFor="phone" className={deliveryLabelStyle}>Phone</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+234"
                        className={deliveryInputStyle}
                    />
                </div> */}
            </form>
        </section>
    )
}