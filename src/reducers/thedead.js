let list;
export default function extinctAnimals(state = [], action){
    switch(action.type){
        case 'FETCH_THEDEAD_WORKS':
            return action.mammals
        case 'STROLL_CEMENTARY':
            list = state.filter((thedead) =>{
                // console.log(thedead)
                return thedead.common_name.toLowerCase().includes(action.query.toLowerCase()) || thedead.scientific_class.toLowerCase().includes(action.query.toLowerCase())
            })
        // console.log(list)
            return list
        default:
            return state;
    }
}