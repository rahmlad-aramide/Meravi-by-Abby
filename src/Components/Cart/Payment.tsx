import { deliveryLabelStyle, paymentInputStyles } from "../../resources/inputStyles"
import paymentIcon from '../../assets/Payment method icon.svg';
import helpIcon from '../../assets/Help icon.svg';

export const Payment = () => {
    return (
        <section className="pb-8">
            <h2 className="font-medium font-outfit text-[1.25rem] sm:text-[1.8rem] md:text-[2.2rem] my-6">Payment Option</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label className={deliveryLabelStyle} htmlFor="cardNumber">Card number</label>
                    <div className="relative z-[1]">
                        <img className="absolute left-2 z-[2] top-[50%] translate-y-[-50%]" src={paymentIcon} alt="master card icon" />
                        <img className="absolute right-3 z-[2] top-[50%] translate-y-[-50%]" src={helpIcon} alt="master card icon" />
                        <input
                            type="number"
                            name="cardNumber"
                            id="cardNumber"
                            placeholder="1234 1234 1234 1234"
                            className={paymentInputStyles}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-[1fr_1fr] gap-4 my-8">
                    <input
                        type="text"
                        placeholder="MM/YY"
                        className={`shadow-shawdowCart text-center border-[1px] border-#D0D5DD focus:outline-borderHash outline-offset-1 block rounded-[8px] py-2 x-12 w-full`}
                    />
                    <input
                        type="text"
                        placeholder="CVV"
                        className={`shadow-shawdowCart text-center border-[1px] border-#D0D5DD focus:outline-borderHash outline-offset-1 block rounded-[8px] py-2 x-12 w-full`}
                    />
                </div>
                <div>
                    <label className={deliveryLabelStyle} htmlFor="securityCode">Security Code</label>
                    <input
                        type="text" name="ecurityCode" id="ecurityCode"
                        className={`bg-[#F0F0F0] max-w-[246px] ${paymentInputStyles}`}
                    />
                </div>
                <div className="flex items-center gap-2 my-8">
                    <input type="checkbox" name="saveDetails" id="saveDetails" />
                    <label htmlFor="saveDetails" className="text-Black text-sm font-outfit">Save payment details </label>
                </div>
                <div>
                    <label htmlFor="billingAddress" className="font-medium font-outfit text-base mb-2 block">Billing Address</label>
                    <div className="relative z-[1]  max-w-[518px]">
                        <input
                            type="text"
                            className='border-[1px] border-Black focus:outline-borderHash outline-offset-1 block rounded-[8px] inset-0 py-4 pl-3 pr-16 w-full'
                        />
                        <button className='text-Black border-b-[1px] border-b-[#975555] text-sm absolute right-6 top-[50%] translate-y-[-50%]'>Edit</button>
                    </div>
                </div>
            </form>
        </section>
    )
}