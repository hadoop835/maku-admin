
import { useUserStore } from "./modules/user";

const store: any = {};

export const registerStore = () => { 
  store.userStore = useUserStore();
};

export default store;
