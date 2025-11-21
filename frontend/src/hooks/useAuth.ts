import { useState, useEffect } from 'react'

interface User {
    id: number
    email: string
    is_active: boolean
}

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
}

export function useAuth() {
    const [auth, setAuth] = useState<AuthState>(() => {
        const token = localStorage.getItem('token')
        return {
            user: null, // We could persist user too, but fetching 'me' is safer
            token,
            isAuthenticated: !!token
        }
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (auth.token && !auth.user) {
            fetchUser(auth.token)
        }
    }, [auth.token])

    const fetchUser = async (token: string) => {
        try {
            const res = await fetch('http://localhost:8000/api/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.ok) {
                const user = await res.json()
                setAuth(prev => ({ ...prev, user, isAuthenticated: true }))
            } else {
                logout()
            }
        } catch (err) {
            logout()
        }
    }

    const login = async (data: any) => {
        setIsLoading(true)
        setError(null)
        try {
            const formData = new URLSearchParams()
            formData.append('username', data.email)
            formData.append('password', data.password)

            const res = await fetch('http://localhost:8000/api/auth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            })

            const json = await res.json()

            if (!res.ok) throw new Error(json.detail || 'Login failed')

            localStorage.setItem('token', json.access_token)
            setAuth({ user: null, token: json.access_token, isAuthenticated: true })
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const register = async (data: any) => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const json = await res.json()

            if (!res.ok) throw new Error(json.detail || 'Registration failed')

            // Auto login after register
            await login(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setAuth({ user: null, token: null, isAuthenticated: false })
    }

    return {
        ...auth,
        isLoading,
        error,
        login,
        register,
        logout
    }
}
