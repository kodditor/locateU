
import { LoginLink, getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminDash from "../components/AdminDash";
import Popup, { changePopup } from "../components/Popup";
import { verifyAdmin } from "../utils/backend-utils";


export default function Admin()
{
    const {getUser, isAuthenticated} = getKindeServerSession()

    if ( !(isAuthenticated()) )
    {
        return (
            <>
                <Popup />
                <div className="flex w-[100vw] h-[100vh] justify-center items-center bg-white p-4 md:p-0">  
                    <div className="p-8 border-2 border-lightBlue rounded-3xl flex flex-col gap-6" >
                        <img className="w-[17rem] m-auto" src="/img/logo.png" />
                        <p className="text-black text-center text-2xl w-[60%] m-auto">Welcome to the Admin page!</p>
                        <button  className="bg-blue text-white first-letter:items-center font-semibold px-4 py-3 rounded-2xl hover:bg-transparent hover:text-blue duration-150 border-2" ><LoginLink>Log in</LoginLink></button>
                        <p className="text-center text-black opacity-50">Happy coding!</p>               
                    </div>
                </div>
                <div className="bg-white hidden justify-center w-[100vw] h-[100vh] py-4 text-center pt-10 text-black font-medium">
                    <p>Please login with a laptop or desktop to access admin mode.</p>
                </div>
            </>
            )
    }

    else
    {
        const user = getUser()
        //console.log(user)
        
        if (verifyAdmin(user.email))
        //if(true)
        {
            return (
                <>
                    <div className="block bg-lightGrey">
                        <Header onlyLogo = {true} centered={true} />
                        <AdminDash user={user}/>
                        <Footer />
                    </div>

                    <div className=" bg-white flex hidden justify-center w-[100vw] h-[100vh] px-4 text-center pt-10 text-black font-medium">
                        <p>Please login with a laptop or desktop to access admin mode.</p>
                    </div>
                </>
            )
        }
        else{
            return (
                <>
                    <div className="bg-white flex justify-center w-[100vw] h-[100vh] pt-10 text-black font-medium">
                        <p>{user.email} does not have access to the admin page. Please contact system administrators to gain access.</p>
                    </div>
                </>
            )
        }


    }
}