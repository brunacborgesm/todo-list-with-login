import FormContainer from "../../components/ui/FormContainer";
import RegisterForm from "../../components/Forms/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <FormContainer title="Create account">
      <RegisterForm />
      <p className="mt-4 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-700 hover:underline">
          Login
        </Link>
      </p>
    </FormContainer>
  );
}
