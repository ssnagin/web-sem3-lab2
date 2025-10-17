export

class CustomFormFormatter {
    static formatFloatUserInput(input : HTMLInputElement) {
        input.value = input.value.replace(/[^0-9.,-]/g, '');
        input.value = input.value.replace(/,/g, '.');
        
        if ((input.value.match(/\./g) || []).length > 1) {
            input.value = input.value.substring(0, input.value.lastIndexOf('.'));
        }

        if (input.value.indexOf('-') > 0) {
            input.value = input.value.replace(/-/g, '');
        }

        if (input.value.length > 1 && input.value.includes('-')) {
            input.value = input.value.replace(/-/g, '');
            input.value = '-' + input.value;
        }

        if (input.value.length > 5)
            input.value = input.value.substring(0, 5);

        else if (input.value[input.value.length - 1] == ".")
            input.value = input.value.substring(0, 4);
    }
}