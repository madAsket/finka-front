import { useToast } from 'primevue/usetoast';

export function useToastManger() {

    const toast = useToast();

    const show = (msg)=>{
        toast.add({ 
            severity: 'secondary', 
            summary: 'Success', 
            detail: msg, 
            life: 2000 
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