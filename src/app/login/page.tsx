import LoginForm from "@/components/Forms/LoginForm";
import FormContainer from "@/components/ui/FormContainer";
import Link from "next/link";

export default function LoginPage() {
  return (
    <FormContainer title="Login">
      <LoginForm />
      <p className="mt-2 text-center text-xs text-gray-700">
        Don&apos;t  have an account?
        <Link href="/register" className="text-indigo-700 hover:underline ml-1">
          Register
        </Link>
      </p>
    </FormContainer>
  );
}
