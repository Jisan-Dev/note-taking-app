import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
import { Post } from "./post";
import { useAuthState } from "react-firebase-hooks/auth";


export interface Post {
   docid: string;
   userId: string;
   user: string;
   title: string;
   description: string;
}


export const Home = () => {
   const [postsList, setPostsList] = useState<Post[] | null>(null);
   const postsRef = collection(db, "posts");
   const [user] = useAuthState(auth);

   const getPosts = async () => {
      const data = await getDocs(postsRef);
      setPostsList(
         data.docs.map((doc) => ({ ...doc.data(), docid: doc.id })) as Post[]      //type:Post
      );
   }

   useEffect(() => {
      getPosts();
   }, [])
   // getPosts();

   return (
      <>
         {user ? <div style={{ textAlign: "center", }} >
            {postsList?.map((post) => <Post post={post} />)}
         </div> : <h1 style={{ textAlign: "center", color: "white", marginTop: "200px" }}>Please login with your google account</h1>}
      </>
   )
}