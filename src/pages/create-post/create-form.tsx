import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


interface CreateFormData {
   title: string;
   description: string;
}

export const CreateForm = () => {
   const [user] = useAuthState(auth);
   const navigate = useNavigate();


   const schema = yup.object().shape({
      title: yup.string().required("You must add a title"),
      description: yup.string().required("You must add description"),
   });

   const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
      resolver: yupResolver(schema),
   });


   const postsRef = collection(db, "posts");

   const onSubmit = async (data: CreateFormData) => {
      await addDoc(postsRef, {
         ...data,
         user: user?.displayName,
         userId: user?.uid,
      })
      navigate("/")
   }
   return (
      <div className="app formDiv">
         <form onSubmit={handleSubmit(onSubmit)} >
            <input className="titleInput" type="text" placeholder="Title..." {...register("title")} />
            <p> {errors.title?.message} </p>
            <textarea className="descriptionInput" rows={9} cols={40} placeholder="Description.." {...register("description")} />
            <p> {errors.description?.message} </p>
            <input className="btnSubmit" type="submit" />
         </form>
      </div>
   )
}