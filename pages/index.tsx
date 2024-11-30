import client from "@/lib/mongodb";
import type { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async () => {
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