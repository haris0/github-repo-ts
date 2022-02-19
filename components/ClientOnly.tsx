/* eslint-disable react/require-default-props */
import { useEffect, useState, ReactNode } from 'react';

type props = {
  children: ReactNode,
  delegated?: {[x: string]: any}
}

const ClientOnly = ({ children, ...delegated }: props) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
};

export default ClientOnly;
