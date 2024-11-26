import paymentIcon from '../../assets/Payment method icon.svg';

export const Review = () => {
    return (
        <section className="pb-8">
            <h2 className="font-medium font-outfit text-[1.25rem] sm:text-[1.8rem] md:text-[2.2rem] my-6">Review</h2>
            <div className='mb-8'>
                <label htmlFor="billingAddress" className="font-medium font-outfit text-base mb-2 block">Billing Address</label>
                <div className="relative z-[1]  max-w-[518px]">
                    <input
                        type="text"
                        className='border-[1px] border-Black focus:outline-borderHash outline-offset-1 block rounded-[8px] inset-0 py-4 pl-3 pr-16 w-full'
                    />
                    <button className='text-Black border-b-[1px] border-b-[#975555] text-sm absolute right-6 top-[50%] translate-y-[-50%]'>Edit</button>
                </div>
            </div>
            <div>
                <label htmlFor="billingAddress" className="font-medium font-outfit text-base mb-2 block">Credit card</label>
                <div className="relative z-[1]  max-w-[518px]">
                    <img className="absolute left-2 z-[2] top-[50%] translate-y-[-50%]" src={paymentIcon} alt="master card icon" />
                    <input
                        type="text"
                        className='border-[1px] border-Black focus:outline-borderHash outline-offset-1 block rounded-[8px] inset-0 py-4 pl-12 pr-16 w-full'
                        placeholder='1234 1234 1234 1234'
                    />
                    <button className='text-Black border-b-[1px] border-b-[#975555] text-sm absolute right-6 top-[50%] translate-y-[-50%]'>Edit</button>
                </div>
            </div>
        </section>
    )
}