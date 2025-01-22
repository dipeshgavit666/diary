import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin.js";

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { login, loading, error } = useLogin();

    const onSubmit = async data => {
        await login(data.email, data.password);
        reset({ email: '', password: '' });
    };

    return (
        <form 
            className="flex flex-col gap-4 p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg" 
            onSubmit={handleSubmit(onSubmit)}
        >
            <h3 className="text-2xl font-bold text-center mb-4">Log In</h3>
            <div>
                <input 
                    type="email" 
                    {...register("email", { required: 'required field' })}
                    placeholder="Email"
                    autoComplete="off"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
            </div>
            <div>
                <input 
                    type="password" 
                    {...register("password", { required: 'required field' })}
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.password && (
                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
            </div>
            <button 
                type="submit"
                className={`w-full py-2 rounded-lg text-white ${
                    loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={loading}
            >
                Log In
            </button>
            {error && (
                <div className="mt-2 text-sm text-red-500 text-center">
                    {error}
                </div>
            )}
        </form>
    );
}

export default Login;
