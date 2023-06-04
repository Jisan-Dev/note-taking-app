import { Link, useLocation } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from "react";


export const Navbar = () => {
   const [user] = useAuthState(auth);

   const signUserOut = async () => {
      await signOut(auth);
   }



   // const hamburger = document.querySelector(".hamburger");
   // const navmenu = document.querySelector(".links");

   // hamburger?.addEventListener("click", () => {
   //    hamburger.classList.toggle("active");
   //    navmenu?.classList.toggle(".active");
   // })

   const [hamIsActive, sethamIsActive] = useState(false);
   const [linksIsActive, setlinksIsActive] = useState(false);
   const location = useLocation();

   const handleToggle = () => {
      sethamIsActive(!hamIsActive);
      setlinksIsActive(!linksIsActive);
   };


   // document.querySelectorAll(".navLink").forEach(n => n.addEventListener("click", () => {
   //    hamburger?.classList.remove("active");
   //    navmenu?.classList.remove("active");
   // }))

   useEffect(() => {
      sethamIsActive(false);
      setlinksIsActive(false);
   }, [location]);
   return (
      <>
         <div className="navbar" >
            <div className="logo">
               <img src={'../../pedlogo.png'} alt="" />
            </div>

            <div className={linksIsActive ? 'links active' : 'links'} >
               <Link className="navLink" to='/'>Home</Link>
               {!user ? <Link className="navLink" to='/login'>Login</Link> : <Link to='/createpost' >Create Post</Link>}
            </div>

            <div className="user" >
               {user &&
                  <>
                     <p> {user?.displayName} </p>
                     <img src={user?.photoURL || ""} width="50" height="50" referrerPolicy="no-referrer" />
                     <button onClick={signUserOut}>Sign Out </button>
                  </>
               }
            </div>
            <div className={hamIsActive ? 'hamburger active' : 'hamburger'} onClick={handleToggle}>
               <span className="bar"></span>
               <span className="bar"></span>
               <span className="bar"></span>
            </div>
         </div>
      </>
   )
}