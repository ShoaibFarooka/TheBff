import TrainerRegisterationForm from "@/components/trainerAuth/trainerRegisterationForm";
import TrainerSignupLayout from "@/components/TrainerSignupLayout";

export default function Page() {
  return (
    <TrainerSignupLayout>
      <TrainerRegisterationForm />
    </TrainerSignupLayout>
  );
}