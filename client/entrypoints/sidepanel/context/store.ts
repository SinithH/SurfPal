import { create } from 'zustand'

interface Question {
    question: string;
    answer: string;
  }
  
interface SummaryResponse {
  summary: string;
  questions: Question[];
}

interface Settings {
  imagerecognition?: boolean,
  texttospeech?: boolean,
  theme?: string,
  fontsize?: string,
  ttsspeed?: string
}
interface SummaryState {
    summary: string;
    questions: Question[];
    updateSummary: (summaryResponse:SummaryResponse)=>void;
    clearSummary: ()=>void;

    loading:boolean
    generatingSummary:(generating:boolean)=>void;
    
    textContent:string,
    updateTextContent: (textContent:string)=>void;
    clearTextContent: ()=>void;

    selectedParagraph:string
    updateSelectedParagraph: (selectedText:string)=>boolean;
    clearSelectedParagraph:()=>void;

    paragraphSummary:string
    updateParagraphSummary: (textContent:string)=>void;
    clearParagraphSummary: ()=>void;

    summaryType: string;
    updateSummaryType: (summaryType:string)=>void;

    // curresnt authenticated user state
    currentUser: any;
    updateUser: (user: any) => void;
    clearUser: () => void;

    // configuration settings of the current user
    userSettings: Settings;
    updateSettings: (settings: Settings) => void;
    resetSettings: () => void;
}

const useStore = create<SummaryState>((set) => ({
  textContent: '',
  updateTextContent: (textContent:string)=>set((state) => ({ textContent: textContent})),
  clearTextContent: ()=> set({textContent:''}),
  
  loading:false,
  generatingSummary: (generating:boolean) => set((state)=>({loading:generating})),
  
  questions: [],
  summary: '',
  updateSummary: (summaryResponse:SummaryResponse)=>set((state) => ({ summary: summaryResponse.summary, questions:summaryResponse.questions})),
  clearSummary:() => set({ summary:'',questions:[] }),

  selectedParagraph:'',
  updateSelectedParagraph: (selectedText:string)=>{
    set((state)=>({selectedParagraph: selectedText}));
    return true},
  clearSelectedParagraph: ()=> set({selectedParagraph:''}),

  paragraphSummary:'',
  updateParagraphSummary: (paragraphSummary:string)=>set(()=>({paragraphSummary:paragraphSummary})),
  clearParagraphSummary: ()=> set({paragraphSummary:''}),

  summaryType:'paragraph',
  updateSummaryType:(type:string)=>set((state)=>({summaryType: type})),

  // curresnt authenticated user state
  currentUser: {},
  updateUser: (user: any) => set({ currentUser: user}),  
  clearUser: () => set({currentUser: null}),

  // configuration settings of the current user
  userSettings: {
    imageRecognition: false,
    ttsSetting: false,
    theme: 'light',
    fontSize: 'normal',
    ttsSpeed: 'normal'
  },
  updateSettings: (settings: Settings) => set({ userSettings: settings }),
  resetSettings: () => set({ userSettings: {
    imagerecognition: false,
    texttospeech: false,
    theme: 'light',
    fontsize: 'normal',
    ttsspeed: 'normal'
  } }),
}))

export default useStore;