import { useState } from "react";
import PageLoader from "./PageLoader";

const UsePageLoader = () => {
  const [loading, setLoading] = useState(false);
  return [
    loading ? <PageLoader /> : null,
    () => setLoading(true), //Show Loader
    () => setLoading(false), //Hide Loader
  ];
};

export default UsePageLoader;
