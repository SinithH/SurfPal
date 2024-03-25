import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import INavigationResponse from "@/interfaces/navigation-resopnse.interface";
import ITop10NavigationAttribute from "@/interfaces/top-10-navigation-response.interface";

interface INavigationState {
    contentUrl: string;
    data: { [url: string]: INavigationResponse };
    top10Data: { [url: string]: ITop10NavigationAttribute[] };
    setData: (url: string, data: INavigationResponse) => void;
    setTop10LinksData: (url: string, data: ITop10NavigationAttribute[]) => void;
}

const useNavigationStore = create(persist(devtools<INavigationState>((set) => ({
    contentUrl: '',
    data: {},
    top10Data: {},
    setData: (url, data) => set((store) => ({
        data: { ...store.data, [url]: data },
        contentUrl: url
    })),
    setTop10LinksData: (url, data) => set((store) => ({
        top10Data: { ...store.top10Data, [url]: data }
    }))
})), { name: "navigationData" }))

export default useNavigationStore;
