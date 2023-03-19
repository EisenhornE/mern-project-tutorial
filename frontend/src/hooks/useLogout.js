import { useAuthContext } from "./useAuthContext" 
import { useWorkoutContext } from './useWorkoutsContext'

export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    const {dispatch: useWorkoutsDispatch} = useWorkoutContext()


    const LogOut = () =>{
        // Remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: "LOGOUT"})
        useWorkoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {LogOut}
}