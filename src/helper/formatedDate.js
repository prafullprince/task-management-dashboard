
export const formatedDueDate = (selectedDate)=>{
    
    // dueDate and currentDate
    const now = new Date();
    const dueDate = new Date(selectedDate);

    // make time portion equal to 0(hours,minutes,seconds,milliseconds)
    now.setHours(0,0,0,0);
    dueDate.setHours(0,0,0,0);

    // difference
    const timeDiffInSec = dueDate - now;
    const timeDiffInDay = Math.floor(timeDiffInSec / (1000*60*60*24));

    if(timeDiffInDay === 0){
        return "Today"
    }
    else if(timeDiffInDay === 1){
        return "Tomorrow"
    }
    else if(timeDiffInDay === 2){
        return "Day after tommorrow"
    }
    else{
        const options = { weekday: 'short', month: 'short', day: 'numeric', year:'numeric' };
        return dueDate.toLocaleDateString(undefined, options);
    }
}
