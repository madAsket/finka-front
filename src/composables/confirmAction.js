import { useConfirm } from "primevue/useconfirm";

export function useConfirmManger() {

    const confirm = useConfirm();

    const confirmDelete = (onAccept, onReject=null, msg=null)=>{
        return ()=>{
            confirm.require({
                message: msg || 'Are you shure want to delete this?',
                header: 'Confirm deletion',
                icon: 'pi pi-info-circle',
                rejectLabel: 'Cancel',
                rejectProps: {
                    label: 'Cancel',
                    severity: 'secondary',
                    size:'small',
                    outlined: true
                },
                acceptProps: {
                    label: 'Delete',
                    size:'small',
                    severity: 'danger'
                },
                accept: () => {
                    onAccept();
                },
                // reject: () => {
                //     onReject();
                // }
            });
        }
    }
    return { confirm, confirmDelete};
  }