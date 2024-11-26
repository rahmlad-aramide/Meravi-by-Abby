import { Link } from "react-router-dom";
import { FieldError, useForm } from "react-hook-form";
import { useEffect } from "react";

export default function Contact() {

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, []);

    const renderErrorMessage = (error: FieldError) => {
        // You can customize the rendering here based on your requirements
        return <span>{error.message}</span>;
      };
    
      const {
        register,
        handleSubmit,
        // reset,
        // getValues,
        formState: { errors },
      } = useForm({
        mode: "onBlur",
      });
      const handleError = () => {};
    
      const registerOptions = {
        email: {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email address",
          },
        },
        firstName: {
          required: "First Name is required",
          minLength: {
            value: 3,
            message: "Name must have at least 3 characters",
          },
        },
        lastName: {
            required: "Last Name is required",
            minLength: {
              value: 3,
              message: "Name must have at least 3 characters",
            },
          },
        message: {
          required: "Please Input a message",
          minLength: {
            value: 2,
            message: "Message must have at least 2 characters",
          },
        },
      };

      const handleApiSubmit = () => {}

  return (
    <div className="mt-[4rem] ssm:mt-[5rem] sm:mt-[7rem] px-[5%] lg:mt-[9rem] mb-12 sm:mb-24 flex items-center flex-col gap-12 sm:gap-16">
      <section className="w-[100%] sm:w-[70%] lg:w-[50%] mt-4 sm:mb-8 ">
        <h2 className=" bg-black text-white py-2 text-center text-[1.2rem] sm:text-[1.4rem] ">
          Contact Us
        </h2>

        <div className=" flex flex-col gap-6 mt-4 sm:mt-8">
          <section className=" flex flex-col gap-2">
            <h4 className=" text-[0.9rem] font-medium "> Call Us </h4>
            <p className="py-2 px-[3%] text-base w-full border-[1px] border-[#D0D5DD] ">
              Tel: 09043111111
            </p>
          </section>

          <section className=" flex flex-col gap-2">
            <h4 className=" text-[0.9rem] font-medium "> WhatsApp </h4>
            <p className="py-2 px-[3%] text-base w-full border-[1px] border-[#D0D5DD] ">
              +2349043111111 | Monday to Saturday 10 am to 8 pm
            </p>
          </section>
        </div>
      </section>

      {/* form section */}
      <section className=" w-[100%] sm:w-[70%] lg:w-[50%]">
        <h2 className=" bg-black text-white py-2 text-center text-[1.2rem] sm:text-[1.4rem] ">
          Email us at{" "}
          <Link
            to="mailto:info@theluxurysale.com"
            className=" hover:text-[blue]"
          >
            Info@theluxurysale.com
          </Link>
        </h2>

        <form action=""  onSubmit={handleSubmit(handleApiSubmit, handleError)} className=" flex flex-col gap-4 w-full mt-8">
          <section className="flex flex-col sm:flex-row gap-4 sm:gap-[2%] ">
            <div className=" w-full flex flex-col gap-2">
              <label
                htmlFor="firstName"
                className=" text-[0.9rem] font-medium "
              >
                first name
              </label>
              <input
                id="firstName"
                type="text"
                className=" border-[1px] w-full border-black py-2 px-[3%] "
                {...register("firstName", registerOptions.firstName)}
                />
                <small className=" text-[red] ">
                  {errors?.firstName &&
                    renderErrorMessage(errors.firstName as FieldError)}
                </small>
            </div>
            <div className=" w-full flex flex-col gap-2">
              <label htmlFor="lastName" className=" text-[0.9rem] font-medium ">
                last name
              </label>
              <input
                id="lastName"
                type="text"
                className=" border-[1px] w-full border-black py-2 px-[3%] "
                {...register("lastName", registerOptions.lastName)}
                />
                <small className=" text-[red] ">
                  {errors?.lastName &&
                    renderErrorMessage(errors.lastName as FieldError)}
                </small>
            </div>
          </section>

          <section className=" w-full flex flex-col gap-2">
            <label htmlFor="email" className=" text-[0.9rem] font-medium ">
            Email address
            </label>
            <input
              id="email"
              type="email"
              className=" border-[1px] w-full border-black py-2 px-[1.5%] "
              {...register("email", registerOptions.email)}
              />
              <small className=" text-[red] ">
                {errors?.email &&
                  renderErrorMessage(errors.email as FieldError)}
              </small>
          </section>

          <section className=" w-full flex flex-col gap-2">
              <label htmlFor="lastName" className=" text-[0.9rem] font-medium ">
                Message
              </label>
              <textarea
                id="lastName"
                rows={4}
                className=" resize-none border-[1px] w-full border-black py-2 px-[3%] "
                {...register("message", registerOptions.message)}
                />
                <small className=" text-[red] ">
                  {errors?.message &&
                    renderErrorMessage(errors.message as FieldError)}
                </small>
            </section>

            <section className="flex justify-end">
            <button className="  text-[0.9rem] py-2 px-8 bg-black text-white font-semibold ">
                Send
            </button>
            </section>
        </form>
      </section>
    </div>
  );
}
