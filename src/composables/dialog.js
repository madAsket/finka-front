import { useDialog } from 'primevue/usedialog';
// import {merge} from "lodash"

export function useDialogManager() {

    const dialog = useDialog();

    const openDialog = (component, options={})=>{
        if(!options.hasOwnProperty("props"))  options.props = {};
        options.props.modal = true;
        options.props.style = {
            width: '25rem',
        };
        dialog.open(component, options);
    }
    return { dialog, openDialog}
  }