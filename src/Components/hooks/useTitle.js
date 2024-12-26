import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Portal`;
  }, []);
};

export default useTitle;
