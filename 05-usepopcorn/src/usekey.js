import { useEffect } from "react";
export function useKey(key, callback) {
  useEffect(() => {
    function handleKeydown(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [key, callback]);
}
