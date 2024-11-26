/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { privacyPolicy } from "./PrivacyPolicyData";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="pt-12 pb-4 sm:pb-6 sm:pt-28 px-[5%]">
      <h2 className="font-medium font-outfit leading-none text-[1.25rem] sm:text-[1.8rem] md:text-[2.2rem] mb-3 sm:mb-3 pb-3 mt-10">
        Privacy Policy
      </h2>
      <div className=" w-full ">
        {privacyPolicy.content.map((section: any, idx: number) => (
          <div key={idx} className="mb-4 sm:mb-6">
            <h3 className="font-outfit font-semibold text-base text-Black mb-3">
              {section.heading}
            </h3>
            <div className="flex flex-col gap-2">
              {section.textContainer.map((text: string) => (
                <p className="font-outfit font-medium text-Black leading-[1.8rem] text-sm">
                  {text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrivacyPolicy;
