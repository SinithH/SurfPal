import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface INavigationState {    
    contentUrl: string;
    data: { [url: string]: INavigationResponse };
    setData: (url: string, data: INavigationResponse) => void;
}

export interface INavigationResponse {
    data: {
        navigation: {
            text: string,
            url: string
        }[],
        content: {
            text: string,
            url: string
        }[]
    }
}

const useNavigationStore = create(persist(devtools<INavigationState>((set) => ({
    contentUrl: '',
    data: {},
    setData: (url, data) => set((store) => ({
        data: { ...store.data , [url]: data },
        contentUrl: url
    })),
})), { name: "navigationData" }))

export default useNavigationStore;