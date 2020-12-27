let list;
export default function extinctAnimals(state = [], action){
    switch(action.type){
        case 'FETCH_THEDEAD_WORKS':
            return action.mammals
        case 'STROLL_CEMENTARY':
            list = action.mammals.common_name.toLowerCase().includes(action.query.toLowerCase()) || action.mammals.family.toLowerCase().includes(action.query.toLowerCase())
            return list
        default:
            return state;
    }
}