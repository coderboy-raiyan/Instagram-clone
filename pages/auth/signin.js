import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import React from "react";
import Header from "../../components/Header";
const signIn = ({ providers }) => {
  return (
    <>
      <Header />
      <section className="flex flex-col items-center justify-center min-h-screen">
        <img className="w-80" src="https://links.papareact.com/ocw" alt="" />
        <div className="mt-20">
          {Object?.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="bg-blue-500 p-3 rounded-lg text-white"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signIn;
