/**
 * Created by Developer39 on 7/27/2017.
 */
export function BookReducers(state={
    books:[]
},action)
{
    switch (action.type)
    {
        case "GET_BOOKS":
            //console.log("Action Get Books : ",state.books);
            return {...state,books:[...action.payload]};
        case "POST_BOOK":
            // let books=state.books.concat(action.payload);
            // return {books};
            return {...state,books:[...state.books,...action.payload],msg:'Saved! Click To Continue',style:'success',validation:'success'};
            break;
        case "POST_BOOK_REJECTED":
            // let books=state.books.concat(action.payload);
            // return {books};
            return {...state,msg:'Please try again',style:'danger',validation:'error'};
            break;
        case "RESET_BUTTON":
            return {...state,msg:null,style:'primary',validation:null};
            break;
        case "DELETE_BOOK":
            const currentBookToDelete=[...state.books];
            const indexToDelete=currentBookToDelete.findIndex(
                function (book) {
                    return book._id==action.payload
                }
            )
            return {books:[...currentBookToDelete.slice(0,indexToDelete),...currentBookToDelete.slice(indexToDelete+1)]}
            break;
        case "UPDATE_BOOK":
            const currentBookToUpdate=[...state.books];
            const indexToUpdate=currentBookToUpdate.findIndex(
                function (book) {
                    return book._id===action.payload._id
                }
            )
            const newBookToUpdate={
                ...currentBookToUpdate[indexToUpdate],title:action.payload.title
            }
            console.log("New Book : ",newBookToUpdate);
            return {books:[...currentBookToUpdate.slice(0,indexToUpdate),newBookToUpdate,...currentBookToUpdate.slice(indexToUpdate+1)]}
            break;
    }
    return state;
}