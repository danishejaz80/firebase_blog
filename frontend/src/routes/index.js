import async from '../components/Async'

// Auth components
const Homepage = async(() => import('../pages/homepage/Homepage'))
const SignIn = async(() => import('../pages/auth/SignIn'))
const SignUp = async(() => import('../pages/auth/SignUp'))

const publicRoutes = [
    {
        path: '/',
        name: 'Homepage',
        component: Homepage,
    },
    {
        path: '/sign-in',
        name: 'Sign In',
        component: SignIn,
    },
    {
        path: '/sign-up',
        name: 'Sign Up',
        component: SignUp,
    }
]

export const publicR = publicRoutes;
