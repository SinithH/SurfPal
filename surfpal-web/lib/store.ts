import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type State = {
    theme: string
}

export type Actions = {
    toggleLightMode: () => void,
    toggleDarkMode: () => void
}

const useStore = create<State & Actions>()(
    persist(
        (set, get) => ({
            theme: '',
            toggleLightMode: () => set((state) => ({
                theme: ''
            })),
            toggleDarkMode: () => set((state) => ({
                theme: 'dark'
            }))
        }),
        {
            name: 'theme',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => {
                console.log('hydration starts');
                return (state, error) => {
                    if (error) {
                        console.error('an error happened during hydration', error);
                    } else if (state) {
                        console.log('hydration finished', state);
                    }
                };
            },
        }
    ),
)

export default useStore;