export interface Checkbox {
    className:string;
    isChecked: boolean;
    label: string;
    name: string;
    value: string;
    tooltip?: string;
}

export interface CheckboxList{

    defaultCheckboxName: string;
    checkboxes: Checkbox[];
    name: string;
    title: string;
}