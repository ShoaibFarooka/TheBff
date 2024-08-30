"use client";
import { useAuth } from "@/hooks/auth";
import { saveUserStats } from "@/lib/dbHelpers";
import { capitalizeFirstLetter, getServerData } from "@/lib/utils";
import { Stats, statsKeys } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Form, FormField, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useDashboardState } from "./state";

const formSchema = z.object(
  statsKeys.reduce((acc, key) => {
    acc[key] = z.object({
      current: z.coerce.number().positive({
        message: `${capitalizeFirstLetter(key)} must be a positive number`,
      }),
      goal: z.coerce.number().positive({
        message: `${capitalizeFirstLetter(key)} must be a positive number`,
      }),
    });
    return acc;
  }, {} as Record<keyof Omit<Stats, "email">, z.ZodObject<{ current: z.ZodNumber; goal: z.ZodNumber }>>)
);

const StatsForm: React.FC<{
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}> = ({ isModalOpen, setIsModalOpen }) => {
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    userData: { stats },
    setUserData,
  } = useDashboardState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: stats,
  });

  const { errors } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const tid = toast.loading("Saving...");
    try {
      const res = await getServerData(startTransition, async () =>
        saveUserStats(user.email, values, {
          upsert: !stats,
        })
      );

      if (res.error) {
        toast.error(res.error ?? "Failed to save stats", { id: tid });
        return;
      }

      toast.success("Stats saved successfully", { id: tid });

      setUserData({
        stats: {
          ...stats,
          ...values,
        },
      });
    } catch (error: any) {
      toast.error(error.message ?? "Failed to save stats", { id: tid });
    }
  }

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(isOpen) => setIsModalOpen(isOpen)}
      >
        <DialogContent className="max-h-[80vh] overflow-auto px-4 md:px-20 lg:px-32 py-3 md:min-w-[50vw] text-white bg-gradient-to-r from-[#4A2F70]/30 to-[#344363]/30 backdrop-blur">
          <DialogHeader>
            <h2 className="text-2xl md:text-4xl text-center">
              Manage your stats!
            </h2>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 space-x-5 text-center text-lg md:text-xl mt-3">
                <p className="col-span-1 bg-blue-200/20 py-1 rounded-md">
                  Current
                </p>
                <p className="col-span-1 bg-blue-200/20 py-1 rounded-md">Goal</p>
              </div>

              {statsKeys.map((key) => (
                <div key={key} className="flex flex-col space-y-2">
                  <Label htmlFor={key}>{capitalizeFirstLetter(key)}</Label>

                  <div className="grid grid-cols-2 space-x-5">
                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name={`${key}.current`}
                        render={({ field }) => (
                          <Input
                            className="w-full"
                            type="number"
                            placeholder="Current"
                            defaultValue={stats?.[key]?.current}
                            disabled={isPending || isLoading}
                            {...field}
                          />
                        )}
                      />
                      {errors[key]?.current && (
                        <FormMessage>
                          {errors?.[key]?.current?.message}
                        </FormMessage>
                      )}
                    </div>

                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name={`${key}.goal`}
                        render={({ field }) => (
                          <Input
                            className="w-full"
                            type="number"
                            placeholder="Goal"
                            defaultValue={stats?.[key]?.goal}
                            disabled={isPending || isLoading}
                            {...field}
                          />
                        )}
                      />
                      {errors?.[key]?.goal && (
                        <FormMessage>{errors?.[key]?.goal?.message}</FormMessage>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="center">
                <Button
                  type="submit"
                  className="bg-white text-gray-800 px-12 hover:bg-white/90"
                  disabled={isPending || isLoading}
                >
                  {isLoading || isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StatsForm;
