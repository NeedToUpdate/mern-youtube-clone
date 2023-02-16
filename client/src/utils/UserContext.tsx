import axios from "axios";
import { createContext, ReactNode, useContext } from "react";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from "react-query";
import { User } from "./Types";
import { userUri } from "./URIs";

const UserContext = createContext<{ user: User; refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<User, unknown>> }>(
  {} as { user: User; refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<User, unknown>> }
);

function getUser() {
  return axios
    .get(userUri + "/me", {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch(() => {
      return null;
    });
}

function UserContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery("user", getUser);
  return <UserContext.Provider value={{ user: data, refetch }}>{isLoading ? <>loading</> : children}</UserContext.Provider>;
}

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, useUserContext };
