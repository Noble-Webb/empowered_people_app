export default function extinctAnimals(state = [], action){
    switch(action.type){
        case 'FETCH_THEDEAD_WORKS':
            return action.extinctAnimals
        default:
            return state;
    }
}