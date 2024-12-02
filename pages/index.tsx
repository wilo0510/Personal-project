import type { GetServerSideProps } from "next";
import jwt from "jsonwebtoken";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {req} = context;
  const token = req.cookies.token;
  try{
    if(token){
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT_SECRET is not defined");
      }
      jwt.verify(token, secret);
      return{
        redirect:{
          destination: "/dashboard",
          permanent:false,
        }
      };
    }
  }catch(error){
    console.error("Invalid token", error);
  }

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

export default function Home() {
  return null;
}