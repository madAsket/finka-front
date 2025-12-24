import { useToast } from 'primevue/usetoast';

export function useToastManger() {

    const toast = useToast();

    const show = (msg, show=2000, type='secondary')=>{
        toast.add({ 
            severity: type, 
            summary: 'Success', 
            detail: msg, 
            life: show 
        });
    }
    const error = (msg)=>{
        toast.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: msg || "Try again later", 
            life: 2000 
        });
    }
    return { toast, show, error};
  }