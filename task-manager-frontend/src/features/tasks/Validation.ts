// Validation logic related to tasks (forms)
// use custom logic instead of yup because it is easier to write custom logic manually for tasks
import { format } from 'date-fns';
import { dateTimeInputsToDate, 
    DATE_PICKER_FORMAT, 
 } from '../common/dateObjects';

// if chosen date is earlier than current date, error
    // compare by converting to date only string as indicated by format for BOTH, otherwise
    // new Date() on its own will have inconsistent associated time
const dateIsTooEarly = (dateStr:string) => {
    const inputFormat = format(new Date(dateStr), DATE_PICKER_FORMAT);
    const nowFormat = format(new Date(), DATE_PICKER_FORMAT);

    return new Date(inputFormat).getTime() < new Date(nowFormat).getTime();
}

// return true if datetime provided is not in future. date,time assumed non-empty, valid strings
    // (because pickers automatically generate only either empty or valid strings)
const dateTimeNotFuture = (date:string, time: string) => {
    return dateTimeInputsToDate(date, time).getTime() <= new Date().getTime()
}

// format to only the date string e.g 2022-05-01 to check equality by date only (given )
const getOnlyDateString = (date:Date) => {
    return format(date, DATE_PICKER_FORMAT);
}

// return true if date string provided is today date string
// use for validation if date is provided but no time, because in this case time will be set to 12am
// e.g today is 5 Jan 2022 8am, if I give only 5 Jan 2022, code sets due date time to 12am which is past which is incorrect
const dateStringIsToday = (dateStr: string) => {
    return dateStr == getOnlyDateString(new Date());
}

// when date,time inputs are incomplete e.g by keyboard 05:--:-- values are automatically '',
// no way to access the incomplete values unless using DOM
export type TaskValidationProps = {title:string, description:string, date: string, time:string }
export type TaskEditProps = {title:string, description:string, date: string, time:string, categoryId: number }

export const validateTaskFields = ({title, description, date, time}:TaskValidationProps | TaskEditProps ) => {
    // return errors object
    let errors:{title?:string, description?:string, date?: string, time?:string} = {} 

    // title is required
    if (!title) {
        errors.title = "Title can't be blank";
    } 
    // validation for time:
        // date and time: make sure generated date is AFTER now date
        // date, no time: set time to 12am, display msg? (valid)
        // no date, time: invalid, ask for a date to be provided
        // no date, no time: valid, send as is (API sets to null automatically)

    if (date && dateIsTooEarly(date)) {
        errors.date = "Can't use a date before today";
    }

    // date and time: invalid if datetime provided is in the past or right now
    if (date && time && dateTimeNotFuture(date, time)) {
        errors.time = "Date and time must be in the future"
    }

    // if time given, give a date as well
    // TODO (not very important): make this not an error. if time in future, use now date. if time in past, use next day
    if (!date && time) {
        errors.date = "Please provide a date if you are indicating a time"
    }

    // if date but no time, error on time only if date is today. if date in future, 12am default time is ok.
    if (date && !time && dateStringIsToday(date)) {
        errors.time = "Please provide a time since the date given is today (default is 12am)";
    }

    return errors;
}
