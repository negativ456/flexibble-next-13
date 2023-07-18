"use client";
import { useEffect, useState } from "react";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

type Provider = Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;

export const AuthProviders = () => {
  const [providers, setProviders] = useState<Provider | null>(null);

  useEffect(() => {
    const setCurrentProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setCurrentProviders();
  }, []);
  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider, index) => (
          <button key={index} onClick={() => signIn(provider.id)}>
            {provider.id}
          </button>
        ))}
      </div>
    );
  }
  return <div></div>;
};
