import { useState } from "react"
import { useSignUp } from "../hooks/useSignUp"

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signUp, error, isLoading} = useSignUp()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signUp(email, password)
    }

    return(
        <form className="SignUp" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value = {email}
            />
            <label>Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value = {password}
            />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SignUp