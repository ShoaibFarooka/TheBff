import TrainerRegisterationForm from "@/components/trainerRegisterationForm/trainerRegisterationForm";
import TrainerSignupLayout from "@/components/TrainerSignupLayout";

export default function Page() {
  return (
    <TrainerSignupLayout>
      <TrainerRegisterationForm />
    </TrainerSignupLayout>
  );
}