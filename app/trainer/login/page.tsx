import TrainerLoginForm from "@/components/trainerAuth/trainerLoginForm";
import TrainerSignupLayout from "@/components/TrainerSignupLayout";

export default function Page() {
  return (
    <TrainerSignupLayout>
      <TrainerLoginForm/>
    </TrainerSignupLayout>
  );
}