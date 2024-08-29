import toast from "../../node_modules/react-hot-toast/dist/index";

export const showToast = (message: string, type: "success" | "error" = "error") => {
  toast[type](message);
};
