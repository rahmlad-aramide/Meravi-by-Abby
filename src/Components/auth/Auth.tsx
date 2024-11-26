import { useState } from "react"
import closeIcon from '../../assets/close.svg'
import { SignUp } from "./SIgnUp"
import { SignIn } from "./SIgnIn"

interface Props {
    close: () => void
}

const Auth = ({ close }: Props) => {
    const [tab, setTab] = useState<string>('signin')

    const switchTab = (active: string) => {
        setTab(active)
    }

    return (
        <div className="fixed inset-0 z-100 bg-transparentDark py-8  sm:pt-6 overflow-y-auto">
            <section className="bg-white w-[95%] max-w-[600px] mx-auto py-4 px-4 sm:px-6">
                <button className="block ml-auto" onClick={close}>
                    <img src={closeIcon} alt="close" />
                </button>
                <div className="flex font-outfit text-[1.2rem] gap-8 mt-4 border-b-[1px] border-b-#2222224D">
                    <button
                        className="border-b-[1px] px-3 py-1"
                        onClick={() => switchTab("signin")}
                        style={{
                            color: tab === "signin" ? "#222222" : "#222222B2",
                            borderColor: tab === "signin" ? "#222222" : "transparent",
                        }}
                    >
                        SIGN IN
                    </button>
                    <button
                        className="border-b-[1px] px-3 py-1"
                        onClick={() => switchTab("signup")}
                        style={{
                            color: tab === "signup" ? "#222222" : "#222222B2",
                            borderColor: tab === "signup" ? "#222222" : "transparent",
                        }}
                    >
                        I’M NEW HERE
                    </button>
                </div>
                {tab === "signup" ?
                    <SignUp closeButton={close}/>
                    :
                    <SignIn closeButton={close} />
                }
            </section>
        </div>
    )
}

export default Auth;